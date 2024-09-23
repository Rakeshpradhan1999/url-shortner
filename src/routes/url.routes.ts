import express from "express";
import {
  shortUrl,
  getLongUrl,
  updateUrl,
  deleteUrl,
} from "../controllers/url.controller";

const router = express.Router();

router.post("/shorten", shortUrl);
router.get("/shorten/:shortCode", getLongUrl);
router.put("/shorten/:shortCode", updateUrl);
router.delete("/shorten/:shortCode", deleteUrl);

export default router;
