import React from "react";
import AppLoading from "expo-app-loading";

import { ThemeProvider } from "styled-components/native";

import {
  useFonts,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_700Bold,
} from "@expo-google-fonts/poppins";

import theme from "./src/global/styles/theme";
// import { Dashboard } from "./src/components/Dashboard";
import { StatusBar } from "expo-status-bar";
import { Register } from "./src/screens/Register";

export default function App() {
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_700Bold,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }
  return (
    <ThemeProvider theme={theme}>
      <StatusBar style="inverted" />
      <Register />
    </ThemeProvider>
  );
}
