// YOUR_BASE_DIRECTORY/netlify/functions/api.ts

import express, { Router } from "express";
import serverless from "serverless-http";
import { getCustomers } from "../../server";

const api = express();

const router = Router();
router.get("/hello", (req, res) => res.json({ message: "hi" }));

api.use("/api/", getCustomers);

export const handler = serverless(api);
