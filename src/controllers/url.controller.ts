import { Request, Response, NextFunction } from "express";
import Url from "../models/Url";

import { sendResponse } from "../middleware/response";
import { AppError } from "../utils/AppError";
import { generateShortcode } from "../utils";

export const shortUrl = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { url } = req.body;
    if (!url) {
      return next(new AppError("Url is required", 400));
    }
    const MAX_ATTEMPTS = 5;
    let shortCode = "";

    for (let i = 0; i < MAX_ATTEMPTS; i++) {
      let tempShortCode = generateShortcode();
      const findIfShortCodeExists = await Url.findOne({
        shortCode: tempShortCode,
      });
      if (!findIfShortCodeExists) {
        shortCode = tempShortCode;
        break;
      } else {
        continue;
      }
    }
    if (!shortCode) {
      return next(new AppError("Failed to generate short code", 500));
    }

    const newUrl = new Url({ url, shortCode });
    await newUrl.save();
    sendResponse(res, true, "Short URL created successfully", newUrl, 201);
  } catch (error) {
    next(new AppError("Failed to retrieve users", 500));
  }
};

export const getLongUrl = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { shortCode } = req.params;
    if (!shortCode) {
      return next(new AppError("Short code is required", 400));
    }
    const findIfShortCodeExists = await Url.findOne({ shortCode });
    if (!findIfShortCodeExists) {
      return next(new AppError("Short code not found", 404));
    }
    findIfShortCodeExists.accessCount++;
    await findIfShortCodeExists.save();
    sendResponse(
      res,
      true,
      "Long URL retrieved successfully",
      findIfShortCodeExists
    );
  } catch (error) {
    next(new AppError("Failed to retrieve users", 500));
  }
};

export const updateUrl = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { shortCode } = req.params;
    if (!shortCode) {
      return next(new AppError("Short code is required", 400));
    }
    const { url } = req.body;
    if (!url) {
      return next(new AppError("Url is required", 400));
    }
    const findIfShortCodeExists = await Url.findOne({ shortCode });
    if (!findIfShortCodeExists) {
      return next(new AppError("Short code not found", 404));
    }
    findIfShortCodeExists.url = url;
    await findIfShortCodeExists.save();
    sendResponse(
      res,
      true,
      "Short URL updated successfully",
      findIfShortCodeExists
    );
  } catch (error) {
    next(new AppError("Failed to retrieve users", 500));
  }
};

export const deleteUrl = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { shortCode } = req.params;
    if (!shortCode) {
      return next(new AppError("Short code is required", 400));
    }
    const findIfShortCodeExists = await Url.findOne({ shortCode });
    if (!findIfShortCodeExists) {
      return next(new AppError("Short code not found", 404));
    }
    await findIfShortCodeExists.deleteOne();
    sendResponse(
      res,
      true,
      "Short URL deleted successfully",
      findIfShortCodeExists
    );
  } catch (error) {
    next(new AppError("Failed to retrieve users", 500));
  }
};
