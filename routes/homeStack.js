// import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import Home from "../screens/home";

const screens = {
  Home: {
    screen: Home,
    navigationOptions: ({ navigation }) => {
      return {
        headerTitle: () => (
          // <Header namePage="Review Details" navigation={navigation} />
          <Text>Home</Text>
        ),
        headerTitleAlign: "center",
      };
    },
  },
};
constHomeStack = createStackNavigator(screens, {
  defaultNavigationOptions: {
    headerStyle: { backgroundColor: "#efe" },
  },
});

export default HomeStack;
// export default createAppContainer(HomeStack);
