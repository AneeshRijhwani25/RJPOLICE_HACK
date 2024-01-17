"use client";
import React from "react";
import ChatBot from "react-simple-chatbot";
import CustomOptions from "./CustomOptions";
import { MyComponent } from "./Star";

const Chatbot = () => {
  const config = {
    floating: true,
    width: "500px",
  };

  return (
    <div>
      <ChatBot
        speechSynthesis={{ enable: true, lang: "en" }}
        recognitionEnable={true}
        headerTitle="AutoFeedback Bot"
        steps={[
          {
            id: "start",
            component: (
              <CustomOptions
                options={[{ value: 1, label: "Give Feedback", trigger: "0" }]}
              />
            ),
            asMessage: true,
          },
          {
            id: "0",
            message:
              "Welcome to the Rajasthan Police Feedback System. I am here to help you.",
            trigger: "5",
          },

          {
            id: "5",
            message: "Enter Police Station Name",
            trigger: "7",
          },
          {
            id: "7",
            user: true,
            trigger: "8",
          },
          {
            id: "8",
            message:
              "How satisfied were you with your interaction with the police?",
            trigger: "10",
          },
          {
            id: "10",
            component: (
              <CustomOptions
                options={[
                  { value: "v", label: "5-Very satisfied", trigger: "11" },
                  { value: "w", label: "4-Satisfied", trigger: "11" },
                  { value: "x", label: "3-Neutral", trigger: "11" },
                  { value: "y", label: "2-Dissatisfied", trigger: "11" },
                  { value: "z", label: "1-Very Dissatified", trigger: "11" },
                ]}
              />
            ),
            asMessage: true,
          },

          {
            id: "11",
            message: "Did the police officers treat you respectfully?",
            trigger: "12",
          },
          {
            id: "12",
            component: (
              <CustomOptions
                options={[
                  { value: "a", label: "Yes", trigger: "13" },
                  { value: "b", label: "No", trigger: "13" },
                ]}
              />
            ),
            asMessage: true,
          },
          {
            id: "13",
            message:
              "Did the police officers communicate clearly and effectively?",
            trigger: "14",
          },
          {
            id: "14",
            component: (
              <CustomOptions
                options={[
                  { value: "c", label: "Yes", trigger: "15" },
                  { value: "d", label: "No", trigger: "15" },
                ]}
              />
            ),
            asMessage: true,
          },
          {
            id: "15",
            message: "Were the police officers professional in their conduct?",
            trigger: "16",
          },
          {
            id: "16",
            component: (
              <CustomOptions
                options={[
                  { value: "c", label: "Yes", trigger: "17" },
                  { value: "d", label: "No", trigger: "17" },
                ]}
              />
            ),
            asMessage: true,
          },
          {
            id: "17",
            message:
              "How much would you rate the overall service provided by the police out of 5?",
            trigger: "18",
          },
          {
            id: "18",
            component: <MyComponent />,
            asMessage: true,
          },
          {
            id: "ab",
            message: "Any suggestions?",
            asMessage: true,
            trigger: "ac",
          },
          {
            id: "ac",
            user: true,
            trigger: "last",
          },
          {
            id: "last",
            message: "Thank You!Your feedback has been recorded",
            asMessage: true,
            trigger: "end",
          },
          {
            id: "end",
            message: "Have a good day!!",
            asMessage: true,
            end: true,
          },
        ]}
        {...config}
      />
    </div>
  );
};

export default Chatbot;