import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ROUTES from "../constants/routes";
import {
  HomeScreen,
  HabitsScreen,
  SuggestionScreen,
  ShopScreen,
} from "../screens";
import GageStackNavigator from "./GageStacknavigator";
import TeamStackNavigator from "./TeamStackNavigator";
import {
  Feather,
  MaterialCommunityIcons,
  FontAwesome5,
  Entypo,
} from "@expo/vector-icons";
import { StyleSheet } from "react-native";
import { GlobalStyles } from "../constants/style";

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen
        name={ROUTES.HOME_TAB}
        component={HomeScreen}
        options={{
          tabBarLabel: "Menu",
          tabBarIcon: ({ color, size }) => {
            return <Feather name="home" size={size} color={color} />;
          },
        }}
      />
      <Tab.Screen
        name={ROUTES.HABITS_TAB}
        component={HabitsScreen}
        options={{
          tabBarLabel: "Habitudes",
          tabBarIcon: ({ color, size }) => {
            return <FontAwesome5 name="socks" size={size} color={color} />;
          },
        }}
      />
      <Tab.Screen
        name={ROUTES.GAGE_TAB}
        component={GageStackNavigator}
        options={{
          tabBarLabel: "Gage",
          tabBarIcon: ({ color, size }) => {
            return (
              <MaterialCommunityIcons name="sword" size={size} color={color} />
            );
          },
        }}
      />
      <Tab.Screen
        name={ROUTES.TEAM_TAB}
        component={TeamStackNavigator}
        options={{
          tabBarLabel: "Vous",
          tabBarIcon: ({ color, size }) => {
            return <Entypo name="users" size={size} color={color} />;
          },
        }}
      />
      <Tab.Screen
        name={ROUTES.SUGGEST_TAB}
        component={SuggestionScreen}
        options={{
          tabBarLabel: "Suggestions",
          tabBarIcon: ({ color, size }) => {
            return <Feather name="list" size={size} color={color} />;
          },
        }}
      />
      <Tab.Screen
        options={{
          tabBarLabel: "Boutique",
          tabBarIcon: ({ color, size }) => {
            return <Feather name="shopping-cart" size={size} color={color} />;
          },
        }}
        name={ROUTES.SHOP_TAB}
        component={ShopScreen}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  text: {
    color: GlobalStyles.colors.text,
  },
});

export default BottomTabNavigator;
