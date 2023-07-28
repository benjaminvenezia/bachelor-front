import { createDrawerNavigator } from "@react-navigation/drawer";
import { AboutScreen, UserScreen } from "../screens";
import ROUTES from "../constants/routes";
import BottomTabNavigator from "./BottomTabNavigator";
import { CurrentWinnerBadge, UserPoints } from "../components";
import { View } from "react-native";
import { StyleSheet } from "react-native";

const Drawer = createDrawerNavigator();

function DrawerNavigator() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen
        options={{
          title: "Home",
          headerTintColor: "white",
          headerTitleStyle: {
            //Hide the title in screen
            color: "black",
          },
          headerRight: () => {
            return (
              <View style={styles.container}>
                <CurrentWinnerBadge />
                <UserPoints />
              </View>
            );
          },
        }}
        name={ROUTES.HOME_DRAWER}
        component={BottomTabNavigator}
      />
      <Drawer.Screen options={{ title: "A propos" }} name={ROUTES.ABOUT_DRAWER} component={AboutScreen} />
      <Drawer.Screen options={{ title: "Mon compte" }} name={ROUTES.USER} component={UserScreen} />
    </Drawer.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 170,
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "row-reverse",
    alignItems: "center",
  },
});

export default DrawerNavigator;
