import { createStackNavigator } from "react-navigation-stack";
import Profile from "../screens/profile";
import Setting from "../screens/setting";
import UpdatePassword from "../screens/updatePassword";
const screens = {
  Profile: {
    screen: Profile,
   
  },
  UpdatePassword: {
    screen: UpdatePassword,
  },
  Setting : {
    screen : Setting
  }
};
const SettingStack = createStackNavigator(screens, {
  headerMode: "none",
});
export default SettingStack;
