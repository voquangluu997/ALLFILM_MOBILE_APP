import React from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { Text, View } from "react-native";
import { COLORS, SIZES} from "../constants";

export default function TitleBar({title}) {
  return (
    <View
      style={{
        flexDirection: "row",
        paddingHorizontal: SIZES.padding,
        alignItems: "center",
        justifyContent: "flex-start",
      }}
    >
      <Text
        style={{
          flex: 1,
          color: COLORS.title,
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
    </View>
  );
}
