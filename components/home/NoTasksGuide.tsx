import { Text, SafeAreaView, StyleSheet, View, Image, ImageBackground } from "react-native";
import Title from "../ui/Title";
import CategoriesList from "./CategoriesList";
import DaysContainer from "./DaysContainer";
import { GlobalStyles } from "../../constants/style";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

const NoTasksGuide = () => {
  const { user } = useSelector((state: RootState) => state.user);

  return (
    <SafeAreaView style={styles.wrapper}>
      <View style={styles.container}>
        <DaysContainer />
        <Title titleType="h2">Salut {user.name} Aucune tâche associée à ce jour!</Title>
        <Text style={styles.text}>Vous pouvez vous rendre dans une catégorie pour en ajouter </Text>

        <CategoriesList />
      </View>
      <ImageBackground blurRadius={0} style={styles.image} source={require("../../assets/images/woman-sorrow.png")} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  container: {
    paddingTop: 50,

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
    bottom: "0%",
    zIndex: -1,
    width: 113,
    height: 335,
  },
});

export default NoTasksGuide;
