const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const registerUser = async (name, phoneNo, adharNumber, email, password) => {
  try {
    let userExist = await User.findOne({ email });
    if (userExist) {
      throw new Error("Email is already taken");
    } else {
      console.log(password)
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      let newUser = new User({
        name,phone: phoneNo, adharNumber, email, password: hashedPassword // Use the hashed password here
      });

      await newUser.save();

      const payload = {
        userId: newUser._id
      };

      const token = await jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "24h" });

      return { token, userInfo: newUser };
    }
  } catch (e) {
    console.error(e);
    throw e; 
  }
};



const loginUser = async (email, password) => {
  const user = await User.findOne({ email });

  if (!user) {
    throw new Error('No user exist');
  }
  console.log(password)
  const passwordMatch = await bcrypt.compare(password, user.password);

  if (!passwordMatch) {
    throw new Error('Invalid username or password');
  }

  const token = jwt.sign({ user: user }, process.env.JWT_SECRET, { expiresIn: '1d' });
  return {
    user,
    _id: user._id.toString(),
    token,
  };
};

const isValidAadhaar = async (adharNumber) => {
  const aadhaarValidator = /^\d{12}$/;

  if (!aadhaarValidator.test(adharNumber)) {
    throw new Error("Invalid Aadhaar number format");
  }

  return true;
  
}

const addAppointmentRequest = async (userId, appointmentId) => {
  try {
    const user = await User.findByIdAndUpdate(userId, { $push: { appointmentRequests: appointmentId } });
    return user;
  } catch (error) {
    throw error;
  }
};

const moveAppointmentFromRequestsToAccepted = async (userId, appointmentId) => {
  try {
    const user = await User.findByIdAndUpdate(
      userId,
      {
        $pull: { appointmentRequests: appointmentId },
        $push: { appointmentsAccepted: appointmentId },
      },
      { new: true }
    );
    return user;
  } catch (error) {
    throw error;
  }
};

const addFIRToUser = async (userId, firId) => {
  try {
      const user = await User.findByIdAndUpdate(
          userId,
          { $push: { FIRregisters: firId } },
          { new: true }
      );

      if (!user) {
          throw new Error('User not found');
      }
  } catch (error) {
      throw error;
  }
};

module.exports = {
  registerUser,
  loginUser,
  isValidAadhaar,
  addAppointmentRequest,
  moveAppointmentFromRequestsToAccepted,
  addFIRToUser
};
