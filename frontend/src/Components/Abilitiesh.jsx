import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"; // Import your actual tabs library

import AppointmentStatus from "./AppointmentStatus";
import RegisteredFIR from "./RegisteredFIR";
import BookAppointmenth from "./BookAppointmenth";

const Abilitiesh = () => {
  return (
    <div className="container flex items-center justify-center mb-16">
      <Tabs
        defaultValue="bookAppointment"
        className=" max-w-lg  items-center justify-center"
      >
        <TabsList>
          <TabsTrigger value="bookAppointment">नियुक्ति करें</TabsTrigger>
          <TabsTrigger value="appointmentStatus">नियुक्ति स्थिति</TabsTrigger>
          <TabsTrigger value="registeredFir">दर्ज की गई एफआईआर</TabsTrigger>
        </TabsList>
        <TabsContent value="bookAppointment">
          <BookAppointmenth />
        </TabsContent>
        <TabsContent value="appointmentStatus">
          <AppointmentStatus />
        </TabsContent>
        <TabsContent value="registeredFir">
          <RegisteredFIR />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Abilitiesh;