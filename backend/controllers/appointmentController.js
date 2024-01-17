const appointmentService = require('../services/appointmentService');
const authService = require('../services/authService')
const policeService = require('../services/policeService')
const createAppointment = async (req, res) => {
  try {

    const { UserId, PoliceId, date, time } = req.body;
    const appointmentData = {
      UserId,
      PoliceId,
      date,
      time,
    };

    const appointment = await appointmentService.createAppointment(appointmentData);

    await authService.addAppointmentRequest(UserId, appointment._id);
    await policeService.addAppointmentRequest(PoliceId, appointment._id);

    res.status(201).json({
      status: 'success',
      message: 'Appointment created successfully',
      data: {
        appointment,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: 'failure',
      message: error.message,
    });
  }
};

const confirmAppointment = async (req, res) => {
  try {
    const { appointmentId } = req.body;
    

    const appointment = await appointmentService.getAppointmentById(appointmentId);

    const updatedAppointment = await appointmentService.updateAppointmentStatus({ appointmentId, status: 'confirmed' });

    await authService.moveAppointmentFromRequestsToAccepted(appointment.UserId, appointmentId);

    await policeService.moveAppointmentFromRequestsToAccepted(appointment.PoliceId, appointmentId);

    res.status(200).json({ message: 'Appointment confirmed successfully', data: updatedAppointment });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
const appointbyUser = async (req, res) => {
  const userId = req.params.userId;
  if (userId) {
    const appointmentData = await appointmentService.getappointByUser(userId);
    res.status(200).send(appointmentData);
  }
  else {
    throw new Error('Invalid userId');
  }

}
const appointbyid = async (req, res) => {
  const id = req.params.id;
  if (id) {
    const appointmentData = await appointmentService.getAppointmentById(id);
    res.status(200).send(appointmentData);
  }
  else {
    throw new Error('Invalid Id');
  }

}
const appointbyPolice = async (req, res) => {
  const policeId = req.params.policeId;
  if (policeId) {
    const appointmentData = await appointmentService.getappointByPolice(policeId);
    res.status(200).send(appointmentData);
  }
  else {
    throw new Error('Invalid userId');
  }

}
module.exports = {
  createAppointment,
  confirmAppointment,
  appointbyid,
  appointbyUser,
  appointbyPolice
};
