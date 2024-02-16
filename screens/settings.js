import React, { useContext } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  ToastAndroid,
} from "react-native";
import storage from "../Storage";
import { STORAGE_KEY_HISTORY } from "../Helper";
import { AppStateContext } from "../Context";

export function Settings() {
  const { setNeedStorageRefresh } = useContext(AppStateContext);

  const showDeleteToast = () => {
    ToastAndroid.showWithGravity(
      "Successfully cleared history!",
      ToastAndroid.SHORT,
      ToastAndroid.TOP
    );
  };

  const clearAllHistory = () => {
    storage.clearMapForKey(STORAGE_KEY_HISTORY);
    setNeedStorageRefresh(true);
    showDeleteToast();
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Settings</Text>
      </View>
      <View style={styles.content}>
        <View style={styles.settingItem}>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              gap: 8,
              alignItems: "center",
            }}
          >
            <Image
              source={require("../assets/trash-icon.png")}
              resizeMode="contain"
              style={{
                width: 16,
                height: 16,
                tintColor: "#6B6B6B",
              }}
            />
            <Text style={styles.settingsFont}>Clear all data</Text>
          </View>
          <TouchableOpacity style={styles.button} onPress={clearAllHistory}>
            <Text style={{ fontSize: 16 }}>Clear</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f6f6f6",
  },
  header: {
    paddingTop: 100,
    paddingBottom: 92,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    elevation: 4,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  content: {
    display: "flex",
    flexDirection: "column",
    gap: 16,
    padding: 24,
  },
  settingItem: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  settingsFont: {
    fontSize: 16,
    fontWeight: "bold",
  },
  button: {
    padding: 4,
    paddingLeft: 16,
    paddingRight: 16,
    borderRadius: 10,
    backgroundColor: "#fff",
  },
});
