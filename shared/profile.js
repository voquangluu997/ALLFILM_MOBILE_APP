import React from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { Text, TouchableOpacity, View } from "react-native";
import { COLORS, SIZES } from "../constants";

export function ProfileLine({ title, onPress }) {
  return (
    <TouchableOpacity
      style={{
        flexDirection: "row",
        paddingHorizontal: SIZES.padding,
        paddingVertical: SIZES.base,
        alignItems: "center",
        justifyContent: "flex-start",
        borderBottomColor:"#aaa",
        borderBottomWidth:0.5,
        marginBottom:10

      }}
      onPress={onPress}
    >
      <Text
        style={{
          flex: 1,
          fontWeight: "bold",
          fontSize: 20,
        }}
      >
        {title}
      </Text>
      <MaterialIcons
        name="keyboard-arrow-right"
        color={COLORS.primary}
        size={24}
      />
    </TouchableOpacity>
  );
}

export function ProfileItem({ content, icon }) {
  return (
    <View
      style={{
        flexDirection: "row",
        paddingHorizontal: SIZES.padding,
        paddingVertical: SIZES.base,
        alignItems: "center",
        // justifyContent: "flex-start",
      }}
    >
      <MaterialIcons name={icon} color={COLORS.primary} size={24} />

      <Text
        style={{
          flex: 1,
          fontWeight: "bold",
          paddingLeft: 5,
        }}
      >
        {content}
      </Text>
    </View>
  );
}
