import { View, Text, Button, StyleSheet } from "react-native";
import ROUTES from "../../constants/routes";

const RegisterScreen = ({ navigation }: any) => {
  return (
    <View style={styles.wrapper}>
      <Text>Inscription</Text>

      <Text>Déjà un compte?</Text>
      <Button title="valider" onPress={() => navigation.navigate(ROUTES.HOME)} />
      <Text></Text>
      <Button title="connexion" onPress={() => navigation.navigate(ROUTES.LOGIN)} />
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
});

export default RegisterScreen;
