import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "../screens/Home";
import ROUTES from "../constants/routes";
import Habits from "../screens/Habits";
import Gage from "../screens/Gage";
import Team from "../screens/Team";
import Suggestion from "../screens/Suggestion";
import Shop from "../screens/Shop";

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name={ROUTES.HOME_TAB} component={Home} />
      <Tab.Screen name={ROUTES.HABITS_TAB} component={Habits} />
      <Tab.Screen name={ROUTES.GAGE_TAB} component={Gage} />
      <Tab.Screen name={ROUTES.TEAM_TAB} component={Team} />
      <Tab.Screen name={ROUTES.SUGGEST_TAB} component={Suggestion} />
      <Tab.Screen name={ROUTES.SHOP_TAB} component={Shop} />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
