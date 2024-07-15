import { Schema, model, Document, Types } from "mongoose";

interface IAppointment extends Document {
  name: string;
  user: Types.ObjectId;
  service: Types.ObjectId;
  date: Date;
  time: string;
  status: string;
}

const appointmentSchema = new Schema<IAppointment>({
  name: { type: String, required: true },
  user: { type: Schema.Types.ObjectId, ref: "User", required: false },
  service: { type: Schema.Types.ObjectId, ref: "Service", required: true },
  date: { type: Date, required: false },
  time: { type: String, required: true },
  status: { type: String, default: "Pending" },
});

export const Appointment = model<IAppointment>(
  "Appointment",
  appointmentSchema
);
