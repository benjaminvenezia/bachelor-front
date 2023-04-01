import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import { StyleSheet } from "react-native";
import { Provider as ReduxProvider } from "react-redux";
import store from "./store/store";
import { NavigationContainer } from "@react-navigation/native";
import AuthNavigator from "./navigation/AuthNavigator";
import { GlobalStyles } from "./constants/style";
import { useFonts } from "expo-font";

const MyTheme = {
  dark: GlobalStyles.reactNative.darktheme,
  colors: {
    primary: GlobalStyles.reactNative.primary,
    background: GlobalStyles.reactNative.background,
    card: GlobalStyles.reactNative.card,
    text: GlobalStyles.reactNative.text,
    border: GlobalStyles.reactNative.border,
    notification: GlobalStyles.reactNative.notification,
  },
};

export default function App() {
  const [fontsLoaded] = useFonts({
    "Gatwick-Bold": require("./assets/fonts/PPGatwick-Bold.otf"),
    "Gafiton-Regular": require("./assets/fonts/Gafiton-Regular.otf"),
    "RobotoCondensed-Bold": require("./assets/fonts/RobotoCondensed-Bold.ttf"),
  });

  if (!fontsLoaded) {
    // return <AppLoading />;
  } else {
    return (
      <>
        <StatusBar style="auto" />
        <ReduxProvider store={store}>
          <NavigationContainer theme={MyTheme}>
            <AuthNavigator />
          </NavigationContainer>
        </ReduxProvider>
      </>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
