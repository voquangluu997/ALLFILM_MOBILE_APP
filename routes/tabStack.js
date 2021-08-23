import HomeScreen from "../routes/homeStack";
import Login from "../routes/authStack";
import Profile from "../screens/profile";
import Promotion from "../screens/promotions";
import React from "react";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { createAppContainer } from "react-navigation";
import { COLORS } from "../constants";
import TabIcon from "../components/TabIcon";

const tabNavigator = createBottomTabNavigator(
  {
    Home: { screen: HomeScreen },
    Promotion: { screen: Promotion },
    Login: { screen: Login },
    Profile: { screen: Profile },
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, horizontal, tintColor }) => {
        const { routeName } = navigation.state;
        let iconName;
        if (routeName === "Home") {
          iconName = "home";
        }
        if (routeName === "Profile") {
          iconName = "person-outline";
        }
        if (routeName === "Promotion") {
          iconName = "card-giftcard";
        }
        if (routeName === "Login") {
          iconName = "star";
        }
        // if (routeName === "Register") {
        //   iconName = "star";
        // }

        return <TabIcon icon={iconName} focused={focused} />;
      },
    }),
    tabBarOptions: {
      activeTintColor: COLORS.primary,
      activeColor: COLORS.primary,
      showLabel: false,

      style: {
        backgroundColor: "#000",
      },
    },
  }
);
export default createAppContainer(tabNavigator);
