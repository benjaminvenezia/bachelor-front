import { createStackNavigator } from "@react-navigation/stack";
import Home from "../screens/Home";
import ROUTES from "../constants/routes";
import About from "../screens/About";
import Register from "../screens/Register";
import Login from "../screens/Login";
import Suggestion from "../screens/Suggestion";

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
