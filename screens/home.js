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
import renderHeaderBar from "../shared/herderBar";
import { COLORS, SIZES } from "../constants";
import { BookButton } from "../shared/button";
import { newSeason, comingSoon } from "../constants/dummy";
import TitleBar from "../shared/titleBar";
import ComingSoonComponent from "../shared/comingSoonComponent";

const Home = ({ navigation }) => {
  const newSeasonScrollX = React.useRef(new Animated.Value(0)).current;
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
              item.name.length < 16
                ? item.name
                : item.name.slice(0, 14).trim() + "..";
            return (
              <TouchableWithoutFeedback
                onPress={() => {
                  navigation.navigate("MovieDetail", { selectedMovie: item });
                }}
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
                      borderRadius: 40,
                      width: SIZES.width * 0.85,
                      height: SIZES.width * 1.1,
                      justifyContent: "center",
                      alignItems: "center",
                      // backgroundColor : "#f3f"
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

  function renderComingSoon() {
    return <ComingSoonComponent data={comingSoon} navigation={navigation} />;
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#000" }}>
      {renderHeaderBar(
        {
          name: "code",
          onPress: () => {
            console.log("code");
          },
        },
        {
          name: "settings",
          onPress: () => {
            console.log("settings");
          },
        }
      )}
      <ScrollView
        contentContainerStyle={{
          paddingBottom: 100,
        }}
      >
        {renderNewSeasonSection()}
        {renderDots()}
        {renderComingSoon()}
      </ScrollView>
    </SafeAreaView>
  );
};
export default Home;

const styles = StyleSheet.create({});
