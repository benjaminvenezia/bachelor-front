import { View, Text, StyleSheet } from "react-native";
import { Button, DropdownGagesTasks } from "../../components";
import ROUTES from "../../constants/routes";
import { GlobalStyles } from "../../constants/style";

const GageSelectTaskScreen = ({ navigation }: any) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Choississeez une tâche!</Text>
      <DropdownGagesTasks />
      <View style={styles.buttonContainer}>
        <Button onPress={() => navigation.goBack()}>Retour</Button>
        <Button onPress={() => navigation.navigate(ROUTES.SELECT_DATE)}>Suivant</Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    paddingBottom: 10,
  },
  text: {
    fontSize: GlobalStyles.fontsSize.text,
    color: GlobalStyles.colors.text,
    marginHorizontal: 10,
    marginBottom: 10,
  },
});

export default GageSelectTaskScreen;
