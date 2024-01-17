

const mongoose = require("mongoose");

const policeSchema = new mongoose.Schema(
  {
    UniqueId: {
      type: String,
      required: [true, "Please provide your ID"],
    },
    Name: {
      type: String,
      required: [true, "Name is required"],
    },
    Phone: {
      type: String,
      required: [true, "Phone number is required"],
    },
    Email: {
      type: String,
      required: [true, "Email is required"],
    },
    Pincode: {
      type: Number,
      required: true,
    },
    Password: {
      type: String,
      required: [true, "Password is required"],
    },
    Timings: {
      type: {
        start: String,
        end: String,
      },
      default: {},
    },
    FIRregisters: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "FIR",
      }
    ],
    appointmentsAccepted: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Appointment",
      },
    ],
    appointmentRequests: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Appointment",
      },
    ],
    feedbacks: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Feedbacks",
      default: [],
    }],
  },
  { timestamps: true }
);

const Police = mongoose.model("Police", policeSchema);
module.exports = Police;
