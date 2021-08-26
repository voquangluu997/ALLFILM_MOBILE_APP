import { Text, View, TouchableOpacity } from "react-native";
import React from "react";
export default function DayCard({
  date,
  day,
  styleTop,
  styleBottom,
  styleOutside,
  textTop,
  textBottom,
  onPress,
}) {
  return (
    <TouchableOpacity style={styleOutside} onPress={onPress}>
      <View style={styleTop}>
        <Text style={textTop}>{date}</Text>
      </View>
      <View style={styleBottom}>
        <Text style={textBottom}>{day}</Text>
      </View>
    </TouchableOpacity>
  );
}
