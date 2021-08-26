import { COLORS } from "../constants";
import { View, Image } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import React from "react";

const TabIcon = ({ focused, icon }) => {
  return (
    <View style={{ alignItems: "center", justifyContent: "center" }}>
      <MaterialIcons
        name={icon}
        size={25}
        color={focused ? COLORS.title : "#aaa"}
      />
    </View>
  );
};
export default TabIcon;
