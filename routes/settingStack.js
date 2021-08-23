import { createStackNavigator } from "react-navigation-stack";
import Profile from "../screens/profile";
import Setting from "../screens/setting";
const screens = {
  Profile: {
    screen: Profile,
    screen: Setting
  },
};
const Profile = createStackNavigator(
  screens,
  {
    initialRouteName: "Profile",
    headerMode: "none",
  },
  
);
export default Profile;
