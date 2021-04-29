import React from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";

export function FlatButton({ text, onPress }) {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.button}>
        <Text style={styles.buttonText}>{text}</Text>
      </View>
    </TouchableOpacity>
  );
}

export function TransParentButton({ text, onPress }) {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.transparentButton}>
        <Text style={[styles.buttonText, styles.transparentText]}>{text}</Text>
      </View>
    </TouchableOpacity>
  );
}

let styles = StyleSheet.create({
  button: {
    borderRadius: 8,
    paddingVertical: 14,
    paddingHorizontal: 10,
    backgroundColor: "#f01d71",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    textTransform: "uppercase",
    fontSize: 16,
    textAlign: "center",
  },
  transparentButton: {
    borderRadius: 8,
    paddingVertical: 14,
    paddingHorizontal: 10,
    // backgroundColor: "transparent",
    backgroundColor: "transparent",
    borderWidth: 1,
    
  },
  transparentText: {
    color: "#000"
  }
});
