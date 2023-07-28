import { createStackNavigator } from "@react-navigation/stack";
import ROUTES from "../constants/routes";
import { TeamScreen, GagesTeamScreen, HomeScreen } from "../screens";
const Stack = createStackNavigator();

function TeamStackNavigator() {
  return (
    <Stack.Navigator
      initialRouteName={ROUTES.TEAM}
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name={ROUTES.TEAM} component={TeamScreen} />
      <Stack.Screen name={ROUTES.GAGE_TEAM} component={GagesTeamScreen} />
      <Stack.Screen name={ROUTES.HOME} component={HomeScreen} />
    </Stack.Navigator>
  );
}

export default TeamStackNavigator;
