import { Router } from "express";

import { generateTimeSlots } from "../utils/timeSlots";
import { Appointment } from "../models/appointment";

const router = Router();

// Get available time slots for a specific date
router.get("/available-times", async (req, res) => {
  try {
    const date = req.query.date as string;
    console.log("date", date);
    if (!date) {
      return res.status(400).send({ error: "Date is required" });
    }

    const formattedDate = date.split("/").reverse().join("-");

    const startTime = "09:00";
    const endTime = "18:00";
    const timeSlots = generateTimeSlots(startTime, endTime);

    // Find appointments for the given date
    const appointments = await Appointment.find({ date: formattedDate });
    console.log("appoint", appointments);

    // Extract booked times from appointments
    const bookedTimes = appointments.map((app) => app.time);

    // Filter out booked times from timeSlots
    const availableTimes = timeSlots.filter(
      (slot) => !bookedTimes.includes(slot)
    );
    console.log("bookedtimes", bookedTimes);
    console.log("availableTimes", availableTimes);
    res.status(200).send({ availableTimes });
  } catch (error: any) {
    console.error("Error fetching available times:", error);
    res.status(500).send({ error: error.message });
  }
});

// Create an appointment
router.post("/", async (req, res) => {
  try {
    const { date, time } = req.body;

    const existingAppointment = await Appointment.findOne({ date, time });
    if (existingAppointment) {
      return res.status(400).send({ error: "Time slot is already booked" });
    }

    const appointment = new Appointment(req.body);
    await appointment.save();

    res.status(201).send(appointment);
  } catch (error: any) {
    res.status(400).send({ error: error.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const appointments = await Appointment.find().populate("service");
    res.status(200).send(appointments);
  } catch (error: any) {
    res.status(500).send({ error: error.message });
  }
});

export default router;
