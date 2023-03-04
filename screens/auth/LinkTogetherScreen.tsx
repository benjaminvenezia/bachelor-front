import { View, Text, StyleSheet, SafeAreaView } from "react-native";
import { Button } from "../../components";
import { Title, Input } from "../../components";
import { GlobalStyles } from "../../constants/style";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { setGroupInDatabase, getGroupFromDatabase } from "../../utils/http/httpGroup";
import { getUserByCode } from "../../utils/http/httpUser";
import ROUTES from "../../constants/routes";

const LinkTogetherScreen = ({ navigation }: any) => {
  const user = useSelector((state: RootState) => state.user);
  const [anotherLink, setAnotherLink] = useState("");
  const [anotherId, setAnotherId] = useState(-1);
  const [groupMessage, setGroupMessage]: any = useState("");
  const [linkMessage, setLinkMessage]: any = useState("");
  // const [group, setGroup] = useState(null);
  const token = user.user.token;

  const dispatch = useDispatch();

  const handleClick = () => {
    getUserByCode(token, anotherLink, setAnotherId, setLinkMessage);
    setGroupInDatabase(anotherId, token, setGroupMessage);

    getGroupFromDatabase(token, dispatch);
  };

  useEffect(() => {
    if (groupMessage["code"] === 200) {
      navigation.navigate(ROUTES.HOME);
    }
  }, [groupMessage]);

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

          <Text>{groupMessage["message"]}</Text>
          <Text>{linkMessage["message"]}</Text>
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
