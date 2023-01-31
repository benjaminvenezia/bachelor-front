import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ROUTES from "../constants/routes";
import { Home, Habits, Gage, Team, Suggestion, Shop } from "../screens";

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen options={{ tabBarLabel: "Menu" }} name={ROUTES.HOME_TAB} component={Home} />
      <Tab.Screen options={{ tabBarLabel: "Habitudes" }} name={ROUTES.HABITS_TAB} component={Habits} />
      <Tab.Screen options={{ tabBarLabel: "Gage" }} name={ROUTES.GAGE_TAB} component={Gage} />
      <Tab.Screen options={{ tabBarLabel: "Vous" }} name={ROUTES.TEAM_TAB} component={Team} />
      <Tab.Screen options={{ tabBarLabel: "Suggestions" }} name={ROUTES.SUGGEST_TAB} component={Suggestion} />
      <Tab.Screen options={{ tabBarLabel: "Boutique" }} name={ROUTES.SHOP_TAB} component={Shop} />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
