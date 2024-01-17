const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema(
  {
    UserId: {
      type: String,
      required: true,
    },
    PoliceId: {
      type: String,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
      default: "pending",
    },
    time: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Appointment = mongoose.model("appointments", appointmentSchema);

module.exports = Appointment;
