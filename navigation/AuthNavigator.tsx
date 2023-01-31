import { createStackNavigator } from "@react-navigation/stack";
import Home from "../screens/Home";
import ROUTES from "../constants/routes";
import About from "../screens/About";
import Register from "../screens/Register";

const Stack = createStackNavigator();

const AuthNavigator = () => {
  return (
    <Stack.Navigator initialRouteName={ROUTES.HOME}>
      <Stack.Screen name={ROUTES.HOME} component={Home} />
      <Stack.Screen name={ROUTES.REGISTER} component={Home} />
      <Stack.Screen name={ROUTES.ABOUT} component={Register} />
    </Stack.Navigator>
  );
};
export default AuthNavigator;
