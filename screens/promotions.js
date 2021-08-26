import React, { useEffect } from "react";
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
import { getToken, get } from "../utils/common";
import userApi from "../api/userApi";
import filmApi from "../api/filmApi";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Promotion() {
  useEffect(() => {
    const getUserInfo = async () => {
      try {
        const res = await filmApi.getAll();
        console.log(res);
      } catch (error) {
        console.log(error);
      }
    };
    getUserInfo();
  }, []);
  return (
    <View
      style={{
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Text> Promotion screen</Text>
    </View>
  );
}
