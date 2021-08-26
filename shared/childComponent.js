import React from "react";
import {
  Text,
  View,
  FlatList,
  TouchableWithoutFeedback,
  Image,
} from "react-native";
import { COLORS, SIZES } from "../constants";
import TitleBar from "./titleBar";
export default function ChildComponent({ navigation, data }) {
  return (
    <View style={{ marginTop: SIZES.padding2 }}>
      {/* Header */}
      <TitleBar title="Coming soon" />
      {/* List */}

      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ marginTop: SIZES.padding }}
        data={data}
        keyExtractor={(item) => `${item.name}`}
        renderItem={({ item, index }) => {
          let titleFilmShow =
            item.name.length < 19
              ? item.name
              : item.name.slice(0, 18).trim() + "..";

          return (
            <TouchableWithoutFeedback
              onPress={() => {
                navigation.navigate("ComingSoonDetail", { selectedMovie: item });
              }}
            >
              <View
                style={{
                  marginLeft: index == 0 ? SIZES.padding : 20,
                  marginRight: index == data.length - 1 ? SIZES.padding : 0,
                }}
              >
                {/* poster */}
                <Image
                  source={{ uri: item.img }}
                  resizeMode="cover"
                  style={{
                    borderRadius: 20,
                    width: SIZES.width / 3,
                    height: SIZES.width / 3 + 60,
                  }}
                ></Image>
                {/* name */}
                <Text style={{ marginTop: SIZES.base, color: "#fff" }}>
                  {titleFilmShow}
                </Text>
                {/* progessBar */}
              </View>
            </TouchableWithoutFeedback>
          );
        }}
      ></FlatList>
    </View>
  );
}
