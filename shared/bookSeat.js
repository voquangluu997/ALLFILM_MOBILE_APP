import { SeatButton, SeatChoosed, SeatTitle } from "./button";
import React, { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  ImageBackground,
  ScrollView,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { Dimensions } from "react-native";
import { set } from "react-native-reanimated";

export default function BookSeat({ bookedSeats, onSubmit }) {
  const [isChoosing, setIsChoosing] = useState(false);

  const getTitle = (n) => {
    switch (n) {
      case 0:
        return "A";
        break;
      case 1:
        return "B";
        break;
      case 2:
        return "C";
        break;
      case 3:
        return "D";
        break;
      case 4:
        return "E";
        break;
      case 5:
        return "F";
        break;
      case 6:
        return "G";
        break;
      case 7:
        return "H";
        break;
      case 8:
        return "I";
        break;
      case 9:
        return "J";
        break;
    }
  };

  const handleSubmit = (i) => {
    setIsChoosing(i);
    onSubmit({ isChoosing: `${getTitle(Math.floor(i / 12))}-${i % 12}` });
  };
  const list = () => {
    const seats = bookedSeats?.split(",");

    const arrEmpty = [];
    for (let i = 0; i < 120; i++) arrEmpty.push(i % 12);
    let seatMap = arrEmpty?.map((e, i) => {
      if (seats)
        if (seats.includes(`${getTitle(Math.floor(i / 12))}-${i % 12}`))
          return <SeatChoosed text={e}></SeatChoosed>;
        else
          return (
            <SeatButton
              text={e}
              onPress={() => {
                handleSubmit(i);
              }}
              isChoosing={i == isChoosing}
            ></SeatButton>
          );
    });
    let rs = [];
    let line = [];
    for (let i = 0; i < 10; i++) {
      for (let j = 0; j <= 11; j++) {
        if (seatMap) {
          line.push(seatMap[i * 12 + j]);
        }
      }
      rs.push(line);
      line = [];
    }

    return rs?.map((e, i) => {
      return (
        <View style={{ flexDirection: "row", marginVertical: 5 }}>
          <SeatTitle text={getTitle(i % 12)}></SeatTitle>
          <View style={{ flexDirection: "row" }}>{e}</View>
        </View>
      );
    });
  };
  return <View>{list()}</View>;
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
