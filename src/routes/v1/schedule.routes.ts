import express from 'express'
import { ScheduleControllers } from '../../controllers/scheduleControllers'

export const routerSchedule = express.Router()

const scheduleControllers = new ScheduleControllers()

routerSchedule.get('/', scheduleControllers.list)
