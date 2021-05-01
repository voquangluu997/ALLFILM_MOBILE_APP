// import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import Login from "../screens/login";
import Register from "../screens/register";

const screens = {
  Login: {
    screen: Login,
  },
  Register: {
    screen: Register,
  },
};
const AuthStack = createStackNavigator(
  screens,
  // {
  //   initialRouteName: "Login",
  //   headerMode: "none",
  // },
  // {
  //   initialRouteName: "Register",
  //   headerMode: "none",
  // }
);

export default AuthStack;

// export default createAppContainer(HomeStack);
