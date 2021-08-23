import React, { useState, useEffect } from "react";
import {
  BookButton,
  FlatButton,
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
    let today = new Date();
    chooseDay = date(today);
    showChooseDay = getDay(today.getDay()) + ", " + date(today);
    setChooseDay(chooseDay);
    setShowChooseDay(showChooseDay);
    setSelectedMovie(navigation.getParam("selectedMovie"));
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
    setArrDay(arrDay);
  }, []);

  let handleBookSeat = () => {
    console.log("book seatt");
  };
  function renderModal() {
    return (
      <Modal
        visible={openModal}
        animationType="slide"
        style={styles.modalContainer}
      >
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss}>
          <View style={styles.modalContent}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <MaterialIcons
                name="chevron-left"
                size={24}
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

            <View style={{ marginTop: 50 }}>
              <BookSeat bookedSeats={seatSession.bookedSeats} />
            </View>

            <View
              style={{
                flexDirection: "column",
                flex: 1,
                alignItems: "center",
                marginTop: 40,
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
                    }}
                  >
                    Price: {seatSession?.price}Đ{" "}
                  </Text>
                </View>
              </View>

              <View style={styles.bookingModalRight}>
                <FlatButton text="Book now" onPress={handleBookSeat} />
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
          name: "chevron-left",
          onPress: () => {
            navigation.goBack();
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
    borderWidth: 1,
    borderColor: "#f2f2f2",
    padding: 10,
    borderRadius: 10,
    alignSelf: "center",
    backgroundColor: "#efe",
  },
  modalClose: {
    // marginTop: 20,
    marginTop: 5,
    marginBottom: 0,
  },
  modalContent: {
    flex: 1,
  },
  bookingModal: {
    width: SIZES.width,
    position: "absolute",
    bottom: 0,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: SIZES.padding,
    paddingVertical: SIZES.base,
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
