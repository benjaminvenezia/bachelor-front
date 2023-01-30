import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { Provider as ReduxProvider } from "react-redux";
import store from "./store/store";
import UserList from "./screens/UserList";

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <ReduxProvider store={store}>
        <UserList />
      </ReduxProvider>
    </View>
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
