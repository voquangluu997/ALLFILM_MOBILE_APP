import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  SafeAreaView,
  TouchableWithoutFeedback,
  ImageBackground,
  ScrollView,
  Animated,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import renderHeaderBar from "../shared/headerBar";
import { COLORS, SIZES, api_url } from "../constants";
import { BookButton, FlatButton } from "../shared/button";
// import { newSeason, comingSoon } from "../constants/dummy";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ProfileLine, ProfileItem } from "../shared/profile";
import { set } from "react-native-reanimated";

export default function Profile({ navigation }) {
  let [userInfo, setUserInfo] = useState({});
  let [isLogin, setIsLogin] = useState(false);
  useEffect(() => {
    AsyncStorage.getItem("token").then((userToken) => {
      if (userToken != null) {
        setIsLogin(true);
      } else console.log("false");
      fetch(api_url + "/user/profile", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + userToken,
        },
      })
        .then((response) => response.json())
        .then((resUserProfile) => {
          if (!resUserProfile.error) {
            setUserInfo(resUserProfile);
          } else setIsLogin(false);
        })
        .catch((err) => {
          console.log(err);
        });
      // setUserInfo({ data });
    });
  }, []);
  // return navigation.navigate("Login");

  // ;

  return isLogin == false ? (
    navigation.navigate("Login")
  ) : (
    // : navigation.navigate("Profile");
    <SafeAreaView>
      <ScrollView
        contentContainerStyle={{
          marginTop: SIZES.padding,
        }}
      >
        <ProfileLine title="Profile" />
        <ProfileItem icon="account-circle" content={userInfo?.fullname} />
        <ProfileItem icon="email" content={userInfo?.email} />
        <ProfileItem icon="phone" content={userInfo?.phone} />
        <ProfileItem
          icon="phone"
          content={isLogin === false ? "false" : "true"}
        />
        {/* <ProfileItem icon="logout" content="Logout" /> */}

        {/* <TouchableOpacity
          style={{
            flexDirection: "row",
            paddingHorizontal: SIZES.padding,
            paddingVertical: SIZES.base,
            alignItems: "center",
            justifyContent: "flex-start",
          }}
        >
          <Text
            style={{
              flex: 1,
              fontWeight: "bold",
              fontSize: 20,
            }}
          >
            Profile
          </Text>
          <Text
            style={{
              color: COLORS.blue,
              fontWeight: "bold",
              textTransform: "uppercase",
            }}
          >
            Edit
          </Text>
        </TouchableOpacity> */}
        {/* <ProfileLine
          title="profile"
          onPress={() => {
            console.log("helllo");
          }}
        /> */}

        <FlatButton
          text="Logout"
          onPress={() => {
            AsyncStorage.removeItem("token");
            setIsLogin(!isLogin);
            setUserInfo({});
            // navigation.navigate("Login");
          }}
        />
      </ScrollView>
    </SafeAreaView>
  );
}
