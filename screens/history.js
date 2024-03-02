import React, { useEffect, useState, useContext } from "react";
import { View, StyleSheet, Text } from "react-native";
import { TabView, SceneMap } from "react-native-tab-view";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { HistoryList } from "../components/historyList";
import { NavigationContainer } from "@react-navigation/native";
import storage from "../utils/storage";
import { getTodayDate, STORAGE_KEY_HISTORY, dateDiff } from "../utils/helper";
import { AppStateContext } from "../utils/context";
// import {
//   InterstitialAd,
//   TestIds,
//   AdEventType,
//   BannerAd,
//   BannerAdSize,
// } from "react-native-google-mobile-ads";

// const adUnitId = "ca-app-pub-1242539372325896/9121230364";

const Tab = createMaterialTopTabNavigator();

export function History() {
  const [allHistoryList, setAllHistoryList] = useState([]);
  const [todayHistoryList, setTodayHistoryList] = useState([]);
  const { needStorageRefresh, setNeedStorageRefresh } =
    useContext(AppStateContext);

  const deleteRecord = (id) => {
    storage.remove({
      key: STORAGE_KEY_HISTORY,
      id: id,
    });
  };

  const getAllData = async () => {
    storage
      .getAllDataForKey(STORAGE_KEY_HISTORY)
      .then((history) => {
        const TodayDate = getTodayDate();
        const parsedHistory = history.filter((x) => {
          const xID = x.id.split(",")[0] ?? "";
          if (dateDiff(xID, TodayDate) > 10) {
            deleteRecord(x.id);
            return false;
          }
          return true;
        });
        setAllHistoryList(parsedHistory);
        const temp = [];
        const today = getTodayDate();
        parsedHistory.map((dataPoint) => {
          const dataID = dataPoint.id.split(",")[0] ?? "";
          if (dataID === today) {
            temp.push(dataPoint);
          }
        });
        setTodayHistoryList(temp);
      })
      .catch((e) => {
        console.log(e);
      });
    setNeedStorageRefresh(false);
  };

  //check dependency refresh
  useEffect(() => {
    if (needStorageRefresh) {
      getAllData();
    }
  }, [needStorageRefresh]);

  return (
    <View style={styles.container}>
      <View style={styles.headerView}>
        <View style={{ alignItems: "center", display: "flex" }}>
          <Text style={styles.title}>Scanning History</Text>
          <Text style={{ color: "#CCCCD0" }}>
            Only keeps your last 10 days history (max 1000 records)
          </Text>
        </View>
        <NavigationContainer independent={true}>
          <Tab.Navigator>
            <Tab.Screen
              name="Today"
              children={() => {
                return <HistoryList type="Today" list={todayHistoryList} />;
              }}
            />
            <Tab.Screen
              name="All"
              children={() => {
                return <HistoryList type="All" list={allHistoryList} />;
              }}
            />
          </Tab.Navigator>
        </NavigationContainer>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerView: {
    paddingTop: 100,
    flex: 1,
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#fff",
    gap: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
});
