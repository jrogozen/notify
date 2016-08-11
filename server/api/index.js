import express from 'express'
import events from './events'

const router = new express.Router()

events(router)

export default router