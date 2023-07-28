import { createStackNavigator } from "@react-navigation/stack";
import ROUTES from "../constants/routes";
import {
  GageScreen,
  GageSelectDateScreen,
  GageSelectTaskScreen,
  GageValidateScreen,
  HomeScreen,
} from "../screens";
const Stack = createStackNavigator();

function GageStackNavigator() {
  return (
    <Stack.Navigator
      initialRouteName={ROUTES.GAGE}
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name={ROUTES.GAGE} component={GageScreen} />
      <Stack.Screen
        name={ROUTES.SELECT_DATE}
        component={GageSelectDateScreen}
      />
      <Stack.Screen
        name={ROUTES.SELECT_TASK}
        component={GageSelectTaskScreen}
      />
      <Stack.Screen
        name={ROUTES.VALIDATE_GAGE}
        component={GageValidateScreen}
      />
      <Stack.Screen name={ROUTES.HOME} component={HomeScreen} />
    </Stack.Navigator>
  );
}

export default GageStackNavigator;
