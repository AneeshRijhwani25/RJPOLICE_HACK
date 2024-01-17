import Chatbot from "@/Components/Chatbot";
import Feedback from "@/Components/Feedback";
import React from "react";

const page = ({params}) => {
  console.log(params)
  return (
    <div>
      <Feedback params={params} />
      {/* <Chatbot/> */}
    </div>
  );
};

export default page;
