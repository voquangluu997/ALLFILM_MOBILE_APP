import React, { useState, useEffect } from "react";
import { SafeAreaView, ScrollView, View } from "react-native";
import { SIZES, api_url } from "../constants";
import { FlatButton } from "../shared/button";
import { ProfileLine, ProfileItem } from "../shared/profile";
import { getUser, getToken, removeUserSession } from "../utils/common";
import axios from "axios";

export default function Profile({ navigation }) {
  let [userInfo, setUserInfo] = useState(null);
  let [token, setToken] = useState(null);
  let [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    getUser().then((u) => {
      if (u && u != null) setIsLogin(true);
      console.log("uxx", u);
      setUserInfo(u);
    });

    getToken().then((t) => {
      setToken(t);
    });

    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };

    // if (!isLogin) alert("you need login to review this movie");
    // else {
    if (token)
      axios
        .get(`${api_url}/user/profile`, config)
        .then((res) => {
          console.log("data", res.data);
          setIsLogin(true);
        })
        .catch((error) => {
          console.log(error);
        });
    // }
  }, [isLogin]);

  return (
    // : navigation.navigate("Profile");
    <SafeAreaView>
      <ScrollView
        contentContainerStyle={{
          marginTop: 40,
        }}
      >
        <ProfileLine title="Profile" />
        <ProfileItem icon="account-circle" content={userInfo?.fullname} />
        <ProfileItem icon="email" content={userInfo?.email} />
        <ProfileItem icon="phone" content={userInfo?.phone} />
        <ProfileLine title="Transaction history" />
        <ProfileLine
          title="Update password"
          onPress={() => {
            navigation.navigate("UpdatePassword");
          }}
        />
        <ProfileLine
          title="Update personal infomation"
          onPress={() => {
            navigation.navigate("UpdateInfo");
          }}
        />
        <View style={{ marginVertical: 30 }}>
          <View style={{ flexDirection: "row", justifyContent: "center" }}>
            <FlatButton
              text="Logout"
              onPress={() => {
                removeUserSession();
                setIsLogin(!isLogin);
                setUserInfo(null);
                setToken(null);
                console.log(userInfo);
                navigation.navigate("Login");
              }}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
