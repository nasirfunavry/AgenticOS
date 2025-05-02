import { Hono } from "hono";
import { ScheduleController } from "../controllers/schedule.controller";

const dashboardRouter = new Hono();

dashboardRouter.get("/", ScheduleController.getSchedule);

export default dashboardRouter;
