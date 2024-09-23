import express, { Application, Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import urlRoutes from "./routes/url.routes";
import { globalErrorHandler } from "./middleware/errorhandler";
dotenv.config();

const app: Application = express();

// Middleware
app.use(cors());
app.use(express.json());

// Base Route
app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

app.use("/api", urlRoutes);

app.use(globalErrorHandler);

export default app;
