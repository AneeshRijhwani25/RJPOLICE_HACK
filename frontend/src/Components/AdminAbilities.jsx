import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"; // Import your actual tabs library
import AdminRequestedAppointments from "./AdminRequestedAppointments";
import AdminConfirmedAppointments from "./AdminConfirmedAppointments";
import AdminRegisterFIR from "./AdminRegisterFIR";
import AdminRegisteredFIR from "./AdminRegisteredFIR";
// import Feedbacks from "./Feedbacks";

const AdminAbilities = () => {
  return (
    <div className="container mx-auto flex items-center justify-center mb-16">
      <Tabs defaultValue="registerFIR" className="w-[500px]">
        <TabsList>
          <TabsTrigger value="registerFIR">Register an FIR</TabsTrigger>
          <TabsTrigger value="adminrequestedAppointments">
            Requested Appointments
          </TabsTrigger>
          <TabsTrigger value="confirmedAppointments">
            Confirmed Appointments
          </TabsTrigger>
          <TabsTrigger value="registeredFIR">Registered FIR</TabsTrigger>
          {/* <TabsTrigger value="registeredfeedbacks">Feedbacks</TabsTrigger> */}
        </TabsList>
        <TabsContent value="adminrequestedAppointments">
          <AdminRequestedAppointments />
        </TabsContent>
        <TabsContent value="confirmedAppointments">
          <AdminConfirmedAppointments />
        </TabsContent>
        <TabsContent value="registerFIR">
          <AdminRegisterFIR />
        </TabsContent>
        <TabsContent value="registeredFIR">
          <AdminRegisteredFIR />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminAbilities;