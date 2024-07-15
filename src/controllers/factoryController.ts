import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../utils/catchAsync";

export const getAll = (Model: any) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const doc = await Model.find();

    res.status(200).json({
      status: "success",
      data: doc,
    });
  });
};

export const getOne = (Model: any) => {
  return catchAsync(async (req, res, next) => {
    const doc = await Model.findById(req.params.id);

    if (!doc) {
      return next(new Error("No document found with that ID"));
    }

    res.status(200).json({
      status: "success",
      data: doc,
    });
  });
};

export const createOne = (Model: any) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const doc = await Model.create(req.body);

    res.status(201).json({
      status: "success",
      data: doc,
    });
  });
};

export const updateOne = (Model: any) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!doc) {
      return next(new Error("No document found with that ID"));
    }

    res.status(200).json({
      status: "success",
      data: doc,
    });
  });
};

export const deleteOne = (Model: any) => {
  return catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndDelete(req.params.id);

    if (!doc) {
      return res.status(404).send({ error: "Document not found" });
    }

    res.status(200).json({
      status: "success",
      message: "Document deleted successfully",
    });
  });
};
