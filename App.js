import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { Tabs } from "./Tab";
import { StatusBar } from "expo-status-bar";
import { AppStateProvider } from "./Context";

export default function App() {
  return (
    <AppStateProvider>
      <NavigationContainer>
        <StatusBar backgroundColor="white" barStyle="dark-content" />
        <Tabs />
      </NavigationContainer>
    </AppStateProvider>
  );
}
