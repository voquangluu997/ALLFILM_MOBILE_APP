import React, { useState, useEffect } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import {
  Text,
  View,
  SafeAreaView,
  TouchableWithoutFeedback,
  ImageBackground,
  ScrollView,
  Animated,
  StyleSheet,
} from "react-native";
import renderHeaderBar from "../shared/headerBar";
import { COLORS, SIZES, api_url } from "../constants";
import { BookButton } from "../shared/button";
import { newSeason, comingSoon } from "../constants/dummy";
import ChildComponent from "../shared/childComponent";
import Promotion from "../shared/promotion";
import { promotionApi } from "../api";
import Email from "../shared/email";
import TitleBar from "../shared/titleBar";
import { getUser } from "../utils/common";

const Home = ({ navigation }) => {
  let [promotion, setPromotion] = useState([]);
  let [newSeasonB, setNewSeasonB] = useState([]);
  let [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    getUser().then((u) => {
      if (u) setIsLogin(true);
    });

    const getPromo = async () => {
      try {
        const res = await promotionApi.getAll();
        setPromotion(res);
        console.log("Eeee", res);
      } catch (error) {
        console.log(error);
      }
    };
    getPromo();
  }, []);

  async function fetchMoviesJSON() {
    const response = await fetch(api_url + "/film?limit=10");
    const movies = await response.json();
    return movies;
  }

  fetchMoviesJSON().then((movies) => {
    setNewSeasonB(movies);
  });

  const newSeasonScrollX = React.useRef(new Animated.Value(0)).current;
  function renderNewSeasonSection() {
    return (
      <View
        style={{
          width: SIZES.width,
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
          data={newSeasonB}
          keyExtractor={(item) => `${item.title}`}
          renderItem={({ item, index }) => {
            function onPressBooking() {
              navigation.navigate("Booking", { selectedMovie: item });
            }

            let titleFilmShow =
              item.title.length < 16
                ? item.title.toLowerCase()
                : item.title.slice(0, 14).trim().toLowerCase() + "..";
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
                  }}
                >
                  <ImageBackground
                    source={{ uri: item.image }}
                    resizeMode="cover"
                    style={{
                      borderRadius: 40,
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
                      ></Text>
                    </View>

                    <BookButton text="Book now" onPress={onPressBooking} />
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
        {newSeasonB.map((item, index) => {
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
    return <ChildComponent data={comingSoon} navigation={navigation} />;
  }

  function renderPromotion() {
    return <Promotion data={promotion} navigation={navigation}></Promotion>;
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#000" }}>
      {renderHeaderBar(
        {
          name: "code",
          onPress: () => {},
        },
        {
          name: "settings",
          onPress: () => {
            if (isLogin) navigation.navigate("Profile");
            else navigation.navigate("Login");
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
        {renderPromotion()}
        <View style={{ marginTop: 20 }}>
          <TitleBar title="Promotion News"></TitleBar>
          <Email> </Email>
        </View>

        {renderComingSoon()}
      </ScrollView>
    </SafeAreaView>
  );
};
export default Home;

const styles = StyleSheet.create({});
