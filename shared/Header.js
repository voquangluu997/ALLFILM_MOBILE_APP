import React, { useState } from "react";
import { Text, View, StyleSheet, Image, ImageBackground } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { Dimensions } from "react-native";

export default function Header({ namePage, navigation }) {
  const openMenu = () => {
    navigation.openDrawer();
  };

  return (
    // <ImageBackground style={styles.header} source={require('../assets/game_bg.png')}>
    <View style={styles.header}>
      <MaterialIcons
        name="menu"
        size={28}
        onPress={openMenu}
        style={styles.icon}
      />
      <View style={styles.headerTitle}>
        {/* <Image
          source={require("../assets/heart_logo.png")}
          style={styles.headerImage}
        ></Image> */}
        <Text style={styles.headerText}>{namePage}</Text>
      </View>
    </View>
    // </ImageBackground>
  );
}

const styles = StyleSheet.create({
  header: {
    height: "100%",
    width: Dimensions.get("screen").width,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    // backgroundColor: "coral",
  },
  headerText: {
    fontWeight: "bold",
    shadowColor: "#000",
    textShadowOffset: { width: 2, height: 7 },
    textShadowRadius: 10,
    elevation: 12,
    fontSize: 26,
    color: "#DE0233",
    letterSpacing: 1,
  },
  icon: {
    position: "absolute",
    left: 16,
  },
  headerTitle: {
    flexDirection: "row",
  },
  headerImage: {
    width: 26,
    height: 26,
    marginHorizontal: 10,
  },
});
