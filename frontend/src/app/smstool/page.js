require("dotenv").config();

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
// const client = require("twilio")(accountSid, authToken);

export const sendSMS = async (to, body) => {
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

export const sendFIRRegistrationSMS = async (userId, firId) => {
  try {
    
    const userData = await getUserData(userId);
    console.log(userData)
    if (!userData || !userData.phoneNumber) {
      console.error("User data or phone number not available");
      return;
    }

    // Generate feedback link with firId as slug
    const feedbackLink = generateFeedbackLink(firId);

    // Compose the SMS body with a beautiful message and feedback link
    const smsBody = `Hello ${userData.name || "User"}, thank you for registering FIR. We value your feedback. Provide your feedback here: ${feedbackLink}`;

    // Send the SMS
    await sendSMS(userData.phone, smsBody);

    console.log("FIR registration SMS sent successfully");
  } catch (error) {
    console.error("Error sending FIR registration SMS:", error.message);
  }
};

// Placeholder functions, replace these with your actual implementations
const getUserData = async (userId) => {
  try {
    const response = await fetch('http://localhost:3005/auth/user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ UserId: userId }),
    });

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


const generateFeedbackLink = (firId) => {
  const appUrl = process.env.APP_URL;
  return `${appUrl}/feedback/${firId}`;
};
