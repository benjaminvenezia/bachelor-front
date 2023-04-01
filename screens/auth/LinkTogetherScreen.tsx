import { View, Text, StyleSheet, SafeAreaView, ImageBackground } from "react-native";
import { Button } from "../../components";
import { Title, Input } from "../../components";
import { GlobalStyles } from "../../constants/style";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { setGroupInDatabase, getGroupFromDatabase } from "../../store/slices/groupSlice";
import { ThunkDispatch } from "@reduxjs/toolkit";
import ROUTES from "../../constants/routes";

const LinkTogetherScreen = ({ navigation }: any) => {
  const { user, isLogged, message } = useSelector((state: RootState) => state.user);
  const { isGroupCreated } = useSelector((state: RootState) => state.group);
  const [anotherLink, setAnotherLink] = useState("");

  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();

  const handleClick = () => {
    dispatch(setGroupInDatabase(anotherLink));
    dispatch(getGroupFromDatabase());
    navigation.navigate(ROUTES.HOME);
  };

  useEffect(() => {
    if (isGroupCreated) {
      navigation.navigate(ROUTES.HOME);
    }
  }, [isGroupCreated]);

  return (
    <SafeAreaView style={styles.wrapper}>
      <ImageBackground style={styles.image} source={require("../../assets/images/man-looking-binoculars.png")} />

      <View style={styles.container}>
        <Title titleType="h1" style={styles.title}>
          Lien avec votre partenaire
        </Title>

        <View style={styles.inputsContainer}>
          <Text style={styles.text}>Mon code d'invitation : </Text>
          <Title titleType="h1">{user?.personal_code}</Title>

          <Text style={styles.text}>Code de votre partenaire</Text>

          <Input onChangeHandler={setAnotherLink} value={anotherLink} placeholder="Code de votre partenaire" />

          <Text style={styles.text}>{message}</Text>

          {anotherLink.length === 0 ? (
            <Button onPress={() => {}} alternativeStyle>
              Valider
            </Button>
          ) : (
            <Button style={styles.button} size={GlobalStyles.buttons.xl} onPress={handleClick}>
              Valider
            </Button>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  container: {
    paddingTop: 40,
    padding: 20,
  },
  inputsContainer: {
    marginBottom: 30,
  },
  title: {
    marginBottom: 30,
  },
  text: {
    color: GlobalStyles.colors.text,
    fontSize: GlobalStyles.fontsSize.text,
    marginBottom: 10,
  },
  button: {},
  image: {
    position: "absolute",
    bottom: 0,
    zIndex: -1,
    width: "100%",
    height: "50%",
  },
});
export default LinkTogetherScreen;
