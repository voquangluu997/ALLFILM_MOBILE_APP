import React, { useState, useEffect } from "react";
import { globalStyles } from "../styles/global";
import { Formik } from "formik";
import { FlatButton, TransParentButton } from "../shared/button";
import { api_url } from "../constants";
import { Text, View, TextInput, StyleSheet, ScrollView } from "react-native";
import { setUserSession } from "../utils/common";
import axios from "axios";
import { API_URL } from "@env";
import { getToken } from "../utils/common";

export default function UpdatePassword({ navigation }) {
  const [message, setMessage] = useState("");
  let [token, setToken] = useState(null);
  let [currentPassword, setCurrentPassword] = useState(null);
  let [newPassword, setNewPassword] = useState(null);
  let [confirmPassword, setConfirmPassword] = useState(null);
  useEffect(() => {
    getToken().then((t) => {
      setToken(t);
    });
  }, []);

  const pressHandler = () => {
    navigation.navigate("Login");
  };

  return (
    <ScrollView
      contentContainerStyle={[
        globalStyles.container,
        globalStyles.centerContext,
      ]}
    >
      <Formik
        initialValues={{
          currentPassword: "",
          newPassword: "",
          confirmPassword: "",
        }}
        onSubmit={async (values, actions) => {
          const config = {
            headers: { Authorization: `Bearer ${token}` },
          };

          axios
            .put(
              `${API_URL}/user/profile/password`,
              {
                currentPassword,
                newPassword,
                confirmPassword,
              },
              config
            )
            .then(async (response) => {
              alert(" Bạn đã đổi mật khẩu thành công");
              navigation.navigate("Profile")
            })
            .catch((error) => {
              alert(error.response.data.error.errors[0].message);
              // alert(error);
            });
        }}
      >
        {(props) => (
          <View>
            <TextInput
              style={globalStyles.input}
              placeholder="Current pasword"
              onChangeText={
                (value) => {
                  setCurrentPassword(value);
                }
                // (props.handleChange("currentPassword")
                // setCurrentPassword(props.values.currentPassword)
              }
              value={currentPassword}
              onBlur={props.handleBlur("currentPassword")}
            />
            {/* <Text style={globalStyles.errorText}>
              {props.touched.currentPassword && props.errors.title}
            </Text> */}

            <TextInput
              style={globalStyles.input}
              secureTextEntry={true}
              placeholder="New Password"
              onChangeText={(value) => {
                setNewPassword(value);
              }}
              value={newPassword}
              onBlur={props.handleBlur("newPassword")}
            />

            <TextInput
              style={globalStyles.input}
              secureTextEntry={true}
              placeholder="Confirm Password"
              onChangeText={(value) => {
                setConfirmPassword(value);
              }}
              value={confirmPassword}
              onBlur={props.handleBlur("confirmPassword")}
            />

            <Text style={globalStyles.errorText}>{message}</Text>

            <FlatButton
              text="Update Password"
              onPress={props.handleSubmit}
            ></FlatButton>

            <Text style={styles.centerText}> Or</Text>
            <TransParentButton
              text="Move to Login"
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
