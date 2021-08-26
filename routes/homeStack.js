import { StackActions, NavigationActions } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import Home from "../screens/home";
import MovieDetail from "../screens/movieDetail";
import PromotionDetail from "../screens/promotionDetail";
import Booking from "../screens/booking";
import Payment from "../screens/payment";
import ComingSoonDetail from "../screens/comingSoonDetail";
const screens = {
  Home: {
    screen: Home,
    // navigationOptions: ({ navigation }) => {
    //   return {
    //     headerTitle: () => (
    //       // <Header namePage="ALLFILM" navigation={navigation} />
    //       <Header namePage="ALLFILM" navigation={navigation} />
    //     ),
    //     headerTitleAlign: "center",
    //   };
    // },
  },
  MovieDetail: {
    screen: MovieDetail,
  },
  PromotionDetail: {
    screen: PromotionDetail,
  },
  ComingSoonDetail: {
    screen: ComingSoonDetail,
  },
  Booking: {
    screen: Booking,
  },
  Payment: {
    screen: Payment,
  },
};
const HomeStack = createStackNavigator(screens, {
  headerMode: "none",
});

export default HomeStack;
