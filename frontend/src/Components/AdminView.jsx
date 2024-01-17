"use client";
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"; // Import your actual tabs library

import AdminGeneralSuggestion from "./AdminGeneralSuggestion";
import AdminFIRFeedback from "./AdminFIRFeedback";

const AdminView = () => {
  return (
    <div className="container mx-auto flex items-center justify-center mb-16">
      <Tabs defaultValue="firFeedback" className="w-[500px]">
        <TabsList>
          <TabsTrigger value="firFeedback">FIR Feedback</TabsTrigger>
          <TabsTrigger value="generalSuggestion">
            General Suggestion
          </TabsTrigger>
        </TabsList>
        <TabsContent value="firFeedback">
          <AdminFIRFeedback />
        </TabsContent>
        <TabsContent value="generalSuggestion">
          <AdminGeneralSuggestion />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminView;