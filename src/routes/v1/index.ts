import express, { Router, RequestHandler } from "express";
import userRouter from "./user.route";

const router = Router();

interface Route {
  path: string;
  route: Router;
  middleware?: RequestHandler[];
}

const defaultRoutes: Route[] = [
  {
    path: "/transactions",
    route: userRouter,
  },
];

defaultRoutes.forEach((route) => {
  if (route.middleware) router.use(route.path, route.middleware, route.route);
  else router.use(route.path, route.route);
});

export default router;
