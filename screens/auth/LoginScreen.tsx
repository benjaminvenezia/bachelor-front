import { SafeAreaView, View, StyleSheet, Text, ImageBackground } from "react-native";
import React, { useEffect } from "react";
import { Button, Title, Input } from "../../components";
import { GlobalStyles } from "../../constants/style";
import { useState } from "react";
import { login } from "../../store/slices/userSlice";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store/store";
import ROUTES from "../../constants/routes";

import { getGroupFromDatabase } from "../../store/slices/groupSlice";
import { fetchDefaultTasksFromDatabase } from "../../store/slices/allTasksSlice";
import { fetchTasksFromDatabase } from "../../store/slices/activeTasksSlice";
import { fetchDefaultGagesFromDatabase, fetchGagesFromDatabase } from "../../store/slices/gagesSlice";
import { fetchCurrentUser } from "../../store/slices/userSlice";

const LoginScreen = ({ navigation }: any) => {
  const dispatch = useDispatch();
  const [email, onChangeMail] = useState("papak@gmail.com");
  const [password, onChangePassword] = useState("password");
  const [error, setError]: any = useState();
  const { isLogged } = useSelector((state: RootState) => state.user);

  const handleClick = () => {
    dispatch(login({ email: email, password: password }));
    dispatch(getGroupFromDatabase());
    dispatch(fetchDefaultTasksFromDatabase());
    dispatch(fetchTasksFromDatabase());
    dispatch(fetchGagesFromDatabase());
    dispatch(fetchDefaultGagesFromDatabase());
    dispatch(fetchCurrentUser());
  };

  const { isGroupLoaded } = useSelector((state: RootState) => state.group);
  const { areDefaultTasksFetched } = useSelector((state: RootState) => state.allTasksList);
  const { areTasksFetched } = useSelector((state: RootState) => state.activeTasksList);
  const { areGagesFetched } = useSelector((state: RootState) => state.gages);
  const { areDefaultGagesFetched } = useSelector((state: RootState) => state.gages);
  const { isUserFetched } = useSelector((state: RootState) => state.user);

  useEffect(() => {
    if (
      isLogged &&
      isGroupLoaded &&
      areDefaultTasksFetched &&
      areTasksFetched &&
      areGagesFetched &&
      areDefaultGagesFetched &&
      isUserFetched
    ) {
      navigation.navigate(ROUTES.HOME);
    }
  }, [isLogged, isGroupLoaded, areDefaultTasksFetched, areTasksFetched, areGagesFetched, areDefaultGagesFetched, isUserFetched]);

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

          <Text style={styles.text}>{error?.message}</Text>
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
    color: GlobalStyles.colors.text,
    fontSize: GlobalStyles.fontsSize.text,
  },
});

export default LoginScreen;
