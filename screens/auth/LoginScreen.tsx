import { SafeAreaView, View, StyleSheet } from "react-native";
import ROUTES from "../../constants/routes";
import React from "react";
import { Button, Title, Input } from "../../components";
import { GlobalStyles } from "../../constants/style";

const LoginScreen = ({ navigation }: any) => {
  const [mail, onChangeMail] = React.useState("");
  const [password, onChangePassword] = React.useState("");

  return (
    <SafeAreaView style={styles.wrapper}>
      <View style={styles.container}>
        <Title style={styles.title}>Connexion</Title>
        <View style={styles.inputsContainer}>
          <Input onChangeHandler={onChangeMail} value={mail} placeholder="Mail" keyboard="email-address" />
          <Input onChangeHandler={onChangePassword} value={password} placeholder="Mot de passe" keyboard="default" />

          <Button size={GlobalStyles.buttons.lg} onPress={() => navigation.navigate(ROUTES.HOME)}>
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
