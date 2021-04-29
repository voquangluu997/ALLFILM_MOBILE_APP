import { createDrawerNavigator } from "react-navigation-drawer";
import { createAppContainer } from "react-navigation";
import AuthStack from "./authStack";

const RootDrawerNavigator = createDrawerNavigator({
    "Login/Register": {
        screen : AuthStack
    },
    
});

export default createAppContainer(RootDrawerNavigator);