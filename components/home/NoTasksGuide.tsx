import { Text, SafeAreaView, StyleSheet, View, Image } from "react-native";
import Title from "../ui/Title";
import CategoriesList from "./CategoriesList";
import DaysContainer from "./DaysContainer";
import { GlobalStyles } from "../../constants/style";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

const NoTasksGuide = () => {
  const user = useSelector((state: RootState) => state.user);

  return (
    <SafeAreaView style={styles.wrapper}>
      <View style={styles.container}>
        <DaysContainer />
        <Title titleType="h2">Salut {user?.user.user.name} Aucune tâche associée à ce jour!</Title>
        <Text style={styles.text}>Vous pouvez vous rendre dans une catégorie ci-dessous pour ajouter vos premières tâches </Text>
        <Image style={styles.image} source={require("../../assets/images/eye.png")} />

        <CategoriesList />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  container: {
    paddingTop: 50,
    paddingHorizontal: 15,
    paddingBottom: 50,
    flex: 1,
  },
  text: {
    fontWeight: "bold",
    color: GlobalStyles.colors.text,
    fontSize: GlobalStyles.fontsSize.text,
  },
  image: {
    position: "absolute",
    bottom: "50%",
    zIndex: -1,
    width: "100%",
    height: 200,
  },
});

export default NoTasksGuide;
