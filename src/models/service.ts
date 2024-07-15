import { Schema, model, Document } from "mongoose";

interface IService extends Document {
  name: string;
  duration: number; // in minutes
  price: number;
}

const serviceSchema = new Schema<IService>({
  name: { type: String, required: true },
  duration: { type: Number, required: true },
  price: { type: Number, required: true },
});

export const Service = model<IService>("Service", serviceSchema);
