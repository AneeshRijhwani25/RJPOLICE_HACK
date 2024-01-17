const PoliceService = require('./policeService');
const Appointment = require('../models/appointments.js');

const isPoliceAvailable = async (policeId, date, startTime, endTime) => {
    try {
        const police = await PoliceService.getPoliceById(policeId);
        if (!police) {
            throw new Error('Police officer not found');
        }
        console.log(police)
        const { start, end } = police.Timings;
        if (startTime < start || endTime > end) {
            throw new Error('Specified time range is outside the working hours of the police officer');
        }

        const existingAppointments = await Appointment.find({
            PoliceId: policeId,
            date: date,
            $or: [
                { $and: [{ time: { $gte: startTime } }, { time: { $lt: endTime } }] },
                { $and: [{ time: { $lte: startTime } }, { time: { $gte: endTime } }] },
            ],
        });

        if (existingAppointments.length > 0) {
            throw new Error('Police officer has appointments during the specified time range');
        }

        return true;
    } catch (error) {
        throw error;
    }
};

const createAppointment = async (appointmentData) => {
    try {
        const { PoliceId, date, time } = appointmentData;
        const isAvailable = await isPoliceAvailable(PoliceId, date, time, time);
        if (isAvailable) {
            const appointment = await Appointment.create(appointmentData);
            return appointment;
        }
    } catch (error) {
        throw error;
    }
};
const updateAppointmentStatus = async ({ appointmentId, status }) => {
    try {
        const _id = appointmentId;
        console.log(_id)
        const updatedAppointment = await Appointment.findByIdAndUpdate(
            _id,
            { status: status },
            { new: true } // To return the updated document
        );

        if (!updatedAppointment) {
            throw new NotFoundError('The appointment does not exist');
        }

        return updatedAppointment;
    } catch (error) {
        throw error;
    }
};

const getAppointmentById = async (appointmentId) => {
    const appointment = await Appointment.findById(appointmentId)
    if (!appointment) {
        throw new NotFoundError("The appointment with given ID was not found")
    }
    return appointment
}
 


const getappointByUser = async(userId)=>{
    try {
        const appointmentlist = await Appointment.find({ UserId: userId });
        return appointmentlist;
      } catch (error) {
        console.error(`Error getting user by id ${userId}`, error);
        throw error;
      }
}
const getappointByPolice = async(policeId)=>{
    try {
        const appointmentlist = await Appointment.find({ PoliceId: policeId });
        return appointmentlist;
      } catch (error) {
        console.error(`Error getting user by id ${userId}`, error);
        throw error;
      }
}


module.exports = {
    createAppointment,
    updateAppointmentStatus,
    getAppointmentById,
    getappointByUser,
    getappointByPolice
};
