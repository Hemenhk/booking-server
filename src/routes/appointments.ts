import { Router } from "express";

import { generateTimeSlots } from "../utils/timeSlots";
import { Appointment } from "../models/appointment";
import { startOfWeek, addDays, format, isBefore, isSameDay } from "date-fns";

const router = Router();

// Get available time slots for a specific date
router.get("/available-times", async (req, res) => {
  try {
    const currentDate = new Date();
    const weekStart = startOfWeek(currentDate, { weekStartsOn: 1 });
    const weekEnd = addDays(weekStart, 6);

    const startTime = "09:00";
    const endTime = "18:00";
    const timeSlots = generateTimeSlots(startTime, endTime);

    // Find appointments for the given date
    const appointments = await Appointment.find({
      date: {
        $gte: format(weekStart, "yyyy-MM-dd"),
        $lte: format(weekEnd, "yyyy-MM-dd"),
      },
    });
    console.log("appoint", appointments);

    const availableTimesByDay: Record<string, string[]> = {};

    for (let i = 0; i < 7; i++) {
      const currentDay = addDays(weekStart, i);
      const formattedCurrentDay = format(currentDay, "yyyy-MM-dd");

      // Skip previous days
      if (
        isBefore(currentDay, currentDate) &&
        !isSameDay(currentDay, currentDate)
      ) {
        continue;
      }

      // Extract booked times for the current day
      const bookedTimes = appointments
        .filter((app) => app.date === formattedCurrentDay)
        .map((app) => app.time);

      // Filter out booked times from timeSlots
      const availableTimes = timeSlots.filter(
        (slot) => !bookedTimes.includes(slot)
      );

      availableTimesByDay[formattedCurrentDay] = availableTimes;
    }
    res.status(200).send({ availableTimesByDay });
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
