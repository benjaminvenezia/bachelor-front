import { SafeAreaView, View, StyleSheet, Text } from "react-native";
import ROUTES from "../../constants/routes";
import React from "react";
import { Button, Title, Input } from "../../components";
import { GlobalStyles } from "../../constants/style";
import { useState } from "react";
import axios from "axios";
import { setUser } from "../../store/slices/userSlice";
import { useDispatch } from "react-redux";

const LoginScreen = ({ navigation }: any) => {
  const [email, onChangeMail] = useState("papa@gmail.com");
  const [password, onChangePassword] = useState("password");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [status, setStatus] = useState(0);

  const dispatch = useDispatch();

  const handleClick = (e: any) => {
    e.preventDefault();
    setLoading(true);

    const res = axios
      .post("http://127.0.0.1:8000/api/login/", { email: email, password: password })
      .then((response) => {
        dispatch(setUser({ user: response.data.data }));
        setLoading(false);

        if (response.status === 200) {
          navigation.navigate(ROUTES.HOME);
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
      <View style={styles.container}>
        <Title style={styles.title}>Connexion</Title>
        <View style={styles.inputsContainer}>
          <Input onChangeHandler={onChangeMail} value={email} placeholder="Mail" keyboard="email-address" />
          <Input onChangeHandler={onChangePassword} value={password} placeholder="Mot de passe" keyboard="default" />

          <Button size={GlobalStyles.buttons.lg} onPress={handleClick}>
            Valider
          </Button>

          {error && <Text>Les identifiants entrés sont incorrects...</Text>}
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
});

export default LoginScreen;
