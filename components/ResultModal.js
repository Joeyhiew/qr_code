import React, { useEffect, useContext } from "react";
import {
  Modal,
  View,
  Text,
  StyleSheet,
  Pressable,
  TouchableOpacity,
  Linking,
} from "react-native";
import * as Clipboard from "expo-clipboard";
import storage from "../Storage";
import { STORAGE_KEY_HISTORY } from "../Helper";
import { getCurrentDateTime } from "../Helper";
import { AppStateContext } from "../Context";

export const ResultModal = ({
  data,
  isModalVisible,
  setModalVisible,
  setScanned,
}) => {
  const { setNeedStorageRefresh } = useContext(AppStateContext);

  const closeAndRescan = () => {
    setModalVisible(!isModalVisible);
    setScanned(false);
  };

  const handleCopy = async () => {
    await Clipboard.setStringAsync(data);
    closeAndRescan();
  };

  const handleOpenLink = () => {
    closeAndRescan();
    Linking.openURL(data).catch((err) =>
      console.error("An error occured", err)
    );
  };

  useEffect(() => {
    if (data) {
      const dateTime = getCurrentDateTime();
      storage.save({
        key: STORAGE_KEY_HISTORY,
        id: dateTime,
        data: {
          id: dateTime,
          dataString: data,
        },

        // if expires not specified, the defaultExpires will be applied instead.
        // if set to null, then it will never expire.
        expires: 1000 * 3600,
      });
      setNeedStorageRefresh(true);
    }
  }, [data]);

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isModalVisible}
      onRequestClose={() => {
        closeAndRescan();
      }}
      onBackdropPress={() => closeAndRescan()}
    >
      <Pressable
        style={styles.outsideModal}
        onPress={(event) => {
          if (event.target == event.currentTarget) {
            closeAndRescan();
          }
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={styles.modalHeader}>
              <View style={styles.modalHeaderContent}>
                <Text style={styles.modalTitle}>
                  Successfully scanned result
                </Text>
              </View>
              <TouchableOpacity onPress={() => closeAndRescan()}>
                <Text style={styles.modalHeaderCloseText}>x</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.modalContent}>
              <Text style={styles.modalText}>{data}</Text>
            </View>
            <View style={styles.buttonGroup}>
              <TouchableOpacity
                style={[styles.button]}
                onPress={() => handleCopy()}
              >
                <Text style={styles.textStyle}>Copy</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, styles.buttonClose]}
                onPress={() => handleOpenLink()}
              >
                <Text style={styles.textStyle}>Open link</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Pressable>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  outsideModal: {
    backgroundColor: "rgba(1, 1, 1, 0.2)",
    flex: 1,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    // alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonClose: {
    backgroundColor: "#6C7EE9",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "left",
  },
  modalHeader: {
    flexDirection: "row",
  },
  /* The header takes up all the vertical space not used by the close button. */
  modalHeaderContent: {
    flexGrow: 1,
  },
  modalTitle: {
    fontWeight: "600",
    fontSize: 16,
  },
  modalHeaderCloseText: {
    textAlign: "center",
    paddingLeft: 5,
    paddingRight: 5,
  },
  modalContent: {
    textAlign: "left",
  },
  buttonGroup: {
    display: "flex",
    flexDirection: "row",
    gap: 8,
    justifyContent: "flex-end",
  },
});