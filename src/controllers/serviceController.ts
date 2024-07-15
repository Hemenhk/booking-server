import { Service } from "../models/service";
import {
  createOne,
  getAll,
  updateOne,
  getOne,
  deleteOne,
} from "./factoryController";

export const getAllServices = getAll(Service);
export const getService = getOne(Service);
export const createService = createOne(Service);
export const updateService = updateOne(Service);
export const deleteService = deleteOne(Service);
