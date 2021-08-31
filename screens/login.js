import React, { useState } from "react";
import { globalStyles } from "../styles/global";
import { Formik } from "formik";
import { FlatButton, TransParentButton } from "../shared/button";
import { api_url } from "../constants";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Text, View, TextInput, StyleSheet, ScrollView } from "react-native";
import { setUserSession } from "../utils/common";
import axios from "axios";
import { API_URL } from "@env";

export default function Login({ navigation }) {
  const [message, setMessage] = useState("");
  const pressHandler = () => {
    navigation.navigate("Register");
  };

  return (
    <ScrollView
      contentContainerStyle={[
        globalStyles.container,
        globalStyles.centerContext,
      ]}
    >
      <Formik
        initialValues={{ username: "", password: "" }}
        onSubmit={async (values, actions) => {
          axios
            .post(`${API_URL}/auth/login`, {
              username: "ramenhoang",
              // username: values.username,
              // password: values.password,
              password: "Aa@123456",
            })
            .then(async (response) => {
              if (!response.error) {
                let user = await axios.get(`${API_URL}/user/profile`, {
                  headers: {
                    Authorization: `Bearer ${response.data.access_token}`,
                  },
                });

                setUserSession(response.data.access_token, user.data);
                navigation.navigate("Home", {
                  info: {
                    user: user.data,
                    token: response.data.access_token,
                  },
                });
              } else {
                setMessage(resData.error.errors[0].message);
              }
            })
            .catch((error) => {
              alert(error.response.data.error.errors[0].message);
              // alert(error.response.error.errors[0].message);
            });

          // fetch(api_url + "/auth/login", {
          //   method: "POST",
          //   headers: {
          //     Accept: "application/json",
          //     "Content-Type": "application/json",
          //   },
          //   body: JSON.stringify({
          //     username: "anhnguyenhoang321@gmail.com",
          //     // username: values.username,
          //     // password: values.password,
          //     password: "Aa@12345",
          //   }),
          // })
          //   .then((res) => res.json())
          //   .then((resData) => {
          //     if (!resData.error) {
          //       navigation.navigate("Home");
          //       saveUserToken(resData.access_token);
          //     } else {
          //       setMessage(resData.error.errors[0].message);
          //     }
          //   })
          //   .catch((error) => {
          //     alert(error);
          //   });

          // actions.resetForm();
        }}
      >
        {(props) => (
          <View>
            <TextInput
              style={globalStyles.input}
              placeholder="Username/Email"
              onChangeText={props.handleChange("username")}
              value={props.values.username}
              onBlur={props.handleBlur("username")}
            />
            <Text style={globalStyles.errorText}>
              {props.touched.username && props.errors.title}
            </Text>

            <TextInput
              style={globalStyles.input}
              secureTextEntry={true}
              placeholder="Password"
              onChangeText={props.handleChange("password")}
              value={props.values.password}
              onBlur={props.handleBlur("password")}
            />

            <Text style={globalStyles.errorText}>{message}</Text>

            <FlatButton text="Login" onPress={props.handleSubmit}></FlatButton>

            <Text style={[styles.underline, styles.centerText]}>
              Forgot password?
            </Text>
            <Text style={styles.centerText}> Or</Text>
            <TransParentButton
              text="Register"
              onPress={pressHandler}
            ></TransParentButton>
          </View>
        )}
      </Formik>
    </ScrollView>
  );
}

let styles = StyleSheet.create({
  underline: { textDecorationLine: "underline" },
  centerText: { textAlign: "center", marginTop: 15, marginBottom: 10 },
  // registerButton: { backgroundColor: "#eee", marginTop: 100 },
});
