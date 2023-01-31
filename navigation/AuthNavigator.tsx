import { createStackNavigator } from "@react-navigation/stack";
import ROUTES from "../constants/routes";
import { About, Register, Login, Home } from "../screens";
import BottomTabNavigator from "./BottomTabNavigator";

const Stack = createStackNavigator();

const AuthNavigator = () => {
  return (
    <Stack.Navigator initialRouteName={ROUTES.REGISTER}>
      <Stack.Screen name={ROUTES.REGISTER} component={Register} />
      <Stack.Screen name={ROUTES.LOGIN} component={Login} />
      <Stack.Screen name={ROUTES.ABOUT} component={About} />
      <Stack.Screen name={ROUTES.HOME} component={BottomTabNavigator} />
    </Stack.Navigator>
  );
};
export default AuthNavigator;
