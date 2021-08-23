import React, { useState } from "react";
import { globalStyles } from "../styles/global";
import { Formik } from "formik";
import { FlatButton, TransParentButton } from "../shared/button";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Text, View, TextInput, StyleSheet, ScrollView } from "react-native";
import { api_url } from "../constants";

export default function Register({ navigation }) {
  const [message, setMessage] = useState("");
  const pressHandler = () => {
    navigation.navigate("Login");
  };
  return (
    <View style={[globalStyles.container, globalStyles.centerContext]}>
      <KeyboardAwareScrollView>
        <Formik
          initialValues={{
            username: "",
            password: "",
            name: "",
            email: "",
            phone: "",
            fullname: "",
          }}
          onSubmit={(values, actions) => {
            fetch(api_url + "/auth/register", {
              method: "POST",
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                username: values.username,
                fullname: values.fullname,
                email: values.email,
                phone: values.phone,
                password: values.password,
                name: values.name,
              }),
            })
              .then((res) => res.json())
              .then((resData) => {
                console.log( resData)
                if (!resData.error) {
                  navigation.navigate("Home");
                } else {
                  setMessage(resData.error.errors[0].message);
                }
              })
              .catch((error) => {
                console.log(error);
              });
          }}
        >
          {(props) => (
            <View>
              <TextInput
                style={globalStyles.input}
                placeholder="Username"
                onChangeText={props.handleChange("username")}
                value={props.values.username}
                onBlur={props.handleBlur("username")}
              />

              <TextInput
                style={globalStyles.input}
                secureTextEntry={true}
                placeholder="Password"
                onChangeText={props.handleChange("password")}
                value={props.values.password}
                onBlur={props.handleBlur("password")}
              />

              <TextInput
                style={globalStyles.input}
                placeholder="Name"
                onChangeText={props.handleChange("name")}
                value={props.values.name}
                onBlur={props.handleBlur("name")}
              />
              <TextInput
                style={globalStyles.input}
                placeholder="Fullname"
                onChangeText={props.handleChange("fullname")}
                value={props.values.fullname}
                onBlur={props.handleBlur("fullname")}
              />

              <TextInput
                style={globalStyles.input}
                placeholder="Email"
                onChangeText={props.handleChange("email")}
                value={props.values.email}
                onBlur={props.handleBlur("email")}
              />

              <TextInput
                style={globalStyles.input}
                placeholder="Phone"
                onChangeText={props.handleChange("phone")}
                value={props.values.phone}
                onBlur={props.handleBlur("phone")}
                keyboardType="numeric"
                maxLength={10}
              />

              <Text style={globalStyles.errorText}>{message}</Text>

              <FlatButton
                text="Register"
                onPress={props.handleSubmit}
              ></FlatButton>

              <Text style={styles.centerText}> Or</Text>
              <TransParentButton
                text="Login"
                onPress={pressHandler}
              ></TransParentButton>
            </View>
          )}
        </Formik>
      </KeyboardAwareScrollView>
    </View>
  );
}

let styles = StyleSheet.create({
  underline: { textDecorationLine: "underline" },
  centerText: { textAlign: "center", marginTop: 15, marginBottom: 10 },
});
