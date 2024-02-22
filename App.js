import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { Tabs } from "./components/tab";
import { StatusBar } from "expo-status-bar";
import { AppStateProvider } from "./utils/context";
import mobileAds from "react-native-google-mobile-ads";
import "expo-dev-client";

export default function App() {
  const [loading, setLoading] = useState(true);
  mobileAds()
    .initialize()
    .then((adapterStatuses) => {
      // Initialization complete!
      setLoading(false);
    });

  return (
    <>
      {loading ? (
        <>loading...</>
      ) : (
        <AppStateProvider>
          <NavigationContainer>
            <StatusBar backgroundColor="white" />
            <Tabs />
          </NavigationContainer>
        </AppStateProvider>
      )}
    </>
  );
}
