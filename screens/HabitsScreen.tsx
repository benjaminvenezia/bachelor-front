import { View, Text, SafeAreaView, ScrollView } from "react-native";
import { Button } from "../components";
import { HabitsList, Title } from "../components";
import { StyleSheet } from "react-native";
import { GlobalStyles } from "../constants/style";

const HabitsScreen = ({ navigation }: any) => {
  return (
    <SafeAreaView style={styles.wrapper}>
      <ScrollView style={styles.scrollView}>
        <Title titleType="h1">Habitudes</Title>
        <HabitsList />
      </ScrollView>
      <View style={styles.buttonContainer}>
        <Button onPress={() => navigation.goBack()}>Retour</Button>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    marginHorizontal: 10,
  },
  scrollView: {
    flex: 1,
  },
  text: {
    fontSize: GlobalStyles.fontsSize.text,
    color: GlobalStyles.colors.text,
  },
  button: {
    alignSelf: "stretch",
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    paddingBottom: 10,
  },
});

export default HabitsScreen;
