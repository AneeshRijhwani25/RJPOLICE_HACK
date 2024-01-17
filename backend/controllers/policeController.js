const bcrypt = require('bcrypt');
const policeService = require('../services/policeService');

const register = async (req, res) => {
  try {
    const { UniqueId, Name, Phone, Email, Pincode, Password, timingsStart, timingsEnd } = req.body;

    if (!UniqueId || !Name || !Phone || !Email || !Pincode || !Password || !timingsStart || !timingsEnd) {
      throw new Error("Missing Field Data");
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(Email)) {
      throw new Error("Invalid Email Format");
    }

    if (Password.length < 8) {
      throw new Error("Password must be at least 8 characters long");
    }

    if (Pincode.length < 6) {
      throw new Error("Please enter a valid pincode")
    }

    if (timingsStart >= timingsEnd) {
      throw new Error("End time must be greater than start time");
    }

    const isUserExist = await policeService.isPoliceExists(UniqueId, Email);
    if (isUserExist) {
      throw new Error("User Already Exists!");
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(Password, salt);

    const data = {
      UniqueId,
      Name,
      Phone,
      Email,
      Pincode,
      Password: hashedPassword,
      Timings: {
        start: timingsStart,
        end: timingsEnd,
      },
    };


    const result = await policeService.registerPolice(data);

    return res.status(201).json({
      status: "success",
      message: "Registration Successful!",
      data: {
        PoliceStationId: result.UniqueId,
        Message: "Station created successfully",
      },
    });
  } catch (err) {
    return res.status(400).json({
      status: "failure",
      message: err.message,
    });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      throw new Error("Please provide an email and a password");
    }

    let token = await policeService.loginPolice(email, password);

    return res.status(200).json({
      status: "success",
      data: {
        Token: token,
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(401).json({
      status: "failure",
      message: error.message
    })
  }
};

const PoliceStationbyPin = async (req, res) => {
  const pincode = req.params.pin;
  if (pincode) {
    const PolestationData = await policeService.getPoliceByPincode(pincode);
    res.status(200).send(PolestationData);
  }
  else {
    throw new Error('Invalid Pincode');
  }


}
const PoliceStationbyId = async (req, res) => {
  const pId = req.params.policeId;
  if (pId) {
    const PolestationData = await policeService.getPoliceById(pId);
    res.status(200).send(PolestationData);
  }
  else {
    throw new Error('Invalid Pincode');
  }


}

const reqappoint = async (req, res) => {
  try {
    const  policeId  = req.params.policeId;
    
    if (policeId) {
      const appointmentData = await policeService.getreqappoint(policeId);
      console.log(appointmentData)
      if (appointmentData) {
        res.status(200).json({ success: true, data: appointmentData });
      } else {
        res.status(404).json({ success: false, error: 'Appointments not found' });
      }
    } else {
      res.status(400).json({ success: false, error: 'Invalid policeId' });
    }
  } catch (error) {
    console.error('Error fetching requested appointments:', error);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
};
const conappoint = async (req, res) => {
  try {
    const  policeId  = req.params.policeId;
    

    if (policeId) {
      const appointmentData = await policeService.getconappoint(policeId);
      console.log(appointmentData)
      if (appointmentData) {
        res.status(200).json({ success: true, data: appointmentData });
      } else {
        res.status(404).json({ success: false, error: 'Appointments not found' });
      }
    } else {
      res.status(400).json({ success: false, error: 'Invalid policeId' });
    }
  } catch (error) {
    console.error('Error fetching requested appointments:', error);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
};

module.exports = {
  register,
  login,
  PoliceStationbyPin,
  PoliceStationbyId,
  reqappoint,
  conappoint
};
