import { Schema, model, Document, Types } from "mongoose";

interface IAppointment extends Document {
  name: string;
  last_name: string;
  email: string;
  phone_number: string;
  service: Types.ObjectId;
  date: string;
  time: string;
  status: string;
}

const appointmentSchema = new Schema<IAppointment>(
  {
    name: { type: String, required: true },
    last_name: { type: String, required: true },
    email: { type: String, required: true },
    phone_number: { type: String, required: true },
    service: { type: Schema.Types.ObjectId, ref: "Service", required: true },
    date: {
      type: String,
      required: false,
      default: () => {
        const currentDate = new Date();
        const year = currentDate.getFullYear();
        const month = String(currentDate.getMonth() + 1).padStart(2, "0");
        const day = String(currentDate.getDate()).padStart(2, "0");
        return `${year}-${month}-${day}`;
      },
    },
    time: { type: String, required: true },
    status: { type: String, default: "Pending" },
  },
  {
    toJSON: {
      virtuals: true,
      transform: function (doc, ret) {
        if (ret.date) {
          const dateObj = new Date(ret.date);
          const day = String(dateObj.getDate()).padStart(2, "0");
          const month = String(dateObj.getMonth() + 1).padStart(2, "0");
          const year = dateObj.getFullYear();
          ret.date = `${day}/${month}/${year}`;
        }
      },
    },
    toObject: {
      virtuals: true,
      transform: function (doc, ret) {
        if (ret.date) {
          const dateObj = new Date(ret.date);
          const day = String(dateObj.getDate()).padStart(2, "0");
          const month = String(dateObj.getMonth() + 1).padStart(2, "0");
          const year = dateObj.getFullYear();
          ret.date = `${day}/${month}/${year}`;
        }
      },
    },
  }
);

export const Appointment = model<IAppointment>(
  "Appointment",
  appointmentSchema
);
