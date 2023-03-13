import { SafeAreaView, View, StyleSheet, Text, ImageBackground } from "react-native";
import ROUTES from "../../constants/routes";
import React, { useState } from "react";
import { Button, Title, Input } from "../../components";
import { GlobalStyles } from "../../constants/style";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setUser } from "../../store/slices/userSlice";

const RegisterScreen = ({ navigation }: any) => {
  const [email, onChangeMail] = useState("papa@gmail.com");
  const [name, onChangeName] = useState("benjamin");
  const [password, onChangePassword] = useState("password");
  const [passwordVerification, onChangePasswordVerification] = useState("password");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [status, setStatus] = useState(0);

  const dispatch = useDispatch();

  const handleClick = (e: any) => {
    e.preventDefault();
    setLoading(true);

    const res = axios
      .post("http://127.0.0.1:8000/api/register/", {
        name: name,
        email: email,
        password: password,
        password_confirmation: passwordVerification,
      })
      .then((response) => {
        dispatch(setUser({ user: response.data.data }));
        setLoading(false);

        if (response.status === 200) {
          navigation.navigate(ROUTES.LINK);
        }
      })
      .catch((error) => {
        setStatus(400);
        setError(true);
        console.log(error);
      });
  };

  return (
    <SafeAreaView style={styles.wrapper}>
      <ImageBackground style={styles.image} source={require("../../assets/images/man-playing-saxophone.png")} />
      <View style={styles.container}>
        <Title titleType="h1" style={styles.title}>
          Inscription
        </Title>
        <View style={styles.inputsContainer}>
          <Input shadow={true} onChangeHandler={onChangeName} value={name} placeholder="prénom" keyboard="default" />
          <Input shadow={true} onChangeHandler={onChangeMail} value={email} placeholder="Mail" keyboard="email-address" />
          <Input shadow={true} onChangeHandler={onChangePassword} value={password} placeholder="Mot de passe" keyboard="default" />
          <Input
            shadow={true}
            onChangeHandler={onChangePasswordVerification}
            value={passwordVerification}
            placeholder="Vérifier le mot de passe"
            keyboard="default"
          />

          {error ? <Text>Erreur, un champ est non rempli ou l'adresse existe déjà. </Text> : ""}

          <Button size={GlobalStyles.buttons.lg} onPress={handleClick}>
            Valider
          </Button>
        </View>

        <Title titleType="h2" style={styles.title}>
          Déjà un compte?
        </Title>
        <Button size={GlobalStyles.buttons.lg} onPress={() => navigation.navigate(ROUTES.LOGIN)}>
          Connexion
        </Button>
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
    zIndex: -1,
    resizeMode: "cover",
    width: "100%",
    height: "81%",
  },
});

export default RegisterScreen;
