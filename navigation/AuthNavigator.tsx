import { createStackNavigator } from "@react-navigation/stack";
import ROUTES from "../constants/routes";
import { RegisterScreen, LoginScreen, HomeScreen, AboutScreen, CategoryScreen } from "../screens";
import DrawerNavigator from "./DrawerNavigator";

const Stack = createStackNavigator();

const AuthNavigator = () => {
  return (
    <Stack.Navigator initialRouteName={ROUTES.REGISTER}>
      <Stack.Screen name={ROUTES.REGISTER} component={RegisterScreen} />
      <Stack.Screen name={ROUTES.LOGIN} component={LoginScreen} />
      <Stack.Screen name={ROUTES.CATEGORY} component={CategoryScreen} />
      <Stack.Screen name={ROUTES.HOME} component={DrawerNavigator} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
};
export default AuthNavigator;
