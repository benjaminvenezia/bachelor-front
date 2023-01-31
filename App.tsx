import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import { StyleSheet } from "react-native";
import { Provider as ReduxProvider } from "react-redux";
import store from "./store/store";
import { NavigationContainer } from "@react-navigation/native";
import AuthNavigator from "./navigation/AuthNavigator";

export default function App() {
  return (
    <>
      <StatusBar style="auto" />
      <ReduxProvider store={store}>
        <NavigationContainer>
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
