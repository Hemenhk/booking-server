import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import appointmentRoutes from "./routes/appointments";
import serviceRoutes from "./routes/serviceRoutes";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

const startServer = async () => {
  try {
    const mongoUri = process.env.MONGO_DB as string;
    if (!mongoUri) {
      throw new Error("MongoDB connection string is missing.");
    }

    app.use("/api/appointments", appointmentRoutes);
    app.use("/api/services", serviceRoutes);

    await mongoose.connect(mongoUri);
    console.log("DB connected!");

    app.listen(PORT, () => {
      console.log(`server is running on port ${PORT}`);
    });
  } catch (error: any) {
    console.error("Error connecting to MongoDB:", error.message);
    process.exit(1);
  }
};

startServer();
