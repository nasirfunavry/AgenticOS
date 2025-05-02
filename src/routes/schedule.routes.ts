import { Hono } from "hono";
import { ScheduleController } from "../controllers/schedule.controller";
import { env } from "../config/env";

const scheduleRouter = new Hono();

// Authentication middleware
const authMiddleware = async (c: any, next: any) => {
  const authHeader = c.req.header("Authorization");
  if (!authHeader) {
    return c.json(
      {
        success: false,
        message: "Unauthorized: No password provided",
      },
      401
    );
  }

  const password = authHeader.split(" ")[1];
  if (password !== env.PASSWORD_AUTH) {
    return c.json(
      {
        success: false,
        message: "Unauthorized: Invalid password",
      },
      401
    );
  }

  await next();
};

// Apply auth middleware to all routes
scheduleRouter.use("/*", authMiddleware);

// scheduleRouter.get("/", ScheduleController.getSchedule);

scheduleRouter.patch(
  "/config",
  authMiddleware,
  ScheduleController.updateConfig
);

scheduleRouter.patch(
  "/time",
  authMiddleware,
  ScheduleController.updateTimeRecord
);

scheduleRouter.delete(
  "/time",
  authMiddleware,
  ScheduleController.deleteTimeRecord
);

export default scheduleRouter;
