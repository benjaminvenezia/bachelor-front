import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import { StyleSheet } from "react-native";
import { Provider as ReduxProvider } from "react-redux";
import store from "./store/store";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import AuthNavigator from "./navigation/AuthNavigator";
import { GlobalStyles } from "./constants/style";

const MyTheme = {
  dark: false,
  colors: {
    primary: "rgb(0, 0, 0)",
    background: "rgb(255, 255, 255)",
    card: "rgb(255, 255, 255)",
    text: "rgb(0, 0, 0)",
    border: "rgb(255, 255, 255)",
    notification: "rgb(0, 0, 0)",
  },
};

export default function App() {
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
