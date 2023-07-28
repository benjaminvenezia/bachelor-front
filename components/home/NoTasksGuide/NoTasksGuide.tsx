import {
  Text,
  SafeAreaView,
  StyleSheet,
  View,
  Image,
  ImageBackground,
} from "react-native";
import Title from "../../ui/Title/Title";
import CategoriesList from "../CategoriesList/CategoriesList";
import DaysContainer from "../DaysContainer/DaysContainer";
import { GlobalStyles } from "../../../constants/style";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { useEffect, useState } from "react";

const NoTasksGuide = () => {
  const { user } = useSelector((state: RootState) => state.user);
  const { activeDayFullText } = useSelector((state: RootState) => state.day);
  // const [activeDayText, setActiveDayText] = useState(activeDayFullText);

  // useEffect(() => {
  //   setActiveDayText(activeDayFullText);
  //   console.log(activeDayFullText);
  // }, [activeDayFullText]);

  return (
    <SafeAreaView style={styles.wrapper}>
      <View style={styles.container}>
        <DaysContainer />
        <Title titleType="h2">
          Salut {user?.name} Aucune tâche associée au {activeDayFullText}!
        </Title>
        <Text style={styles.text}>
          Vous pouvez vous rendre dans une catégorie pour en ajouter{" "}
        </Text>

        <CategoriesList />
      </View>
      <ImageBackground
        blurRadius={0}
        style={styles.image}
        source={require("../../../assets/images/confeti.png")}
      />
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
    zIndex: -2,
    width: "100%",
    height: 435,
  },
});

export default NoTasksGuide;
