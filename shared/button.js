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
      <View style={[styles.button, styles.transparentButton]}>
        <Text style={[styles.buttonText, styles.transparentText]}>{text}</Text>
      </View>
    </TouchableOpacity>
  );
}

export function BookButton({ text, onPress }) {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={[styles.button, styles.bookButton]}>
        <Text style={[styles.buttonText, styles.bookText]}>{text}</Text>
      </View>
    </TouchableOpacity>
  );
}

export function SeatButton({ text, onPress }) {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.seatButton}>
        <Text style={styles.seatBookText}>{text}</Text>
      </View>
    </TouchableOpacity>
  );
}

export function SeatTitle({ text, onPress }) {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.seatTitle}>
        <Text style={styles.seatTitleText}>{text}</Text>
      </View>
    </TouchableOpacity>
  );
}

export function SeatChoosing({ text, onPress }) {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={[styles.seatButton, styles.seatChoosing]}>
        <Text style={styles.seatTitleText}>{text}</Text>
      </View>
    </TouchableOpacity>
  );
}

export function SeatChoosed({ text, onPress }) {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={[styles.seatButton, styles.seatChoosed]}>
        <Text style={styles.seatTitleText}>{text}</Text>
      </View>
    </TouchableOpacity>
  );
}

let styles = StyleSheet.create({
  seatButton: {
    marginHorizontal: 3,
    borderRadius: 5,
    paddingVertical: 5,
    paddingHorizontal: 5,
    backgroundColor: "transparent",
    borderColor: "#000",
    borderWidth: 0.5,
    width: 23,
    fontSize: 10,
  },
  seatChoosing: {
    backgroundColor: "#2ECC71",
  },
  seatChoosed: {
    backgroundColor: "#E74C3C",
  },

  seatTitle: {
    width: 27,
    borderRadius: 5,
    paddingVertical: 5,
    paddingHorizontal: 5,
    marginRight: 8,
    backgroundColor: "#000",
    borderWidth: 0.5,
    fontSize: 5,
  },

  seatBookText: {
    color: "#000",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 10,
  },

  seatTitleText: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 10,
  },

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
    backgroundColor: "transparent",
    borderWidth: 1,
  },
  transparentText: {
    color: "#000",
  },
  bookButton: {
    paddingVertical: 7,
    paddingHorizontal: 5,
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: "#fff",
  },
  bookText: {
    color: "#fff",
    fontSize: 14,
  },
});
