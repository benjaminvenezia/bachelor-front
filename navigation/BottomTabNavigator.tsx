import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ROUTES from "../constants/routes";
import { HomeScreen, HabitsScreen, GageScreen, TeamScreen, SuggestionScreen, ShopScreen } from "../screens";

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen options={{ tabBarLabel: "Menu" }} name={ROUTES.HOME_TAB} component={HomeScreen} />
      <Tab.Screen options={{ tabBarLabel: "Habitudes" }} name={ROUTES.HABITS_TAB} component={HabitsScreen} />
      <Tab.Screen options={{ tabBarLabel: "Gage" }} name={ROUTES.GAGE_TAB} component={GageScreen} />
      <Tab.Screen options={{ tabBarLabel: "Vous" }} name={ROUTES.TEAM_TAB} component={TeamScreen} />
      <Tab.Screen options={{ tabBarLabel: "Suggestions" }} name={ROUTES.SUGGEST_TAB} component={SuggestionScreen} />
      <Tab.Screen options={{ tabBarLabel: "Boutique" }} name={ROUTES.SHOP_TAB} component={ShopScreen} />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
