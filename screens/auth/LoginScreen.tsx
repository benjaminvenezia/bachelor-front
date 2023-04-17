import { SafeAreaView, View, StyleSheet, Text, ImageBackground } from "react-native";
import React, { useEffect } from "react";
import { Button, Title, Input } from "../../components";
import { GlobalStyles } from "../../constants/style";
import { useState } from "react";
import { login } from "../../store/slices/userSlice";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store/store";
import ROUTES from "../../constants/routes";

const LoginScreen = ({ navigation }: any) => {
  const dispatch = useDispatch();
  const [email, onChangeMail] = useState("papasq@gmail.com");
  const [password, onChangePassword] = useState("password");
  const { isLogged, message, user } = useSelector((state: RootState) => state.user);

  const handleClick = () => {
    dispatch(login({ email: email, password: password }));
  };

  useEffect(() => {
    if (message === "Vous devez vous lier à votre partenaire avant d'accéder à la page d'accueil") {
      navigation.navigate(ROUTES.LINK);
    }
  }, [message]);

  useEffect(() => {
    if (isLogged) {
      navigation.navigate(ROUTES.HOME);
    }
  }, [handleClick]);

  return (
    <SafeAreaView style={styles.wrapper}>
      <ImageBackground style={styles.image} source={require("../../assets/images/woman-calling-phone.png")} />

      <View style={styles.container}>
        <Title titleType="h1" style={styles.title}>
          Connexion
        </Title>
        <View style={styles.inputsContainer}>
          <Input onChangeHandler={onChangeMail} value={email} placeholder="Mail" keyboard="email-address" />
          <Input onChangeHandler={onChangePassword} value={password} placeholder="Mot de passe" keyboard="default" />

          <Button size={GlobalStyles.buttons.lg} onPress={handleClick}>
            Valider
          </Button>

          <Text style={styles.text}>{message}</Text>
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
  image: {
    position: "absolute",
    bottom: 0,
    zIndex: -1,
    width: "100%",
    height: "60%",
  },
  text: {
    color: "white",
    fontSize: GlobalStyles.fontsSize.text,
  },
});

export default LoginScreen;
