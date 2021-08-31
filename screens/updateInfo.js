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

export default function UpdateInfo({ navigation }) {
  const [message, setMessage] = useState("");
  let [token, setToken] = useState(null);
  let [name, setName] = useState(null);
  let [fullName, setFullName] = useState(null);
  let [email, setEmail] = useState(null);
  let [phone, setPhone] = useState(null);
  useEffect(() => {
    getToken().then((t) => {
      setToken(t);
    });
  }, []);

  const pressHandler = () => {
    navigation.navigate("Home");
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
          name: "",
          fullName: "",
          email: "",
          phone: "",
        }}
        onSubmit={async (values, actions) => {
          const config = {
            headers: { Authorization: `Bearer ${token}` },
          };

          axios
            .put(
              `${API_URL}/user/profile`,
              {
                name,
                fullname: fullName,
                email,
                phone,
              },
              config
            )
            .then(async (response) => {
              // setUser(response);
              alert(" Cập nhật thông tin thành công");
              // navigation.navigate("Profile");
            })
            .catch((error) => {
              console.log(error);
              alert(
                " cập nhật thất bại, vui lòng kiểm tra lại thông tin đã nhập"
              );
            });
        }}
      >
        {(props) => (
          <View>
            <TextInput
              style={globalStyles.input}
              placeholder="Name"
              onChangeText={(value) => {
                setName(value);
              }}
              value={name}
              onBlur={props.handleBlur("name")}
            />

            <TextInput
              style={globalStyles.input}
              placeholder="Full name"
              onChangeText={(value) => {
                setFullName(value);
              }}
              value={fullName}
              onBlur={props.handleBlur("fullName")}
            />

            <TextInput
              style={globalStyles.input}
              placeholder="Email"
              onChangeText={(value) => {
                setEmail(value);
              }}
              value={email}
              onBlur={props.handleBlur("email")}
            />

            <TextInput
              style={globalStyles.input}
              placeholder="Phone"
              onChangeText={(value) => {
                setPhone(value);
              }}
              value={phone}
              onBlur={props.handleBlur("phone")}
            />

            <Text style={globalStyles.errorText}>{message}</Text>

            <FlatButton
              text="Update Profile"
              onPress={props.handleSubmit}
            ></FlatButton>

            <Text style={styles.centerText}> Or</Text>
            <TransParentButton
              text="Move to Home"
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
});
