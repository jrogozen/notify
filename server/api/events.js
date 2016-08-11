import _ from 'lodash'
import React from 'react'
import nodemailer from 'nodemailer'
import mg from 'nodemailer-mailgun-transport'
import { renderToString } from 'react-dom/server'

import { query } from 'server/db'
import apiConstants from 'config/api'
import requester from 'app/utils/requester'

import InvitationEmail from 'server/templates/InvitationEmail'
import StatusEmail from 'server/templates/StatusEmail'

const allowedEventTypes = ['generic', 'lunch']
const scheduledEmails = {}

// todo: move to import
let nodemailerAuth = {
  auth: {
    api_key: apiConstants.mailgunKey,
    domain: apiConstants.mailgun
  }
}
let nodemailerMailgun = nodemailer.createTransport(mg(nodemailerAuth))

function sendInvitationStatus(req) {
  let { eventId } = req.query
  let sql = `SELECT * from events_users WHERE event_id = ${eventId}`
  let eventUsers

  return query(sql)
    .then((response = {}) => {
      let rows = response.rows

      if (rows.length < 1) {
        throw new Error('Bad eventId')
      }

      return rows
    })
    .then((eventRows) => {
      eventUsers = eventRows
      let userQuery = `SELECT owner from events WHERE id = ${eventId}`

      return query(userQuery)
        .then((response = {}) => {
            let rows = response.rows
            return rows[0].owner
          })
    })
    .then((ownerEmail) => {
      eventUsers.forEach((eventRow) => {
        let { attending, user_email } = eventRow

        if (attending === 'true') {
          nodemailerMailgun.sendMail({
            from: ownerEmail,
            to: user_email,
            subject: 'It\'s On!',
            html: renderToString(<StatusEmail from={ownerEmail} to={user_email} eventDetails={eventUsers} />)
          })
        }
      })

      return true
    })
    .catch((err) => {
      throw err;
    })
}

export default function events(router) {
  router.get('/events/status', (req, res) => {
    return sendInvitationStatus(req)
      .then(() => {
        return res.send({
          success: true,
          data: 'Emails queued.'
        })
      })
      .catch((err) => {
        return res.send({
          success: false,
          error: err
        })
      })
  })
  router.get('/events/trigger', (req, res) => {
    let { eventId } = req.query

    if (!eventId) {
      return res.send({
        success: false,
        error: 'Must provide an eventId.'
      })
    }

    let sql = `SELECT user_email from events_users WHERE event_id = ${eventId} AND attending = 'pending'`
    let userEmails = []

    query(sql)
      .then((response = {}) => {
        let rows = response.rows

        if (rows.length < 1) {
          return res.send({
            success: false,
            error: 'No one to notify.'
          })
        }

        return rows.map((row) => row.user_email)
      })
      .then((emails) => {
        let eventQuery = `SELECT owner from events WHERE id = ${eventId}`
        userEmails = emails

        return query(eventQuery)
          .then((response) => {
            let rows = response.rows
            return rows[0].owner
          })
      })
      .then((ownerEmail) => {
         userEmails.forEach((email) => {
          nodemailerMailgun.sendMail({
            from: ownerEmail,
            to: email,
            subject: 'Event Invitation',
            html: renderToString(<InvitationEmail from={ownerEmail} to={email} eventId={eventId} />)
          })
        })

        return res.send({
          success: true,
          data: 'Emails queued.'
        })
      })
      .catch((err) => {
        res.send({
          success: false,
          error: err
        })
      })
  })

  router.get('/events/rsvp', (req, res) => {
    let { email, eventId, attending = 'false' } = req.query

    if (!email || !eventId) {
      return res.send({
        success: false,
        error: 'Must provide email address and eventId'
      })
    }

    let sql = `UPDATE events_users SET attending = ${attending} WHERE user_email = '${email}' AND event_id = ${eventId}`

    query(sql)
      .then(() => {
        // check if we need to set out invitation status
        let eventSql = `SELECT * from events_users WHERE event_id = ${eventId}`

        return query(eventSql)
          .then((response = {}) => {
            let rows = response.rows || []
            let stillPending = false

            rows.forEach((row) => {
              if (row.attending === 'pending') {
                stillPending = true
              }
            })

            if (!stillPending) {
              return sendInvitationStatus(req)
            } else {
              return true
            }
          })
      })
      .then(() => {
        return res.send({
          success: true,
          data: 'Successfully updated attendance.'
        })
      })
      .catch((err) => {
        return res.send({
          success: false,
          error: err
        })
      })
  })

  router.post('/events', (req, res) => {
    let {
      name = '',
      owner,
      type = 'generic',
      users = '',
      active = true,
      startTime = Date.now(),
      createdAt = Date.now()
    } = req.body

    if (!owner) {
      return res.send({
        success: false,
        error: 'Must provide owner email when creating an event.'
      })
    }

    if (!_.includes(allowedEventTypes, type)) {
      type = 'generic'
    }

    let createEvent = `INSERT INTO events(name, owner, type, active, start_time, created_at) values('${name}', '${owner}', '${type}', '${active}', '${startTime}', '${createdAt}') RETURNING id`

    query(createEvent)
      .then((result) => {
        let insertedId = result.rows[0].id
        let associations = []

        users.split(',').forEach((userEmail) => {
          let sql = `INSERT INTO events_users(event_id, user_email, attending) values('${insertedId}', '${userEmail}', 'pending')`

          associations.push(query(sql))
        })

        // add the originator
        associations.push(query(`INSERT INTO events_users(event_id, user_email, attending) values('${insertedId}', '${owner}', 'true')`))

        Promise.all(associations)
          .then(() => {
            res.send({
              success: true,
              data: 'Event successfully created.'
            })
          })
          .catch((err) => {
            res.send({
              success: false,
              error: err
            })
          })
      })
  })

  router.get('/events', (req, res) => {
    let { email } = req.query

    if (!email) {
      return res.send({
        success: false,
        error: 'Must provide email.'
      })
    }

    let sql = `SELECT * from events WHERE owner = '${email}'`

    query(sql)
      .then((response = {}) => {
        return res.send({
          success: true,
          data: response.rows
        })
      })
      .catch((err) => {
        return res.send({
          success: false,
          error: err
        })
      })
  })
}