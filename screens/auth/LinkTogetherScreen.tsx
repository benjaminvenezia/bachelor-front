import { View, Text, StyleSheet, SafeAreaView } from "react-native";
import { Button } from "../../components";
import { Title, Input } from "../../components";
import { GlobalStyles } from "../../constants/style";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { setGroupInDatabase } from "../../utils/http/httpGroup";
import { getUserByCode } from "../../utils/http/httpUser";

const LinkTogetherScreen = () => {
  const user = useSelector((state: RootState) => state.user);
  const [anotherLink, setAnotherLink] = useState("");
  const [anotherId, setAnotherId] = useState(-1);
  const [groupErrorMessage, setGroupErrorMessage] = useState("");
  // const [group, setGroup] = useState(null);
  const token = user.user.token;

  const handleClick = () => {
    getUserByCode(token, anotherLink, setAnotherId);
    setGroupInDatabase(anotherId, token, setGroupErrorMessage);
    console.log(groupErrorMessage);
  };

  return (
    <SafeAreaView style={styles.wrapper}>
      <View style={styles.container}>
        <Title style={styles.title}>Lien avec votre partenaire</Title>

        <View style={styles.inputsContainer}>
          <Text>Mon code d'invitation : {user.user.user.personalCode}</Text>

          <Text>Code de votre partenaire</Text>
          <Input onChangeHandler={setAnotherLink} value={anotherLink} placeholder="Code de votre partenaire" />

          <Button size={GlobalStyles.buttons.lg} onPress={handleClick}>
            Valider
          </Button>

          <Text>{groupErrorMessage["message"]}</Text>
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
