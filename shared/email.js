import React, { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  ImageBackground,
  TextInput,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { Dimensions } from "react-native";
import { BookButton, DarkButton } from "./button";
import { globalStyles } from "../styles/global";
import TitleBar from "./titleBar";
import { promotionApi } from "../api";

export default function Email({ navigation }) {
  let [text, setText] = useState("");

  return (
    <View
      style={{ marginTop: 20, flexDirection: "row", justifyContent: "center" }}
    >
      <View style={{ paddingHorizontal: 5 }}>
        <TextInput
          style={styles.input}
          placeholder="Enter email to get promotion news"
          onChangeText={(value) => {
            setText(value);
          }}
          value={text}
        />
      </View>

      <View>
        <BookButton
          text="Get now"
          onPress={() => {
            console.log("clocik");
            const getMail = async () => {
              try {
                const res = await promotionApi.getNews({ email: text });
                console.log("prooo: ", res);
                alert(
                  "Your mail already register, Check your mail now to get newest promotions"
                );
              } catch (err) {
                alert(
                  "Your mail already register, Check your mail now to get newest promotions"
                );
                console.log(err);
              }
            };

            getMail();
          }}
        ></BookButton>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    borderColor: "#eee",
    borderBottomWidth: 1,
    padding: 4,
    fontSize: 14,
    borderRadius: 6,
    backgroundColor: "#fff",
    paddingHorizontal: 14,
    marginRight: 5,
  },
});
