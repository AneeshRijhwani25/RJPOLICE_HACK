const Police = require('../models/police');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const registerPolice = async (data) => {
  try {
    const user = await Police.create(data);
    return user;
  } catch (err) {
    console.log("Error in Registering the User", err);
    throw err;
  }
};


const loginPolice = async (email, password) => {
  // Find user by email
  let user = await getUserByEmail(email);
  if (!user) {
    throw new Error('Invalid Credentials')
  } else {
    const validPassword = await bcrypt.compare(password, user.Password);
    if (!validPassword) {
      throw new Error("Invalid Password");
    }

    // Create token
    const token = jwt.sign({ user: user }, process.env.JWT_SECRET, { expiresIn: "24h" });
    return { token, user };
  }
};

const getUserByEmail = async (email) => {
  try {
    const user = await Police.findOne({ Email: email }, { __v: 0, createdAt: 0, updatedAt: 0 });
    return user;
  } catch (error) {
    console.error(`Error getting user by email ${email}`, error);
    throw error;
  }
}


const isPoliceExists = async (uniqueId, email) => {
  const userByUniqueId = await Police.findOne({ UniqueId: uniqueId });
  const userByEmail = await Police.findOne({ Email: email });

  if (userByUniqueId || userByEmail) {
    return true;
  }

  return false; // Indicates that the user does not exist
};


const getPoliceById = async (policeId) => {
  try {
    const user = await Police.findOne({ _id: policeId }, { __v: 0, createdAt: 0, updatedAt: 0 });
    
    return user;
  } catch (error) {
    console.error(`Error getting user by id ${policeId}`, error);
    throw error;
  }
}
const getPoliceByPincode = async (pincode) => {
  try {
    const stationlist = await Police.find({ Pincode: pincode });
    return stationlist;
  } catch (error) {
    console.error(`Error getting user by id ${pincode}`, error);
    throw error;
  }
}

const addAppointmentRequest = async (policeId, appointmentId) => {
  try {
    const police = await Police.findByIdAndUpdate(policeId, { $push: { appointmentRequests: appointmentId } });
    return police;
  } catch (error) {
    throw error;
  }
};

const moveAppointmentFromRequestsToAccepted = async (policeId, appointmentId) => {
  try {
    // Remove appointment from 'appointmentRequests' and add to 'appointmentsAccepted' in Police model
    const police = await Police.findByIdAndUpdate(
      policeId,
      {
        $pull: { appointmentRequests: appointmentId },
        $push: { appointmentsAccepted: appointmentId },
      },
      { new: true }
    );
    return police;
  } catch (error) {
    throw error;
  }
};


const addFIRToPolice = async (PoliceId, firId) => {
  try {
    const user = await Police.findByIdAndUpdate(
      PoliceId,
      { $push: { FIRregisters: firId } },
      { new: true }
    );

    if (!user) {
      throw new Error('Police not found');
    }
  } catch (error) {
    throw error;
  }
};


const getreqappoint = async (policeId) => {
  try {
    const user = await Police.findOne({ _id: policeId });

    if (user) {
      const reqAppoIds = user.appointmentRequests.map((objectId) => objectId.toString());
      return reqAppoIds;
    } else {
      return "No Such User";
    }
  } catch (error) {
    // Handle any potential errors (e.g., database errors)
    console.error("Error in getreqappoint:", error.message);
    throw error; // Re-throw the error to handle it at a higher level
  }
};
const getconappoint = async (policeId) => {
  try {
    const user = await Police.findOne({ _id: policeId });

    if (user) {
      const reqAppoIds = user.appointmentsAccepted.map((objectId) => objectId.toString());
      return reqAppoIds;
    } else {
      return "No Such User";
    }
  } catch (error) {
    // Handle any potential errors (e.g., database errors)
    console.error("Error in getreqappoint:", error.message);
    throw error; // Re-throw the error to handle it at a higher level
  }
};


module.exports = {
  registerPolice,
  loginPolice,
  isPoliceExists,
  getUserByEmail,
  getPoliceById,
  addAppointmentRequest,
  moveAppointmentFromRequestsToAccepted,
  addFIRToPolice,
  getPoliceByPincode,
  getreqappoint,
  getconappoint
};
