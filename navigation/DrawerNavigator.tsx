import { createDrawerNavigator } from "@react-navigation/drawer";
import { AboutScreen, TeamScreen } from "../screens";
import ROUTES from "../constants/routes";
import BottomTabNavigator from "./BottomTabNavigator";

const Drawer = createDrawerNavigator();

function DrawerNavigator() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen options={{ title: "Menu" }} name={ROUTES.HOME_DRAWER} component={BottomTabNavigator} />
      <Drawer.Screen options={{ title: "A propos" }} name={ROUTES.ABOUT_DRAWER} component={AboutScreen} />
      <Drawer.Screen options={{ title: "Vous" }} name={ROUTES.TEAM_DRAWER} component={TeamScreen} />
    </Drawer.Navigator>
  );
}

export default DrawerNavigator;
