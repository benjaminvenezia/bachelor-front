import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import { Provider as ReduxProvider } from "react-redux";
import store from "./store/store";
import { NavigationContainer } from "@react-navigation/native";
import AuthNavigator from "./navigation/AuthNavigator";
import { GlobalStyles } from "./constants/style";
import { useFonts } from "expo-font";
import Toast, { BaseToast, ErrorToast } from "react-native-toast-message";

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

const toastConfig = {
  success: (props: any) => (
    <BaseToast
      {...props}
      style={{ borderLeftColor: "pink", backgroundColor: GlobalStyles.colors.secondary, color: "white" }}
      contentContainerStyle={{ paddingHorizontal: 15 }}
      text1Style={{
        color: "white",
        fontSize: 20,
        fontWeight: "900",
      }}
    />
  ),
  error: (props: any) => (
    <ErrorToast
      {...props}
      text1Style={{
        fontSize: 17,
      }}
      text2Style={{
        fontSize: 15,
      }}
    />
  ),
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
          <Toast config={toastConfig} />
        </ReduxProvider>
      </>
    );
  }
}
