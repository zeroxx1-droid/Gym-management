"use client";

import React from "react";
import { GymProvider } from "@/context/GymContext";

export const ClientProviders: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <GymProvider>{children}</GymProvider>;
};
