import React, { useState, useEffect } from "react";

import {
  BookButton,
  SeatButton,
  SeatChoosing,
  SeatChoosed,
} from "../shared/button";
import BookSeat from "../shared/bookSeat";
import {
  Text,
  View,
  FlatList,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Modal,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import renderHeaderBar from "../shared/headerBar";
import { COLORS, SIZES, api_url } from "../constants";
import DayCard from "../shared/dayCard";
import { globalStyles } from "../styles/global";
import TitleBar from "../shared/titleBar";
import { MaterialIcons } from "@expo/vector-icons";
import { food_drinkApi, bookingApi } from "../api";
import { getUser, getToken } from "../utils/common";
import axios from "axios";

export default function Booking({ navigation }) {
  let date = (today) => {
    return (
      today.getDate() +
      "/" +
      parseInt(today.getMonth() + 1) +
      "/" +
      today.getFullYear()
    );
  };

  var getDay = (day) => {
    switch (day) {
      case 0:
        return "Sun";
      case 1:
        return "Mon";
      case 2:
        return "Tue";
      case 3:
        return "Wes";
      case 4:
        return "Thu";
      case 5:
        return "Fri";
      default:
        return "Sat";
    }
  };

  const [selectedMovie, setSelectedMovie] = useState(null);
  let [arrDay, setArrDay] = useState([]);
  let [chooseDay, setChooseDay] = useState(null);
  let [chooseSession, setChooseSession] = useState({});
  let [showChooseDay, setShowChooseDay] = useState(null);
  let [showChooseCinema, setShowChooseCinema] = useState(null);
  let [openModal, setOpenModal] = useState(false);
  let [session, setSession] = useState([]);
  let [seatSession, setSeatSession] = useState({});
  let [choosingSeat, setChoosingSeat] = useState({});
  let [numSeat, setNumSeat] = useState(1);
  let [quatity, setQuatity] = useState([0, 0, 0, 0, 0]);
  let [food, setFood] = useState({});
  let [totalPrice, setTotalPrice] = useState(0);
  let [token, setToken] = useState(null);
  let [err, setErr] = useState(null);

  async function fetchSessionJSON() {
    const response = await fetch(
      `${api_url}/session?filmId=${selectedMovie.id}`
    );
    const session = await response.json();
    return session;
  }
  fetchSessionJSON().then((session) => {
    setSession(session);
  });

  async function fetchSeatSession(id) {
    const response = await fetch(`${api_url}/session/${id}`);
    const session = await response.json();
    return session;
  }

  useEffect(() => {
    getToken().then((t) => {
      setToken(t);
    });
    setTotalPrice(0);
    const getFood = async () => {
      try {
        const res = await food_drinkApi.get();
        setFood(res);
      } catch (error) {
        console.log(error);
      }
    };
    let today = new Date();
    chooseDay = date(today);
    showChooseDay = getDay(today.getDay()) + ", " + date(today);
    setChooseDay(chooseDay);
    setShowChooseDay(showChooseDay);
    let mv = navigation.getParam("selectedMovie");
    if (mv.name) mv.title = mv.name;
    setSelectedMovie(mv);
    arrDay = [];
    setArrDay(arrDay);
    arrDay.push({ day: "Today", date: today.getDate(), fullDate: date(today) });
    for (let i = 1; i < 14; i++) {
      let futureFullDate = new Date();
      futureFullDate.setDate(today.getDate() + i);
      let futureDate = futureFullDate.getDate();
      let futureDay = futureFullDate.getDay();
      arrDay.push({
        day: getDay(futureDay),
        date: futureDate,
        fullDate: date(futureFullDate),
      });
    }
    getFood();
    setArrDay(arrDay);
  }, []);

  let handleBookSeat = () => {
    let d = new Date();
    let bookingTime = `${d.getFullYear()}-${
      d.getMonth() + 1
    }-${d.getDate()} ${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`;

    let d2 = new Date(
      d.getFullYear(),
      d.getMonth() + 1,
      d.getDate(),
      d.getHours(),
      d.getMinutes() + 15,
      d.getSeconds()
    );

    let keepingTime = `${d2.getFullYear()}-${d2.getMonth()}-${d2.getDate()} ${d2.getHours()}:${d2.getMinutes()}:${d2.getSeconds()}`;

    console.log("book seatt");
    let foodDrinks = quatity
      ?.map((item, i) => {
        return { id: (i + 1).toString(), count: item.toString() };
      })
      .filter((e) => {
        return e.count > 0;
      });

    let paymentInfo = {
      fee: totalPrice + numSeat * seatSession?.price,
      sessionId: seatSession?.id,
      sessionRoomId: seatSession?.roomId,
      seats: choosingSeat.isChoosing,
      foodDrinks,
      bookingTime,
      keepingTime,
    };
    let getBooking = async () => {
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };
      // const res = await bookingApi.booking(paymentInfo);
      axios
        .post(`${api_url}/booking`, paymentInfo, config)
        .then((res) => {
          console.log("kkkkkkkk", res.data);
          navigation.navigate("Payment", { paymentInfo: res.data });
        })
        .catch((error) => {
          if (error.response.status == 401)
            alert(" vui lòng đăng nhập để đặt vé");
          else alert("Chỗ đã được đặt, vui lòng kiểm tra lại");

          console.log(error.response.status);
        });
    };

    if (choosingSeat.length != numSeat) alert("Bạn chưa chọn đủ số lượng vé ");
    else getBooking();
  };
  function renderModal() {
    return (
      <Modal
        visible={openModal}
        animationType="slide"
        style={{ ...styles.modalContainer, position: "relative" }}
      >
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss}>
          <View style={styles.modalContent}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginTop: 5,
              }}
            >
              <MaterialIcons
                name="chevron-left"
                size={44}
                onPress={() => setOpenModal(false)}
                style={{
                  ...styles.modalToggle,
                  ...styles.modalClose,
                  marginHorizontal: 10,
                }}
              />
              <View>
                <Text style={styles.sessionDefaultText}>
                  {session[0]?.name} Cinema
                </Text>
                <Text style={styles.sessionDefaultText}>
                  {chooseSession?.session?.startTime}
                </Text>
              </View>
            </View>

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                borderBottomColor: "#000",
                borderBottomWidth: 0.5,
                paddingBottom: 5,
              }}
            >
              <Text style={{ fontSize: 22 }}>{` Tickets: ${numSeat} `}</Text>

              <SeatButton
                text="-"
                onPress={() => {
                  setNumSeat(numSeat > 1 ? numSeat - 1 : 1);
                }}
              ></SeatButton>
              <SeatButton
                text="+"
                onPress={() => {
                  setNumSeat(numSeat + 1);
                }}
              ></SeatButton>
            </View>

            <ScrollView>
              <View style={{ marginTop: 30 }}>
                <BookSeat
                  bookedSeats={seatSession.bookedSeats}
                  onSubmit={(seat) => {
                    setChoosingSeat(seat);
                  }}
                  numTicket={numSeat}
                />
              </View>

              {err ? (
                <View backgroundColor="#000">
                  {" "}
                  <Text>err</Text>
                </View>
              ) : (
                <View pointerEvents="none"></View>
              )}

              <View
                style={{
                  flexDirection: "column",
                  flex: 1,
                  alignItems: "center",
                  marginTop: 30,
                }}
              >
                <Text
                  style={{
                    fontSize: SIZES.h2,
                    fontWeight: "bold",
                    textTransform: "uppercase",
                  }}
                >
                  Screen
                </Text>

                <Text
                  style={{
                    marginTop: 5,
                    borderTopWidth: 2,
                    borderTopColor: "#000",
                    color: "transparent",
                  }}
                >
                  alooodddddddddddddddddddd
                </Text>

                <View
                  style={{
                    flexDirection: "column",
                    flex: 1,
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      marginBottom: 10,
                    }}
                  >
                    <SeatChoosing> </SeatChoosing>
                    <Text> Ghế đang chọn</Text>
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      marginBottom: 10,
                    }}
                  >
                    <SeatChoosed> </SeatChoosed>
                    <Text> Ghế đã bán</Text>
                  </View>
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <SeatButton> </SeatButton>
                    <Text> Ghế có thể đặt</Text>
                  </View>
                </View>
              </View>

              {/* <View> */}
              <View
                style={{
                  flexDirection: "column",
                  justifyContent: "center",
                  paddingBottom: 5,
                  marginTop: 15,
                }}
              >
                <Text
                  style={{
                    fontSize: 18,
                    fontWeight: "700",
                    paddingLeft: 10,
                    borderBottomColor: "#000",
                    borderBottomWidth: 0.5,
                  }}
                >
                  {" "}
                  FOOD/DRINK
                </Text>
                <View
                  style={{
                    flexDirection: "row",
                    marginTop: 10,
                    backgroundColor: "#000",
                    padding: 3,
                  }}
                >
                  <View style={{ paddingLeft: 5, width: 100 }}>
                    <Text style={{ fontWeight: "bold", color: "#fff" }}>
                      Combo
                    </Text>
                  </View>
                  <View style={{ width: 100 }}>
                    <Text style={{ fontWeight: "bold", color: "#fff" }}>
                      Quatity
                    </Text>
                  </View>
                  <View style={{ width: 100 }}>
                    <Text style={{ fontWeight: "bold", color: "#fff" }}>
                      Price(VND)
                    </Text>
                  </View>
                  <View style={{ width: 100 }}>
                    <Text style={{ fontWeight: "bold", color: "#fff" }}>
                      Total(VND)
                    </Text>
                  </View>
                </View>
              </View>
              <FlatList
                data={food}
                renderItem={({ item, index }) => {
                  return (
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                      }}
                    >
                      <View
                        style={{
                          paddingLeft: 5,
                          width: 100,
                          marginVertical: 4,
                        }}
                      >
                        <Text> {item?.name}</Text>
                      </View>

                      <View
                        style={{
                          flexDirection: "row",
                          width: 100,
                          marginVertical: 4,
                        }}
                      >
                        <View style={{ width: 20 }}>
                          <Text> {`${quatity[index]} `}</Text>
                        </View>

                        <SeatButton
                          text="-"
                          onPress={() => {
                            let q = quatity;

                            setTotalPrice(
                              q[index] > 0
                                ? totalPrice - item?.price
                                : totalPrice
                            );
                            q[index] = q[index] > 0 ? q[index] - 1 : 0;

                            setQuatity(q);
                          }}
                        ></SeatButton>
                        <SeatButton
                          text="+"
                          onPress={() => {
                            let q = quatity;
                            q[index] = quatity[index] + 1;

                            setQuatity(q);
                            setTotalPrice(totalPrice + item?.price);
                          }}
                        ></SeatButton>
                      </View>

                      <View style={{ width: 100, marginVertical: 4 }}>
                        <Text> {item?.price}</Text>
                      </View>
                      <View style={{ width: 100, marginVertical: 4 }}>
                        <Text> {quatity[index] * item?.price}</Text>
                      </View>
                    </View>
                  );
                }}
              />

              <View
                style={{
                  flexDirection: "row",
                  marginTop: 10,
                  backgroundColor: "#000",
                  justifyContent: "center",
                }}
              >
                <Text style={{ fontWeight: "bold", color: "#fff" }}>{`Total: ${
                  totalPrice + numSeat * seatSession?.price
                }VND`}</Text>
              </View>

              {/* </View> */}
            </ScrollView>

            <View style={styles.bookingModal}>
              <View style={styles.bookingModalLeft}>
                <View>
                  <Text
                    style={{
                      fontSize: SIZES.h3,
                      fontWeight: "bold",
                      textTransform: "uppercase",
                      color: "#f01d71",
                    }}
                  >
                    {selectedMovie?.title.length > 25
                      ? `${selectedMovie?.title.slice(0, 23)}..`
                      : selectedMovie?.title}
                  </Text>
                </View>
                <View style={{ flexDirection: "row" }}>
                  <Text
                    style={{
                      fontSize: SIZES.h4,
                      fontWeight: "bold",
                      color: "#fff",
                    }}
                  >
                    {seatSession.Room
                      ? `Room : ${seatSession?.Room.name}, `
                      : "b"}
                  </Text>
                  <Text
                    style={{
                      fontSize: SIZES.h4,
                      fontWeight: "bold",
                      color: "#fff",
                    }}
                  >
                    {`Price: ${seatSession?.price}Đ x ${numSeat}`}
                  </Text>
                </View>
              </View>

              <View style={styles.bookingModalRight}>
                <BookButton text="Book now" onPress={handleBookSeat} />
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    );
  }

  function renderDateTime() {
    return (
      <View
        style={{
          borderBottomColor: "#fff",
          borderBottomWidth: 0.2,
          flexDirection: "column",
        }}
      >
        {/* show choose day */}
        <View style={{ paddingVertical: SIZES.base }}>
          <Text
            style={{
              textAlign: "center",
              color: "#fff",
              fontWeight: "bold",
              fontSize: SIZES.body2,
            }}
          >
            {showChooseDay}
          </Text>
        </View>
        {/* choose date time */}
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={true}
          data={arrDay}
          renderItem={({ item }) => {
            let itemDate = item.date > 9 ? item.date : "0" + item.date;
            let styleOutside, styleTop, styleBottom, textTop, textBottom;
            if (item.fullDate == chooseDay) {
              styleOutside = styles.selectedOutside;
              styleTop = styles.selectedTop;
              styleBottom = styles.selectedBottom;
              textTop = styles.textTopSelected;
              textBottom = styles.textBottomSelected;
            } else {
              styleOutside = styles.defaultOutside;
              styleTop = styles.defaultTop;
              styleBottom = styles.defaultBottom;
              textTop = styles.textTopDefault;
              textBottom = styles.textBottomDefault;
            }

            return (
              <DayCard
                onPress={() => {
                  chooseDay = item.fullDate;
                  showChooseDay = item.day + ", " + chooseDay;
                  setChooseDay(chooseDay);
                  setShowChooseDay(showChooseDay);
                }}
                date={itemDate}
                day={item.day}
                styleOutside={styleOutside}
                styleTop={styleTop}
                styleBottom={styleBottom}
                textTop={[globalStyles.h3, textTop]}
                textBottom={textBottom}
              />
            );
          }}
        />
        {/* choose session  */}

        <FlatList
          data={session}
          renderItem={({ item, index }) => {
            let cinemaIndex = index;
            return (
              <View
                style={{ flexDirection: "column", marginVertical: SIZES.base }}
              >
                <TitleBar title={item.name} />
                <FlatList
                  data={item.Sessions}
                  horizontal
                  style={{ marginVertical: SIZES.base }}
                  showsHorizontalScrollIndicator={false}
                  renderItem={({ item, index }) => {
                    let backgroundSessionStyle = styles.defaultSession;
                    let textSessionStyle = styles.sessionDefaultText;
                    if (item == chooseSession.session) {
                      if (chooseSession.cinemaIndex == cinemaIndex) {
                        backgroundSessionStyle = styles.selectedSession;
                        textSessionStyle = styles.sessionSelectedText;
                      }
                    }

                    return (
                      <TouchableOpacity
                        onPress={async () => {
                          chooseSession = {
                            session: item,
                            cinemaIndex: cinemaIndex,
                          };
                          console.log("choose :", chooseSession);
                          setChooseSession(chooseSession);
                          fetchSeatSession(chooseSession.session.id).then(
                            (res) => {
                              console.log("res :", res);
                              setSeatSession(res);
                            }
                          );
                          setOpenModal(true);
                        }}
                        style={backgroundSessionStyle}
                      >
                        <Text style={textSessionStyle}>
                          {item.startTime.slice(
                            item.startTime.indexOf(" ") + 1
                          )}
                        </Text>
                      </TouchableOpacity>
                    );
                  }}
                />
              </View>
            );
          }}
        />
      </View>
    );
  }
  return (
    <ScrollView
      style={{
        backgroundColor: "#000",
      }}
      contentContainerStyle={{
        paddingBottom: 100,
      }}
    >
      {renderHeaderBar(
        {
          name: "chevron-left",
          onPress: () => {
            navigation.goBack();
          },
        },
        {
          name: "settings",
          onPress: () => {
            navigation.navigate("Profile");
          },
        }
      )}
      <View
        style={{
          width: SIZES.width - 30,
          marginLeft: 15,
        }}
      >
        <View style={{ borderBottomColor: "#fff", borderBottomWidth: 0.2 }}>
          <Text
            style={{
              color: "yellow",
              fontWeight: "bold",
              textTransform: "uppercase",
              textAlign: "center",
              fontSize: SIZES.body2,
              marginVertical: SIZES.padding,
            }}
          >
            {selectedMovie?.title}
          </Text>
        </View>

        {renderDateTime()}
        {/* <BookButton text=""> </BookButton> */}
        {renderModal()}
      </View>
    </ScrollView>
  );
}

let styles = StyleSheet.create({
  defaultOutside: {
    flexDirection: "column",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
    marginHorizontal: 5,
  },
  selectedOutside: {
    flexDirection: "column",
    borderColor: COLORS.pink,
    borderWidth: 1,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  defaultTop: {
    borderTopRightRadius: 5,
    borderTopLeftRadius: 5,
    padding: SIZES.radius,
    backgroundColor: "#ddd",
  },
  selectedTop: {
    backgroundColor: COLORS.pink,
    borderTopRightRadius: 5,
    borderTopLeftRadius: 5,
    padding: SIZES.radius,
  },
  defaultBottom: {
    backgroundColor: "transparent",
    borderBottomEndRadius: 5,
    borderBottomStartRadius: 5,
  },
  selectedBottom: {
    backgroundColor: "#fff",
    borderBottomEndRadius: 5,
    borderBottomStartRadius: 5,
  },
  textTopDefault: {
    color: "#000",
  },
  textTopSelected: {
    color: "#fff",
  },
  textBottomSelected: {
    textAlign: "center",
    color: COLORS.pink,
  },
  textBottomDefault: {
    color: "#fff",
    textAlign: "center",
  },
  selectedSession: {
    backgroundColor: COLORS.pink,
    borderRadius: 8,
    marginRight: SIZES.base,
    marginLeft: SIZES.padding,
    padding: 3,
  },
  defaultSession: {
    backgroundColor: "#ddd",
    borderRadius: 8,
    marginRight: SIZES.base,
    marginLeft: SIZES.padding,
    padding: 3,
  },
  sessionSelectedText: {
    color: "#fff",
    fontWeight: "bold",
  },
  sessionDefaultText: {
    color: "#000",
    fontWeight: "bold",
  },

  modalToggle: {
    padding: 5,
    alignSelf: "center",
  },
  modalClose: {
    marginTop: 5,
    marginBottom: 0,
  },
  modalContent: {
    flex: 1,
  },
  bookingModal: {
    width: SIZES.width,
    position: "relative",
    bottom: 0,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: SIZES.padding,
    paddingVertical: SIZES.base,
    backgroundColor: "#000",
  },
  bookingModalLeft: {
    flexDirection: "column",
  },
  modalContainer: {},
  modalHeader: {
    backgroundColor: "red",
    width: SIZES.width,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: SIZES.padding,
    paddingVertical: SIZES.base,
  },
  modalHeaderRight: {
    flexDirection: "column",
  },
});
