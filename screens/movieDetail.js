import React from "react";
import { globalStyles } from "../styles/global";
import { Text, View, StyleSheet } from "react-native";

export default function MovieDetail({ navigation }) {
  const pressHandler = () => {
    navigation.navigate("Register");
  };

  return (
    <View style={globalStyles.centerItem}>
      <Text onPress={pressHandler}>MoviewDetail</Text>
    </View>
  );
}
