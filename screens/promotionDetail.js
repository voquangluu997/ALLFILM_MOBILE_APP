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
import Promotion from "../shared/promotion";
import { promotionApi } from "../api";

const PromotionDetail = ({ navigation }) => {
  let [promotion, setPromotion] = useState([]);
  const [selectedPromotion, setSelectedPromotion] = useState(null);

  useEffect(() => {
    const getPromo = async () => {
      try {
        const res = await promotionApi.getAll();
        setPromotion(res);
        console.log("okeeee", res);
      } catch (error) {
        console.log(error);
      }
    };
    getPromo();
    let selectedPromotion = navigation.getParam("selectedPromotion");
    // fetchPromotionsJSON(selectedPromotion.id).then((promotion) => {
    setSelectedPromotion(selectedPromotion);
    // });
  }, []);

  function renderHeaderSection() {
    return (
      <ImageBackground
        source={{ uri: selectedPromotion?.image }}
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
                  textAlign: "center",
                }}
              >
                {selectedPromotion?.name}
              </Text>
            </LinearGradient>
          </View>
        </View>
      </ImageBackground>
    );
  }

  function renderDetails() {
    return (
      <View style={{ marginTop: SIZES.padding }}>
        <TitleBar title=" Promotion Content" />
        <View style={{ marginVertical: SIZES.padding }}>
          <View style={styles.contentContainer}>
            <Text style={styles.contentText}>
              {selectedPromotion?.content}{" "}
            </Text>
          </View>
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
      {/* Mromotion detail */}
      {renderDetails()}
      <View>
        <Promotion data={promotion} navigation={navigation}></Promotion>
      </View>
    </ScrollView>
  );
};

export default PromotionDetail;

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
