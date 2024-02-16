import React, { useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  Linking,
  ToastAndroid,
} from "react-native";
// import AsyncStorage from "@react-native-async-storage/async-storage";
import storage from "../utils/storage";
import { STORAGE_KEY_HISTORY } from "../utils/helper";
import { AppStateContext } from "../utils/context";

// data format:
// const data = [
//   {
//     key: "history",
//     id: "2023-01-30,16:00:00",
//     data: {
//       id: "2023-01-30,16:00:00",
//       dataString: "www.google.com",
//     },
//   },
//   {
//     key: "history",
//     id: "2023-01-31,16:00:00",
//     data: {
//       id: "2023-01-31,16:00:00",
//       dataString: "www.abc.com",
//     },
//   },
// ];

export function HistoryList(props) {
  const list = props.list;
  const { setNeedStorageRefresh } = useContext(AppStateContext);

  const showDeleteToast = () => {
    ToastAndroid.show("Successfully deleted record!", ToastAndroid.SHORT);
  };

  const deleteRecord = (id) => {
    storage.remove({
      key: STORAGE_KEY_HISTORY,
      id: id,
    });
    setNeedStorageRefresh(true);
    showDeleteToast();
  };

  const handleOpenLink = (link) => {
    Linking.openURL(link).catch((err) =>
      console.error("An error occured", err)
    );
  };

  const generateListCard = (data) => {
    return (
      <View style={styles.listItem} key={data.id}>
        <View style={styles.fileImage}>
          <Image
            source={require("../assets/file-icon.png")}
            resizeMode="contain"
            style={{
              width: 30,
              height: 30,
              tintColor: "#6C7EE9",
            }}
          />
        </View>
        <Text numberOfLines={1} style={{ flex: 1 }}>
          {data.dataString}
        </Text>
        <TouchableOpacity
          onPress={() => {
            handleOpenLink(data.dataString);
          }}
        >
          <View style={styles.buttonView}>
            <Image
              source={require("../assets/popup-link-icon.png")}
              style={{
                width: 16,
                height: 16,
                tintColor: "#6C7EE9",
              }}
            />
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => deleteRecord(data.id)}>
          <View style={styles.buttonView}>
            <Image
              source={require("../assets/cancel-circle.png")}
              style={{
                width: 16,
                height: 16,
                tintColor: "#6C7EE9",
              }}
            />
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.listContainer}>
      {!(list.length > 0) ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No history found</Text>
          <Text style={styles.emptyText}>
            Click the button below to scan now
          </Text>
        </View>
      ) : (
        <ScrollView>
          <View style={styles.scrollView}>
            {list.map((data) => generateListCard(data))}
          </View>
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  listContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "#f6f6f6",
    flex: 1,
    height: "80%",
  },
  scrollView: {
    display: "flex",
    flexDirection: "column",
    gap: 16,
    alignItems: "center",
    backgroundColor: "#f6f6f6",
    // flex: 1,
    height: "80%",

    paddingTop: 24,
    paddingBottom: 160,
  },

  listItem: {
    borderRadius: 10,
    backgroundColor: "#ffffff",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
    width: "90%",
    gap: 8,
  },
  fileImage: {
    width: 40,
    height: 40,
    backgroundColor: "#fff",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonView: {
    width: 30,
    height: 30,
    borderRadius: 20,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    // paddingTop: 100,
  },
  emptyText: {
    color: "#C0C0C0",
    flexWrap: "wrap",
  },
});
