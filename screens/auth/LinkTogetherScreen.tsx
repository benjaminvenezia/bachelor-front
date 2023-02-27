import { View, Text, StyleSheet, SafeAreaView } from "react-native";
import { Button } from "../../components";
import { Title, Input } from "../../components";
import { GlobalStyles } from "../../constants/style";
import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

const LinkTogetherScreen = () => {
  const user = useSelector((state: RootState) => state.user);

  const handleClick = () => {};

  const [anotherLink, setAnotherLink] = useState("");

  return (
    <SafeAreaView style={styles.wrapper}>
      <View style={styles.container}>
        <Title style={styles.title}>Lien avec votre partenaire</Title>

        <View style={styles.inputsContainer}>
          <Text>Mon code d'invitation : {user.user.user.personalCode}</Text>

          <Input onChangeHandler={setAnotherLink} value={anotherLink} placeholder="Code de votre partenaire" />

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
export default LinkTogetherScreen;
