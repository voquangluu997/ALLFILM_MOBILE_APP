import { createDrawerNavigator } from "react-navigation-drawer";
import { createAppContainer } from "react-navigation";
import AuthStack from "./authStack";

const RootDrawerNavigator = createDrawerNavigator({
    Auth: {
        screen : AuthStack
    },
    
});

export default createAppContainer(RootDrawerNavigator);