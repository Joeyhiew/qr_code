import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { Tabs } from "./components/tab";
import { StatusBar } from "expo-status-bar";
import { AppStateProvider } from "./utils/context";
import mobileAds from "react-native-google-mobile-ads";
import { Text } from "react-native";
import "expo-dev-client";

export default function App() {
  const [loading, setLoading] = useState(true);
  // mobileAds()
  //   .initialize()
  //   .then((adapterStatuses) => {
  //     setLoading(false);
  //   });

  return <Text>hello</Text>;
}
