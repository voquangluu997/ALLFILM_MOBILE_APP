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
    {
      headerMode: "none",
    },
  //   {
  //     initialRouteName: "Register",
  //     headerMode: "none",
  //   }
);
export default AuthStack;
