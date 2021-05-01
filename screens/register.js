import React from "react";
import { globalStyles } from "../styles/global";
import { Formik } from "formik";
import { FlatButton, TransParentButton } from "../shared/button";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import { Text, View, TextInput, StyleSheet, ScrollView } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

export default function Register({navigation}) {

  const pressHandler =()=>{
    navigation.navigate('Login');
  } 
  return (
    <View style={[globalStyles.container, globalStyles.centerContext]}>
      <KeyboardAwareScrollView>
        <Formik
          initialValues={{
            fullname: "",
            username: "",
            email: "",
            phone: "",
            password: "",
          }}
          onSubmit={(values, actions) => {
            //   actions.resetForm();
          }}
        >
          {(props) => (
            <View>
              <TextInput
                style={globalStyles.input}
                placeholder="Fullname"
                onChangeText={props.handleChange("fullname")}
                value={props.values.fullname}
                onBlur={props.handleBlur("fullname")}
              />
              <TextInput
                style={globalStyles.input}
                placeholder="Username"
                onChangeText={props.handleChange("username")}
                value={props.values.username}
                onBlur={props.handleBlur("username")}
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

              <TextInput
                style={globalStyles.input}
                secureTextEntry={true}
                placeholder="Password"
                onChangeText={props.handleChange("password")}
                value={props.values.password}
                onBlur={props.handleBlur("password")}
              />

              <FlatButton
                text="Register"
                onPress={props.handleSubmit}
              ></FlatButton>

              
              <Text style={styles.centerText}> Or</Text>
              <TransParentButton
                text="Login"
                onPress = {pressHandler}
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
  // registerButton: { backgroundColor: "#eee", marginTop: 100 },
});
