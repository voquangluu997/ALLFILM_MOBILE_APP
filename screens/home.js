import React from "react";
import { MaterialIcons } from "@expo/vector-icons";
import {
  Text,
  View,
  SafeAreaView,
  FlatList,
  TouchableWithoutFeedback,
  Image,
  ImageBackground,
  ScrollView,
  Animated,
  TouchableOpacity,
  StyleSheet,
  SliderComponent,
} from "react-native";

import { COLORS, SIZES, FONTS, images } from "../constants";
import { BookButton } from "../shared/button";
import { newSeason, commingSoon } from "../constants/dummy";
const Home = ({ navigation }) => {
  const newSeasonScrollX = React.useRef(new Animated.Value(0)).current;

  function renderHeader() {
    return (
      <View
        style={{
          paddingTop: 30,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          paddingHorizontal: SIZES.padding,
        }}
      >
        <TouchableOpacity
          style={styles.formatIcon}
          onPress={() => console.log("Profile")}
        >
          {/* <Image
            source={images.profile_photo}
            style={{ width: 40, height: 40, borderRadius: 20 }}
          /> */}
          <MaterialIcons name="settings" color={COLORS.primary} size={40} />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.formatIcon}
          onPress={() => console.log("Code")}
        >
          <MaterialIcons name="code" color={COLORS.lightGray} size={40} />
        </TouchableOpacity>
      </View>
    );
  }
  function renderNewSeasonSection() {
    return (
      <View
        style={{
          width: SIZES.width,
          // backgroundColor: "red",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 40,
        }}
      >
        <Animated.FlatList
          horizontal
          pagingEnabled
          snapToAlignment="center"
          snapToInterval={SIZES.width}
          showsHorizontalScrollIndicator={false}
          scrollEventThrottle={10000}
          decelerationRate={0}
          contentContainerStyle={{ marginTop: SIZES.radius }}
          data={newSeason}
          keyExtractor={(item) => `${item.name}`}
          renderItem={({ item, index }) => {
            let titleFilmShow =
              item.name.length < 13
                ? item.name
                : item.name.slice(0, 13).trim() + "...";
            return (
              <TouchableWithoutFeedback
                onPress={
                  () => {
                    navigation.navigate("MovieDetail", { selectedMovie: item });
                  }
                  // navigation.navigate("MovieDetail", { selectedMovie: item })
                }
              >
                <View
                  style={{
                    width: SIZES.width,
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: 40,
                    // backgroundColor: "#f3f",
                  }}
                >
                  <ImageBackground
                    source={{ uri: item.img }}
                    resizeMode="cover"
                    style={{
                      width: SIZES.width * 0.85,
                      height: SIZES.width * 1.1,
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                    imageStyle={{ borderRadius: 40 }}
                  >
                    <View
                      style={{
                        borderRadius: 10,
                        height: 60,
                        flexDirection: "row",
                        justifyContent: "space-around",
                        alignItems: "center",
                        marginBottom: 50,
                        opacity: 0.5,
                      }}
                    >
                      <MaterialIcons
                        name="swipe"
                        size={60}
                        color={COLORS.lightGray}
                      />
                    </View>
                  </ImageBackground>

                  <View
                    style={{
                      width: SIZES.width * 0.85,
                      height: 60,
                      flexDirection: "row",
                      justifyContent: "space-around",
                      // backgroundColor: "#2c2",
                      alignItems: "center",
                    }}
                  >
                    <View
                      style={{
                        flexDirection: "column",
                        justifyContent: "center",
                        // backgroundColor: "#000",
                      }}
                    >
                      <Text
                        style={{
                          fontWeight: "bold",
                          color: "#fff",
                          fontSize: 24,
                        }}
                      >
                        {titleFilmShow}
                      </Text>

                      <Text
                        style={{
                          color: "#fff",
                        }}
                      >
                        {item.time}, {item.date}
                      </Text>
                    </View>

                    <BookButton text="Book now" />
                  </View>
                </View>
              </TouchableWithoutFeedback>
            );
          }}
          onScroll={Animated.event(
            [
              {
                nativeEvent: {
                  contentOffset: {
                    x: newSeasonScrollX,
                  },
                },
              },
            ],
            { useNativeDriver: false }
          )}
        />
      </View>
    );
  }
  function renderDots() {
    const dotPositon = Animated.divide(newSeasonScrollX, SIZES.width);
    return (
      <View
        style={{
          marginTop: 10,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {newSeason.map((item, index) => {
          const opacity = dotPositon.interpolate({
            inputRange: [index - 1, index, index + 1],
            outputRange: [0.3, 1, 0.3],
            extrapolate: "clamp",
          });

          const dotWidth = dotPositon.interpolate({
            inputRange: [index - 1, index, index + 1],
            outputRange: [6, 20, 6],
            extrapolate: "clamp",
          });

          const dotColor = dotPositon.interpolate({
            inputRange: [index - 1, index, index + 1],
            outputRange: [COLORS.lightGray, COLORS.primary, COLORS.lightGray],
            extrapolate: "clamp",
          });
          return (
            <Animated.View
              key={`dot-${index}`}
              opacity={opacity}
              style={{
                borderRadius: SIZES.radius,
                marginHorizontal: 3,
                width: dotWidth,
                height: 6,
                backgroundColor: dotColor,
              }}
            ></Animated.View>
          );
        })}
      </View>
    );
  }

  function renderCommingSoon() {
    return (
      <View style={{ marginTop: SIZES.padding }}>
        {/* Header */}
        <View
          style={{
            flexDirection: "row",
            paddingHorizontal: SIZES.padding,
            alignItems: "center",
            justifyContent: "flex-start",
          }}
        >
          <Text
            style={{
              flex: 1,
              color: "#fff",
              fontWeight: "bold",
              fontSize: 20,
            }}
          >
            Comming Soon
          </Text>
          <MaterialIcons
            name="keyboard-arrow-right"
            color={COLORS.primary}
            size={24}
          />
        </View>

        {/* List */}

        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ marginTop: SIZES.padding }}
          data={commingSoon}
          keyExtractor={(item) => `${item.name}`}
          renderItem={({ item, index }) => {
            let titleFilmShow =
              item.name.length < 16
                ? item.name
                : item.name.slice(0, 16).trim() + "...";

            return (
              <TouchableWithoutFeedback
                onPress={() => {
                  navigation.navigate("MovieDetail", { selectedMovie: item });
                }}
              >
                <View
                  style={{
                    marginLeft: index == 0 ? SIZES.padding : 20,
                    marginRight:
                      index == commingSoon.length - 1 ? SIZES.padding : 0,
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

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#000" }}>
      {renderHeader()}
      <ScrollView
        contentContainerStyle={{
          paddingBottom: 100,
        }}
      >
        {renderNewSeasonSection()}
        {renderDots()}
        {renderCommingSoon()}
      </ScrollView>
    </SafeAreaView>
  );
};
export default Home;

const styles = StyleSheet.create({
  formatIcon: {
    alignItems: "center",
    justifyContent: "center",
    width: 50,
    height: 50,
  },
});
