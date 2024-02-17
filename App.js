import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { Tabs } from "./components/tab";
import { StatusBar } from "expo-status-bar";
import { AppStateProvider } from "./utils/context";

export default function App() {
  return (
    <AppStateProvider>
      <NavigationContainer>
        <StatusBar backgroundColor="white" barStyle="dark" />
        <Tabs />
      </NavigationContainer>
    </AppStateProvider>
  );
}
