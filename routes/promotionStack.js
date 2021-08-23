import { createStackNavigator } from "react-navigation-stack";
import Promotion from "../screens/promotion";
const screens = {
  Profile: {
    screen: Promotion,
  },
};
const Profile = createStackNavigator(screens, {
  initialRouteName: "Profile",
  headerMode: "none",
});
export default Profile;
