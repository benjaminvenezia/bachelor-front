import { createDrawerNavigator } from "@react-navigation/drawer";
import { About, Team } from "../screens";
import ROUTES from "../constants/routes";
import BottomTabNavigator from "./BottomTabNavigator";

const Drawer = createDrawerNavigator();

function DrawerNavigator() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen options={{ title: "Menu" }} name={ROUTES.HOME_DRAWER} component={BottomTabNavigator} />
      <Drawer.Screen options={{ title: "A propos" }} name={ROUTES.ABOUT_DRAWER} component={About} />
      <Drawer.Screen options={{ title: "Vous" }} name={ROUTES.TEAM_DRAWER} component={Team} />
    </Drawer.Navigator>
  );
}

export default DrawerNavigator;
