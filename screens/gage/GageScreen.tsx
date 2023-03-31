import { Text, StyleSheet, View } from "react-native";
import { Button, Title } from "../../components";
import { SafeAreaView } from "react-native-safe-area-context";
import { DropdownCategories } from "../../components";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { GlobalStyles } from "../../constants/style";
import { ScrollView } from "react-native-gesture-handler";
import { fetchDefaultGagesFromDatabase } from "../../store/slices/gagesSlice";
import { ThunkDispatch } from "@reduxjs/toolkit";
import ROUTES from "../../constants/routes";
import { RootState } from "../../store/store";

const GageScreen = ({ navigation }: any) => {
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
  const { categoryGageSelection } = useSelector((state: RootState) => state.gages);

  useEffect(() => {
    dispatch(fetchDefaultGagesFromDatabase());
  }, []);

  const handlePress = () => {
    navigation.navigate(ROUTES.SELECT_TASK);
  };

  return (
    <SafeAreaView style={styles.wrapper}>
      <ScrollView style={styles.scrollView}>
        <Title titleType="h1">Faire subir un gage</Title>
        <Text style={styles.text}>Choisissez une catégorie!</Text>
        <DropdownCategories />
      </ScrollView>
      <View style={styles.buttonContainer}>
        <Button onPress={() => navigation.goBack()}>Retour</Button>

        {categoryGageSelection ? (
          <Button onPress={handlePress}>Suivant</Button>
        ) : (
          <Button alternativeStyle onPress={() => {}}>
            Choisir
          </Button>
        )}
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

export default GageScreen;
