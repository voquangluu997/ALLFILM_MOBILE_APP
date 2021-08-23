import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  ImageBackground,
  ScrollView,
} from "react-native";
import { WebView } from "react-native-webview";
import { COLORS, SIZES, api_url } from "../constants";
import renderHeaderBar from "../shared/headerBar";
import { LinearGradient } from "expo-linear-gradient";
import { BookButton } from "../shared/button";
import { MaterialIcons } from "@expo/vector-icons";
import TitleBar from "../shared/titleBar";

const MovieDetail = ({ navigation }) => {
  const [selectedMovie, setSelectedMovie] = useState(null);
  async function fetchMoviesJSON(id) {
    const response = await fetch(api_url + "/film/" + id);
    const movies = await response.json();
    return movies;
  }
  useEffect(() => {
    let selectedMovie = navigation.getParam("selectedMovie");
    fetchMoviesJSON(selectedMovie.id).then((movie) => {
      setSelectedMovie(movie);
    });
  }, []);

  function renderHeaderSection() {
    return (
      <ImageBackground
        source={{ uri: selectedMovie?.poster }}
        resizeMode="cover"
        style={{
          width: "100%",
          height: SIZES.height < 700 ? SIZES.height * 0.6 : SIZES.height * 0.7,
        }}
      >
        <View style={{ flex: 1 }}>
          {renderHeaderBar(
            {
              name: "chevron-left",
              onPress: () => {
                navigation.goBack();
              },
            },
            {
              name: "menu",
              onPress: () => {
                navigation.openDrawer();
              },
            }
          )}
          <View style={{ flex: 1, justifyContent: "flex-end" }}>
            <LinearGradient
              start={{ x: 0, y: 0 }}
              end={{ x: 0, y: 1 }}
              colors={["transparent", "#000"]}
              style={{
                width: SIZES.width,
                height: 150,
                justifyContent: "flex-end",
                alignItems: "center",
              }}
            >
              {/* title */}
              <Text
                style={{
                  marginTop: SIZES.base,
                  color: "#fff",
                  fontWeight: "bold",
                  fontSize: 24,
                }}
              >
                {selectedMovie?.name}
              </Text>
            </LinearGradient>
          </View>
        </View>
      </ImageBackground>
    );
  }
  function renderRatings() {
    return (
      <View
        style={{
          flexDirection: "row",
          marginTop: SIZES.base,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text
          style={[
            styles.categoryContainer,
            styles.categoryText,
            { marginLeft: 0 },
          ]}
        >
          Date: {selectedMovie?.publishDate}
        </Text>
        <View style={styles.categoryContainer}>
          <MaterialIcons name="star" color="yellow" size={16} />
          <Text style={[styles.categoryText, { marginLeft: 3 }]}>
            {selectedMovie?.rating}
          </Text>
        </View>

        <View style={{ marginLeft: SIZES.base }}>
          <BookButton
            text="Book now"
            onPress={() => {
              navigation.navigate("Booking", { selectedMovie: selectedMovie });
            }}
          />
        </View>
      </View>
    );
  }
  function renderDetails() {
    return (
      <View style={{ marginTop: SIZES.padding }}>
        <TitleBar title=" Movie Details" />
        <View style={{ marginVertical: SIZES.padding }}>
          <View style={styles.contentContainer}>
            <Text style={styles.contentText}>
              {selectedMovie?.description}{" "}
            </Text>
          </View>

          <View style={styles.detailContainer}>
            <Text
              style={[
                styles.detailText,
                { fontWeight: "bold", color: "yellow" },
              ]}
            >
              Type
            </Text>
            <Text style={styles.detailText}>
              :
              {selectedMovie?.FilmTypes.reduce((acc, curr) => {
                return acc == " " ? acc + curr.name : acc + ", " + curr.name;
              }, " ")}
            </Text>
          </View>

          <View style={styles.detailContainer}>
            <Text
              style={[
                styles.detailText,
                { fontWeight: "bold", color: "yellow" },
              ]}
            >
              Time
            </Text>
            <Text style={styles.detailText}>
              : {selectedMovie?.duration} minutes{" "}
            </Text>
          </View>

          <View style={styles.detailContainer}>
            <Text
              style={[
                styles.detailText,
                { fontWeight: "bold", color: "yellow" },
              ]}
            >
              Actor
            </Text>
            <Text style={styles.detailText}>
              :
              {selectedMovie?.Actors.reduce((acc, curr) => {
                return acc == " " ? acc + curr.name : acc + ", " + curr.name;
              }, " ")}
            </Text>
          </View>
          <View style={styles.detailContainer}>
            <Text
              style={[
                styles.detailText,
                { fontWeight: "bold", color: "yellow" },
              ]}
            >
              Director
            </Text>
            <Text style={styles.detailText}>
              : {selectedMovie?.Director.name}
            </Text>
          </View>

          <View style={styles.detailContainer}>
            <Text
              style={[
                styles.detailText,
                { fontWeight: "bold", color: "yellow" },
              ]}
            >
              Country
            </Text>
            <Text style={styles.detailText}>: {selectedMovie?.nation} </Text>
          </View>

          <View style={styles.detailContainer}>
            <Text
              style={[
                styles.detailText,
                { fontWeight: "bold", color: "yellow" },
              ]}
            >
              Date{" "}
            </Text>
            <Text style={styles.detailText}>
              : {selectedMovie?.publishDate}{" "}
            </Text>
          </View>
        </View>
      </View>
    );
  }

  function renderTrailer() {
    return (
      <View style={styles.trailerContainer}>
        <TitleBar title="Trailer" />
        <View style={styles.videoContainer}>
          <WebView
            javaScriptEnabled={true}
            domStorageEnabled={true}
            source={{
              uri:
                "https://www.youtube.com/embed" +
                selectedMovie?.trailer.slice(
                  selectedMovie?.trailer.lastIndexOf("/")
                ),
            }}
          />
        </View>
      </View>
    );
  }

  return (
    <ScrollView
      contentContainerStyle={{ backgroundColor: "#000" }}
      style={{ backgroundColor: "#000" }}
    >
      {/* header */}

      {renderHeaderSection()}

      {/* rating and ### */}

      {renderRatings()}

      {renderTrailer()}

      {/* Movie detail */}

      {renderDetails()}
    </ScrollView>
  );
};

export default MovieDetail;

const styles = StyleSheet.create({
  categoryContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: SIZES.base,
    paddingHorizontal: SIZES.base,
    paddingVertical: 3,
    borderRadius: SIZES.base,
    backgroundColor: COLORS.gray1,
  },
  categoryText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  detailText: {
    color: "#fff",
  },
  detailContainer: {
    flexDirection: "row",
    width: SIZES.width,
    marginLeft: 20,
    marginVertical: 7,
  },
  contentContainer: {
    marginLeft: 20,
  },
  contentText: {
    fontSize: 14,
    color: "#fff",
  },
  trailerContainer: {
    width: SIZES.width,
    height: SIZES.width * 0.82,
    marginTop: SIZES.padding,
  },
  videoContainer: {
    width: "100%",
    height: SIZES.width * 0.82 - 27 - SIZES.padding,
    marginTop: SIZES.padding,
  },
});
