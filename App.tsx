import React from "react";

import { ThemeProvider } from "styled-components/native";

import {
  useFonts,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_700Bold,
} from "@expo-google-fonts/poppins";

import theme from "./src/global/styles/theme";
import { Dashboard } from "./src/components/Dashboard";

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <Dashboard />
    </ThemeProvider>
  );
}
