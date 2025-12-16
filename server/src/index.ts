import "reflect-metadata";

import { config } from "dotenv";
config();
import express, { Application, Request, Response } from "express";
import { toNodeHandler } from "better-auth/node";
import { auth } from "./lib/auth";

//routers
import googleRouter from "@routes/v1/google.route";
import eventsRouter from "@routes/v1/events.route";
import categoriesRouter from "@routes/v1/categories.route";
import eventTypeRouter from "@routes/v1/event_type.route";
import adminRouter from "@routes/v1/admin.route";


//middelwares
import cors from "cors";
import { adminAuthMiddelware } from "@middelwares/adminAuthMiddelware";
import { errorHandler } from "@/middelwares/error-handler";

const app: Application = express();
app.use(
  cors({
    origin: "http://localhost:3000", // il tuo frontend
    credentials: true, // necessario per cookie / Authorization headers
    methods: ["GET", "POST", "PUT", "DELETE"], // Specify allowed HTTP methods
  })
);
app.all("/api/auth/*", toNodeHandler(auth.handler));

app.use(express.json());

//V1
app.use("/api/v1/google", googleRouter);
app.use("/api/v1/events", eventsRouter);
app.use("/api/v1/categories", categoriesRouter);
app.use("/api/v1/event_types", eventTypeRouter);
app.use("/api/v1/admin", adminAuthMiddelware, adminRouter);



app.get("/", (req: Request, res: Response) => {
  res.send("hello world");
});

app.use(errorHandler);
app.listen(process.env.PORT, () => {
  console.log(`http://localhost:${process.env.PORT}`);
});
