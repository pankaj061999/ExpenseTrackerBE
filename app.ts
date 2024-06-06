import express, { Request, Response, NextFunction } from "express";
import helmet from "helmet";
import mongoSanitize from "express-mongo-sanitize";
import compression from "compression";
import cors from "cors";
import httpStatus from "http-status";
import routes from "./src/routes/v1";
import rTracer from "cls-rtracer";
import cookieParser from "cookie-parser";
import ApiError from "./src/utils/ApiError";

const app = express();

app.use(rTracer.expressMiddleware());

app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(mongoSanitize());
app.use(cookieParser());
app.get("/", (req: Request, res: Response) => {
  res.send("Hello from server!");
});
// gzip compression
app.use(compression());
app.use(cors());
app.options("*", cors());
app.use("/v1", routes);
app.use((req: Request, res: Response, next: NextFunction) => {
  next(new ApiError(httpStatus.NOT_FOUND, "Not found"));
});

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  if (req.accepts("json")) {
    res.status(err.statusCode || httpStatus.INTERNAL_SERVER_ERROR).json({
      code: err.statusCode || httpStatus.INTERNAL_SERVER_ERROR,
      error: err.statusCode,
      message: err.message || "Internal Server Error",
    });
  } else {
    next(err);
  }
});

export default app;
