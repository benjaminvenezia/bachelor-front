import { createStackNavigator } from "@react-navigation/stack";
import ROUTES from "../constants/routes";
import { About, Register, Login, Home } from "../screens";

const Stack = createStackNavigator();

const AuthNavigator = () => {
  return (
    <Stack.Navigator initialRouteName={ROUTES.REGISTER}>
      <Stack.Screen name={ROUTES.HOME} component={Home} />
      <Stack.Screen name={ROUTES.REGISTER} component={Register} />
      <Stack.Screen name={ROUTES.LOGIN} component={Login} />
      <Stack.Screen name={ROUTES.ABOUT} component={About} />
    </Stack.Navigator>
  );
};
export default AuthNavigator;
