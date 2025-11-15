import "reflect-metadata";

import { config } from "dotenv";
config();
import express, { Application, Request, Response } from "express";
import { toNodeHandler } from "better-auth/node";
import { auth } from "./lib/auth";

import cors from "cors";

import googleRouter from "@routes/google.route";
import eventRouter from "@routes/event.route";
import { authMiddelware } from "@middelwares/authMiddelware";

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
app.use("/api/google", authMiddelware, googleRouter);
app.use("/api/event",eventRouter);
app.get("/", (req: Request, res: Response) => {
  res.send("hello world");
});

app.listen(process.env.PORT, () => {
  console.log(`http://localhost:${process.env.PORT}`);
});
