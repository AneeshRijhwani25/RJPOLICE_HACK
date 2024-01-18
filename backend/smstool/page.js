require("dotenv").config();

const accountSid = process.env.TWILIO_ACCOUNT_SID;

const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require("twilio")(accountSid, authToken);

const sendSMS = async (to, body) => {
  let msgOptions = {
    from: process.env.TWILIO_FROM_PHONE_NUMBER,
    to,
    body,
  };
  try {
    const message = await client.messages.create(msgOptions);
    console.log(message);
  } catch (error) {
    console.log(error);
  }
};

const generateFeedbackLink = async (firId) => {
  const appUrl = process.env.APP_URL;
  return `${appUrl}/feedback/${firId}`;
};


const getUserData = async (userId) => {
  try {
    const response = await fetch(`http://localhost:3005/auth/user/${userId}`);

    if (!response.ok) {
      throw new Error('Failed to fetch user data');
    }

    const userData = await response.json();
    return userData;
  } catch (error) {
    console.error('Error fetching user data:', error.message);
    return null;
  }
};


const sendFIRRegistrationSMS = async (req, res) => {
  try {
    const { userId, firId } = req.body;

    const userData = await getUserData(userId);
    if (!userData || !userData.phone) {
      console.error("User data or phone number not available");
      return res.status(400).json({ message: "User data or phone number not available" });
    }
    
    const feedbackLink = await generateFeedbackLink(firId);
    console.log(feedbackLink)

    const smsBody = `Hello ${userData.name || "User"}, thank you for registering FIR. We value your feedback. Provide your feedback here: ${feedbackLink}`;
    
    await sendSMS(`+91${userData.phone}`, smsBody);

    console.log("FIR registration SMS sent successfully");

    return res.status(200).json({ message: "FIR registration SMS sent successfully" });
  } catch (error) {
    console.error("Error sending FIR registration SMS:", error.message);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};





const sendFIRResolutionSMS = async (req, res) => {
  try {
    const { userId, firId } = req.body;

    const userData = await getUserData(userId);
    
    if (!userData || !userData.phone) {
      console.error("User data or phone number not available");
      return res.status(400).json({ message: "User data or phone number not available" });
    }

    const feedbackLink = await generateFeedbackLink(firId);
    console.log(feedbackLink);

    const smsBody = `Hello ${userData.name || "User"}, your FIR with ID ${firId} has been resolved. We value your feedback. Provide your feedback here: ${feedbackLink}`;
    
    // Uncomment the line below to actually send the SMS
    await sendSMS(`+91${userData.phone}`, smsBody);

    console.log("FIR resolution SMS sent successfully");

    return res.status(200).json({ message: "FIR resolution SMS sent successfully" });
  } catch (error) {
    console.error("Error sending FIR resolution SMS:", error.message);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
module.exports = {
  sendFIRRegistrationSMS,
  sendFIRResolutionSMS,
};