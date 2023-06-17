import { createDrawerNavigator } from "@react-navigation/drawer";
import { AboutScreen, TeamScreen, UserScreen } from "../screens";
import ROUTES from "../constants/routes";
import BottomTabNavigator from "./BottomTabNavigator";
import { CurrentWinnerBadge } from "../components";

const Drawer = createDrawerNavigator();

function DrawerNavigator() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen
        options={{
          title: "Menu",
          headerRight: () => <CurrentWinnerBadge />,
        }}
        name={ROUTES.HOME_DRAWER}
        component={BottomTabNavigator}
      />
      <Drawer.Screen options={{ title: "A propos" }} name={ROUTES.ABOUT_DRAWER} component={AboutScreen} />
      {/* <Drawer.Screen options={{ title: "Vous" }} name={ROUTES.TEAM_DRAWER} component={TeamScreen} /> */}
      <Drawer.Screen options={{ title: "Mon compte" }} name={ROUTES.USER} component={UserScreen} />
    </Drawer.Navigator>
  );
}

export default DrawerNavigator;
