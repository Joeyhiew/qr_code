import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Scan } from "../screens/scan";
import { Settings } from "../screens/settings";
import { History } from "../screens/history";
import { StyleSheet, View, Image, Text, TouchableOpacity } from "react-native";
import {
  InterstitialAd,
  TestIds,
  AdEventType,
} from "react-native-google-mobile-ads";

const adUnitId = "ca-app-pub-1242539372325896/3319660225";

const interstitial = InterstitialAd.createForAdRequest(adUnitId, {
  requestNonPersonalizedAdsOnly: true,
  keywords: ["fashion"],
});

const Tab = createBottomTabNavigator();

const CustomTabBarButton = ({ children, onPress }) => (
  <TouchableOpacity
    style={{
      top: -30,
      justifyContent: "center",
      alignItems: "center",
      ...styles.shadow,
    }}
    onPress={onPress}
  >
    <View
      style={{
        height: 70,
        width: 70,
        borderRadius: 35,
        backgroundColor: "#6C7EE9",
        elevation: 5,
      }}
    >
      {children}
    </View>
  </TouchableOpacity>
);

export const Tabs = () => {
  const [loaded, setLoaded] = useState(false);

  // useEffect(() => {
  //   const unsubscribe = interstitial.addAdEventListener(
  //     AdEventType.LOADED,
  //     () => {
  //       setLoaded(true);
  //       interstitial.show();
  //     }
  //   );

  //   // Start loading the interstitial straight away
  //   interstitial.load();

  //   // Unsubscribe from events on unmount
  //   return unsubscribe;
  // }, []);

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        header: () => null,
        tabBarStyle: {
          position: "absolute",
          bottom: 25,
          left: 20,
          right: 20,
          elevation: 0,
          backgroundColor: "#ffffff",
          borderRadius: 15,
          height: 90,
          zIndex: 90,
          ...styles.shadow,
        },
      }}
    >
      <Tab.Screen
        name="history"
        component={History}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={{ alignItems: "center", justifyContent: "center" }}>
              <Image
                source={require("../assets/history-icon.png")}
                resizeMode="contain"
                style={{
                  width: 25,
                  height: 25,
                  tintColor: focused ? "#6C7EE9" : "#C0C0C0",
                }}
              />
              <Text style={{ color: focused ? "#6C7EE9" : "#C0C0C0" }}>
                History
              </Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="scan"
        component={Scan}
        options={{
          tabBarIcon: ({ focused }) => (
            <Image
              source={require("../assets/scan-icon.png")}
              resizeMode="contain"
              style={{
                width: 30,
                height: 30,
                tintColor: "#fff",
              }}
            />
          ),
          tabBarButton: (props) => <CustomTabBarButton {...props} />,
        }}
      />
      <Tab.Screen
        name="settings"
        component={Settings}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={{ alignItems: "center", justifyContent: "center" }}>
              <Image
                source={require("../assets/settings-icon.png")}
                resizeMode="contain"
                style={{
                  width: 25,
                  height: 25,
                  tintColor: focused ? "#6C7EE9" : "#C0C0C0",
                }}
              />
              <Text style={{ color: focused ? "#6C7EE9" : "#C0C0C0" }}>
                Settings
              </Text>
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  shadow: {
    shadowColor: "#C0C0C0",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 1,
  },
});
