import { createStackNavigator } from "@react-navigation/stack";
import Home from "../screens/Home";
import ROUTES from "../constants/routes";
import About from "../screens/About";

const Stack = createStackNavigator();

const AuthNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name={ROUTES.HOME} component={Home} />
      <Stack.Screen name={ROUTES.ABOUT} component={About} />
    </Stack.Navigator>
  );
};
export default AuthNavigator;
