import Home from "../screens/home";
import React from "react";
import { COLORS } from "../components";
import { MaterialIcons } from "@expo/vector-icons";
import { TabIcon } from "../components";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { icons } from "../constants";

const Tab = createBottomTabNavigator();

const Tabs = () => {
  return (
    <Tab.Navigator
      tabBarOption={{
        showLable: false,
        style: {
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          elevation: 0,
          backgroundColor: "#000",
          borderTopColor: "transparent",
          height: 100,
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} icon={<MaterialIcons name="home" />} />
          ),
        }}
      />
      <Tab.Screen
        name="Play"
        component={Home}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} icon={<MaterialIcons name="play" />} />
          ),
        }}
      />
      <Tab.Screen
        name="Search"
        component={Home}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} icon={<MaterialIcons name="search" />} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Home}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon
              focused={focused}
              icon={<MaterialIcons name="profile" />}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default Tabs;
