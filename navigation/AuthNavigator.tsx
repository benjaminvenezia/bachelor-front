import { createStackNavigator } from "@react-navigation/stack";
import ROUTES from "../constants/routes";
import { RegisterScreen, LoginScreen, LinkTogetherScreen, CategoryScreen, TeamScreen, LoadingScreen } from "../screens";
import DrawerNavigator from "./DrawerNavigator";

const Stack = createStackNavigator();

const AuthNavigator = () => {
  return (
    <Stack.Navigator initialRouteName={ROUTES.LOADING}>
      <Stack.Screen name={ROUTES.LOADING} component={LoadingScreen} options={{ headerShown: false }} />
      <Stack.Screen name={ROUTES.REGISTER} component={RegisterScreen} options={{ headerShown: false }} />
      <Stack.Screen name={ROUTES.LOGIN} component={LoginScreen} options={{ headerShown: false }} />
      <Stack.Screen name={ROUTES.LINK} component={LinkTogetherScreen} options={{ headerShown: false }} />
      <Stack.Screen name={ROUTES.CATEGORY} component={CategoryScreen} />
      <Stack.Screen name={ROUTES.HOME} component={DrawerNavigator} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
};
export default AuthNavigator;
