import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Login from "./screens/login";
// import Register from "./screens/register";
import { globalStyles } from "./styles/global";
import Navigator from "./routes/drawer";

export default function App() {
  return (
    <View style={globalStyles.container}>
      <Navigator />
    </View>
  );
}
