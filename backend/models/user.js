const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
  },
  phone:{
    type: String,
    required: [true, "Phone Number is required"]
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
  },
  adharNumber:{
    type: String,
    required: [true, "Aadhar is required"]
  },
  password: {
    type: String,
    required: [true, "Password is required"],
  },
  FIRregisters:
  {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "FIR",
    default: []
  },
  appointmentRequests: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Appointment",
    },
  ],
  appointmentsAccepted: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Appointment",
    },
  ],
  feedbacks: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "Feedbacks", 
    default: [],
  },
});


const User = mongoose.model("User", userSchema);

module.exports = User;
