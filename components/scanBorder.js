import React from "react";
import { View, StyleSheet } from "react-native";
export const ScanBorder = () => {
  return (
    <View
      style={[
        styles.border,
        {
          width: 250,
          height: 250,
        },
      ]}
    >
      <View style={[styles.corner, styles.topLeft]} />
      <View style={[styles.corner, styles.topRight]} />
      <View style={[styles.corner, styles.bottomLeft]} />
      <View style={[styles.corner, styles.bottomRight]} />
    </View>
  );
};

const styles = StyleSheet.create({
  corner: {
    width: 30, // Adjust the width of the corner dashes
    height: 30, // Adjust the height of the corner dashes
    borderWidth: 5,
    borderColor: "#ffffff",
    position: "absolute",
    borderRadius: 2,
  },
  topLeft: {
    top: -1,
    left: -1,
    borderRightWidth: 0,
    borderBottomWidth: 0,
  },
  topRight: {
    top: -1,
    right: -1,
    borderLeftWidth: 0,
    borderBottomWidth: 0,
  },
  bottomLeft: {
    bottom: -1,
    left: -1,
    borderRightWidth: 0,
    borderTopWidth: 0,
  },
  bottomRight: {
    bottom: -2,
    right: -1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
  },
  border: {
    width: 200,
    height: 200,
    borderWidth: 0,
    borderRadius: 10,
    borderColor: "gray",
    position: "relative",
  },
});
