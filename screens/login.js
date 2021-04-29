import React from "react";
import { globalStyles } from "../styles/global";
import { Formik } from "formik";
import { FlatButton, TransParentButton } from "../shared/button";

import { Text, View, TextInput, StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

export default function Login() {
  return (
    <View style={[globalStyles.container, globalStyles.centerContext]}>
      <Formik
        initialValues={{ username: "", password: "" }}
        onSubmit={(values, actions) => {
          actions.resetForm();
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
            {/* <Text style={globalStyles.errorText}>
              {props.touched.title && props.errors.title}
            </Text> */}

            <TextInput
              style={globalStyles.input}
              secureTextEntry={true}
              placeholder="Password"
              onChangeText={props.handleChange("password")}
              value={props.values.password}
              onBlur={props.handleBlur("password")}
            />
            {/* <Text style={globalStyles.errorText}>
              {props.touched.body && props.errors.body}
            </Text> */}

            {/* <Button
              title="submit"
              color="maroon"
              onPress={props.handleSubmit}
            ></Button> */}

            <FlatButton text="Login" onPress={props.handleSubmit}></FlatButton>

            <Text style={[styles.underline, styles.centerText]}>
              Forgot password?
            </Text>
            <Text style={styles.centerText}> Or</Text>
            <TransParentButton
              text="Register"
              // onPress={props.handleSubmit}
            ></TransParentButton>
          </View>
        )}
      </Formik>
    </View>
  );
}

let styles = StyleSheet.create({
  underline: { textDecorationLine: "underline" },
  centerText: { textAlign: "center", marginTop: 15, marginBottom: 10 },
  // registerButton: { backgroundColor: "#eee", marginTop: 100 },
});
