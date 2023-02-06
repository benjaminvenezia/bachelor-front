import { SafeAreaView, View, StyleSheet } from "react-native";
import ROUTES from "../../constants/routes";
import React from "react";
import { Button, Title, Input } from "../../components";
import { GlobalStyles } from "../../constants/style";

const RegisterScreen = ({ navigation }: any) => {
  const [name, onChangeName] = React.useState("");
  const [mail, onChangeMail] = React.useState("");
  const [password, onChangePassword] = React.useState("");
  const [passwordVerification, onChangePasswordVerification] = React.useState("");

  return (
    <SafeAreaView style={styles.wrapper}>
      <View style={styles.container}>
        <Title style={styles.title}>Inscription</Title>
        <View style={styles.inputsContainer}>
          <Input onChangeHandler={onChangeName} value={name} placeholder="prénom" keyboard="default" />
          <Input onChangeHandler={onChangeMail} value={mail} placeholder="Mail" keyboard="email-address" />

          <Input onChangeHandler={onChangePassword} value={password} placeholder="Mot de passe" keyboard="default" />
          <Input
            onChangeHandler={onChangePasswordVerification}
            value={passwordVerification}
            placeholder="Vérifier le mot de passe"
            keyboard="default"
          />
          <Button size={GlobalStyles.buttons.lg} onPress={() => navigation.navigate(ROUTES.HOME)}>
            Valider
          </Button>
        </View>

        <Title style={styles.title}>Déjà un compte?</Title>
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
});

export default RegisterScreen;
