import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  ImageBackground,
  ScrollView,
  SafeAreaView,
  Linking,
} from "react-native";
import { COLORS, SIZES, api_url } from "../constants";
import renderHeaderBar from "../shared/headerBar";
import { LinearGradient } from "expo-linear-gradient";
import { BookButton, DarkButton } from "../shared/button";
import { MaterialIcons } from "@expo/vector-icons";
import TitleBar from "../shared/titleBar";
import axios from "axios";
import { getToken } from "../utils/common";

import { bookingApi } from "../api";

export default function Payment({ navigation }) {
  let [paymentInfo, setPaymentInfo] = useState(null);
  let [showPayment, setShowPayment] = useState(false);
  let [token, setToken] = useState(null);

  useEffect(() => {
    getToken().then((t) => {
      setToken(t);
    });
    setShowPayment(false);
    let pay = navigation.getParam("paymentInfo");
    console.log("payy", pay);
    setPaymentInfo(pay);
  }, []);
  return (
    <SafeAreaView style={{ marginTop: SIZES.padding }}>
      <View style={{ marginVertical: SIZES.padding }}>
        <View
          style={{ backgroundColor: "#000", marginTop: 50, marginBottom: 40 }}
        >
          <Text
            style={{
              fontSize: 25,
              fontWeight: "bold",
              textAlign: "center",
              color: "#fff",
            }}
          >
            THANH TOÁN
          </Text>
        </View>
        <View style={{ ...styles.contentContainer, marginBottom: 20 }}>
          <Text
            style={{
              ...styles.contentText,
              fontSize: 20,
              textAlign: "center",
              color: "red",
              fontWeight: "bold",
              marginLeft: -20,
            }}
          >
            Thông tin đã được lưu, vui lòng thanh toán sau 15 phút{" "}
          </Text>
        </View>

        <View style={styles.detailContainer}>
          <View style={{ width: 150 }}>
            <Text style={[{ fontWeight: "bold", color: "#000" }]}>
              Thời gian đặt vé:
            </Text>
          </View>
          <Text style={styles.detailText}>{paymentInfo?.bookingTime}</Text>
        </View>

        <View style={styles.detailContainer}>
          <View style={{ width: 150 }}>
            <Text
              style={[styles.detailText, { fontWeight: "bold", color: "#000" }]}
            >
              Thời gian bắt đầu:
            </Text>
          </View>
          <Text style={styles.detailText}>
            {paymentInfo?.Session.startTime}
          </Text>
        </View>

        <View style={styles.detailContainer}>
          <View style={{ width: 150 }}>
            <Text
              style={[styles.detailText, { fontWeight: "bold", color: "#000" }]}
            >
              Tên rạp phim:
            </Text>
          </View>
          <Text style={styles.detailText}>
            {paymentInfo?.Session.Cinema.name}
          </Text>
        </View>

        <View style={styles.detailContainer}>
          <View style={{ width: 150 }}>
            <Text
              style={[styles.detailText, { fontWeight: "bold", color: "#000" }]}
            >
              Địa chỉ:{" "}
            </Text>
          </View>
          <Text style={styles.detailText}>
            {paymentInfo?.Session.Cinema.address}
          </Text>
        </View>

        <View style={styles.detailContainer}>
          <View style={{ width: 150 }}>
            <Text
              style={[styles.detailText, { fontWeight: "bold", color: "#000" }]}
            >
              Phòng chiếu:
            </Text>
          </View>
          <Text style={styles.detailText}>
            {paymentInfo?.Session.Room.name}
          </Text>
        </View>

        <View style={styles.detailContainer}>
          <View style={{ width: 150 }}>
            <Text
              style={[styles.detailText, { fontWeight: "bold", color: "#000" }]}
            >
              Tổng tiền:
            </Text>
          </View>
          <Text style={styles.detailText}> {paymentInfo?.fee} </Text>
        </View>

        <View style={styles.detailContainer}>
          <View style={{ width: 150 }}>
            <Text
              style={[styles.detailText, { fontWeight: "bold", color: "#000" }]}
            >
              Vị trí vé:
            </Text>
          </View>
          <Text style={styles.detailText}> {paymentInfo?.seats} </Text>
        </View>

        <View style={{}}>
          <View style={{ flexDirection: "row", justifyContent: "center" }}>
            <DarkButton
              text="thanh toan"
              onPress={() => {
                setShowPayment(true);
                const config = {
                  headers: { Authorization: `Bearer ${token}` },
                };

                axios
                  .post(
                    `${api_url}/booking/checkout/${paymentInfo.id}`,
                    paymentInfo.id,
                    config
                  )
                  .then((res) => {
                    console.log("kkkkkkkk ne", res.data.data);
                    Linking.openURL(res.data.data);
                  })
                  .catch((error) => {
                    alert("Đã quá thời gian giữ chỗ, vui lòng đặt vé lại ");

                    console.log(error);
                  });
              }}
            ></DarkButton>
          </View>
        </View>

        {/* {showPayment ? (
          <View>
            <Text> Chọn phương thức thanh toán </Text>
          </View>
        ) : (
          <View pointerEvents="none"></View>
        )} */}
      </View>
    </SafeAreaView>
  );
}

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
    color: "#000",
    fontSize: 16,
    fontWeight: "bold",
  },
  detailText: {
    color: "#000",
    fontSize: 16,
  },
  detailContainer: {
    flexDirection: "row",
    marginLeft: 20,
    marginVertical: 7,
  },
  contentContainer: {
    marginLeft: 20,
  },
  contentText: {
    fontSize: 14,
    color: "#000",
  },
  trailerContainer: {
    width: SIZES.width,
    height: SIZES.width * 0.82,
    marginTop: SIZES.padding,
  },
});
