import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { Tabs } from "./components/tab";
import { StatusBar } from "expo-status-bar";
import { AppStateProvider } from "./utils/context";
// import mobileAds from "react-native-google-mobile-ads";

export default function App() {
  // mobileAds()
  //   .initialize()
  //   .then((adapterStatuses) => {
  //     // Initialization complete!
  //   });

  return (
    <AppStateProvider>
      <NavigationContainer>
        <StatusBar backgroundColor="white" />
        <Tabs />
      </NavigationContainer>
    </AppStateProvider>
  );
}
