import { SafeAreaView, View, StyleSheet } from "react-native";
import ROUTES from "../../constants/routes";
import React from "react";
import { Button, Title, Input } from "../../components";
import { GlobalStyles } from "../../constants/style";
import { useState } from "react";
import axios from "axios";
import { setToken } from "../../store/slices/userSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

const LoginScreen = ({ navigation }: any) => {
  const [email, onChangeMail] = useState("ben@gmail.com");
  const [password, onChangePassword] = useState("password");
  const [loading, setLoading] = useState(false);
  const [fromFetch, setFromFetch] = useState(false);
  const [axiosData, setAxiosData] = useState(null);

  const token = useSelector((state: RootState) => state.user);

  const dispatch = useDispatch();

  const handleClick = (e: any) => {
    e.preventDefault();
    setFromFetch(false);
    setLoading(true);

    axios.post("http://127.0.0.1:8000/api/login/", { email: email, password: password }).then((response) => {
      dispatch(setToken({ token: response.data.data.token }));
      setLoading(false);
      setAxiosData(response.data);
    });

    navigation.navigate(ROUTES.HOME);
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
