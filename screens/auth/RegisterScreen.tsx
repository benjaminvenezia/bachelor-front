import { SafeAreaView, View, StyleSheet, Text, ImageBackground } from "react-native";
import ROUTES from "../../constants/routes";
import React, { useEffect, useState } from "react";
import { Button, Title, Input } from "../../components";
import { GlobalStyles } from "../../constants/style";
import { useDispatch } from "react-redux";
import { register } from "../../store/slices/userSlice";
import { RootState } from "../../store/store";
import { useSelector } from "react-redux";
import { getValueFor } from "../../utils/secureStore";

const RegisterScreen = ({ navigation }: any) => {
  const [name, onChangeName] = useState("benjamin");
  const [email, onChangeMail] = useState("papa@gmail.com");
  const [password, onChangePassword] = useState("password");
  const [password_verification, onChangePasswordVerification] = useState("password");
  const { user, message, isRegistered } = useSelector((state: RootState) => state.user);

  const dispatch = useDispatch();

  const handleClick = (e: any) => {
    e.preventDefault();
    dispatch(register({ name: name, email: email, password: password, password_confirmation: password_verification }));
  };

  useEffect(() => {
    if (isRegistered) {
      navigation.navigate(ROUTES.LINK);
    }
  }, [isRegistered]);

  useEffect(() => {
    const fetchToken = async () => {
      const token = await getValueFor("token");
      return token ? token : false;
    };

    const checkToken = async () => {
      const token = await fetchToken();
      token ? navigation.navigate(ROUTES.HOME) : navigation.navigate(ROUTES.REGISTER);
    };

    checkToken();
  }, []);

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
            value={password_verification}
            placeholder="Vérifier le mot de passe"
            keyboard="default"
          />

          {message ? <Text style={styles.text}>{message} </Text> : ""}

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
  text: {
    color: GlobalStyles.colors.text,
  },
});

export default RegisterScreen;
