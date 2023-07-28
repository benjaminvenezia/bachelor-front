import { View, StyleSheet } from "react-native";
import { Button, ListGagesTasks, Title } from "../../components";
import ROUTES from "../../constants/routes";
import { GlobalStyles } from "../../constants/style";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

const GageSelectTaskScreen = ({ navigation }: any) => {
  const { gageTaskId } = useSelector((state: RootState) => state.gages);

  return (
    <View style={styles.container}>
      <Title titleType="h2" style={styles.text}>
        Choisissez une tâche!
      </Title>
      <ListGagesTasks />
      <View style={styles.buttonContainer}>
        <Button onPress={() => navigation.goBack()}>Retour</Button>

        {gageTaskId ? (
          <Button onPress={() => navigation.navigate(ROUTES.SELECT_DATE)}>
            Suivant
          </Button>
        ) : (
          <Button alternativeStyle onPress={() => {}}>
            Choisir
          </Button>
        )}
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
