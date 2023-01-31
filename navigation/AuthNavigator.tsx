import { createStackNavigator } from "@react-navigation/stack";
import ROUTES from "../constants/routes";
import { Register, Login, Home, About } from "../screens";
import DrawerNavigator from "./DrawerNavigator";

const Stack = createStackNavigator();

const AuthNavigator = () => {
  return (
    <Stack.Navigator initialRouteName={ROUTES.REGISTER}>
      <Stack.Screen name={ROUTES.REGISTER} component={Register} />
      <Stack.Screen name={ROUTES.LOGIN} component={Login} />
      <Stack.Screen name={ROUTES.HOME} component={DrawerNavigator} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
};
export default AuthNavigator;
