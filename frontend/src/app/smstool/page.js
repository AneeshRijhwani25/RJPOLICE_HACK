// import React from "react";

// const Smstool = () => {
//   return <div>Smstool</div>;
// };

// export default Smstool;

require("dotenv").config();

const accountSid = process.env.TWILIO_ACCOUNT_SID;
// console.log(accountSid);
const authToken = process.env.TWILIO_AUTH_TOKEN;
// console.log(authToken);

const client = require("twilio")(accountSid, authToken);

const sendSMS = async (body) => {
  let msgOptions = {
    from: process.env.TWILIO_FROM_PHONE_NUMBER,
    to: process.env.TWILIO_TO_PHONE_NUMBER,
    body,
  };
  try {
    const message = await client.messages.create(msgOptions);
    console.log(message);
  } catch (error) {
    console.log(error);
  }
};

sendSMS("Hello from Police feedback system");
