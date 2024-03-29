import React, { useEffect, useState } from "react";
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Linking,
} from "react-native";
import { Camera, CameraView } from "expo-camera/next";
import { ResultModal } from "../components/resultModal";
import { ScanBorder } from "../components/scanBorder";

export function Scan(props) {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanData, setScanData] = useState();
  const [scanned, setScanned] = useState(false);
  const [isFlashlightOn, setIsFlashlightOn] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);

  const askForCameraPermission = () => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  };

  useEffect(() => {
    askForCameraPermission();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    setScanData(data);
    setModalVisible(true);
    // alert(`QR code of type ${type} and data ${data} has been scanned`);
  };

  const handleFlashlightClicked = () => {
    setIsFlashlightOn((prev) => !prev);
  };

  if (hasPermission === null) {
    return (
      <View style={styles.container}>
        <Text>Requesting for camera permission</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => Linking.openSettings()}
        >
          <Text style={styles.textStyle}>Grant permission</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (hasPermission === false) {
    return (
      <View style={styles.container}>
        <Text>No access to camera</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => Linking.openSettings()}
        >
          <Text style={styles.textStyle}>Grant permission</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <CameraView
        enableTorch={isFlashlightOn}
        onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      ></CameraView>
      <View style={styles.display}>
        <Text style={styles.displayText}>Scan a QR code</Text>
      </View>
      <ScanBorder />
      <TouchableOpacity
        style={styles.flashlightButton}
        onPress={handleFlashlightClicked}
      >
        <View style={isFlashlightOn ? styles.viewLightOn : styles.viewLightOff}>
          <Image
            source={require("../assets/flashlight.png")}
            style={isFlashlightOn ? styles.flashlightOn : styles.flashlightOff}
          />
        </View>
      </TouchableOpacity>
      <ResultModal
        data={scanData}
        isModalVisible={isModalVisible}
        setModalVisible={setModalVisible}
        setScanned={setScanned}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f6f6f6",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  display: {
    padding: 16,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    color: "#ffffff",
    position: "absolute",
    top: 50,
    left: "auto",
    borderRadius: 12,
  },
  displayText: {
    color: "#ffffff",
    fontWeight: "500",
    fontSize: 18,
  },
  flashlightButton: {
    position: "absolute",
    bottom: 150,
    left: 30,
  },
  viewLightOn: {
    width: 70,
    height: 70,
    borderRadius: 50,
    backgroundColor: "rgba(255, 255, 255, 0.6)",
    justifyContent: "center",
    alignItems: "center",
  },
  viewLightOff: {
    width: 70,
    height: 70,
    borderRadius: 50,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    justifyContent: "center",
    alignItems: "center",
  },
  flashlightOn: {
    height: 40,
    width: 40,
    tintColor: "#000000",
  },
  flashlightOff: {
    height: 40,
    width: 40,
    tintColor: "#ffffff",
  },
  cancelButton: {
    position: "absolute",
    bottom: 150,
    right: 20,
  },
  cancelImage: {
    height: 35,
    width: 35,
    tintColor: "#ffffff",
  },
  viewCancel: {
    width: 70,
    height: 70,
    borderRadius: 50,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    justifyContent: "center",
    alignItems: "center",
  },
  textStyle: {
    fontSize: 16,
    fontWeight: "500",
    color: "#fff",
  },
  button: {
    borderRadius: 20,
    padding: 10,
    backgroundColor: "#6C7EE9",
    marginTop: 12,
  },
});
