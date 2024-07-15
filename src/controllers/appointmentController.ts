import { Appointment } from "../models/appointment";
import { createOne, getAll } from "./factoryController";

export const getAllAppointments = getAll(Appointment)
export const createAppointment = createOne(Appointment)