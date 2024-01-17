import Feedback from "@/Components/Feedback";
import React from "react";

const page = ({params}) => {
  console.log(params)
  return (
    <div>
      <Feedback params={params} />
    </div>
  );
};

export default page;
