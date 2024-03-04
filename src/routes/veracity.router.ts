import { Router } from "express";
import { status } from "../controllers/veracity.controller";

const r: Router = Router();

r.get("/status", status);

export default r;