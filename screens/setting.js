import React from "react";
import { MaterialIcons } from "@expo/vector-icons";
import {
  Text,
  View,
  SafeAreaView,
  TouchableWithoutFeedback,
  ImageBackground,
  ScrollView,
  Animated,
  StyleSheet,
} from "react-native";
import renderHeaderBar from "../shared/headerBar";
import { COLORS, SIZES } from "../constants";
import { BookButton } from "../shared/button";
import { newSeason, comingSoon } from "../constants/dummy";
import ComingSoonComponent from "../shared/childComponent";

export default function Setting() {
  return (
    <View
      style={{
        flex: 1,
        // backgroundColor: "#000",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Text> setting screen</Text>
    </View>
  );
}
