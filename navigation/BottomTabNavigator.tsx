import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "../screens/Home";
import About from "../screens/About";

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
      <Tab.Screen name={ROUTES.HOME} component={Home} />
      <Tab.Screen name={ROUTES.HABITS} component={Habits} />
      <Tab.Screen name={ROUTES.GAGE} component={Gage} />
      <Tab.Screen name={ROUTES.TEAM} component={Team} />
      <Tab.Screen name={ROUTES.SUGGEST} component={Suggestion} />
      <Tab.Screen name={ROUTES.SHOP} component={Shop} />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
