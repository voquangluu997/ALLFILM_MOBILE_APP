import { createDrawerNavigator } from "react-navigation-drawer";
import { createAppContainer } from "react-navigation";
import AuthStack from "./authStack";
import HomeStack from "./homeStack";

const RootDrawerNavigator = createDrawerNavigator({
  Home: {
    screen: HomeStack,
  },
  "Login/Register": {
    screen: AuthStack,
  },
});

export default createAppContainer(RootDrawerNavigator);
