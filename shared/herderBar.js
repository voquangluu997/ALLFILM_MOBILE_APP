import React from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { View, TouchableOpacity, StyleSheet } from "react-native";

import { COLORS, SIZES } from "../constants";
export default function renderHeaderBar(icon1, icon2) {
  return (
    <View
      style={{
        paddingTop: 30,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: SIZES.padding,
      }}
    >
      <TouchableOpacity style={styles.formatIcon} onPress={icon1.onPress}>
        <MaterialIcons name={icon1.name} color={COLORS.primary} size={40} />
      </TouchableOpacity>

      <TouchableOpacity style={styles.formatIcon} onPress={icon2.onPress}>
        <MaterialIcons name={icon2.name} color={COLORS.lightGray} size={40} />
      </TouchableOpacity>
    </View>
  );
}

let styles = StyleSheet.create({
  formatIcon: {
    alignItems: "center",
    justifyContent: "center",
    width: 50,
    height: 50,
  },
});
