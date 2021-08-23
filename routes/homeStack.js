import { StackActions, NavigationActions } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import Home from "../screens/home";
import MovieDetail from "../screens/movieDetail";
import Booking from "../screens/booking";
import React from "react";
import Header from "../shared/header";

const screens = {
  Home: {
    screen: Home,
    // navigationOptions: ({ navigation }) => {
    //   return {
    //     headerTitle: () => (
    //       // <Header namePage="ALLFILM" navigation={navigation} />
    //       <Header namePage="ALLFILM" navigation={navigation} />
    //     ),
    //     headerTitleAlign: "center",
    //   };
    // },
  },
  MovieDetail: {
    screen: MovieDetail,
  },
  Booking: {
    screen: Booking,
  },
  
};
const HomeStack = createStackNavigator(screens, {
  headerMode: "none",
});


export default HomeStack;
