import { View, Text, StyleSheet, SafeAreaView, ImageBackground } from "react-native";
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
      <ImageBackground style={styles.image} source={require("../../assets/images/man-looking-binoculars.png")} />

      <View style={styles.container}>
        <Title titleType="h1" style={styles.title}>
          Lien avec votre partenaire
        </Title>

        <View style={styles.inputsContainer}>
          <Text style={styles.text}>Mon code d'invitation : </Text>
          <Title titleType="h1">{user.user.user.personalCode}</Title>

          <Text style={styles.text}>Code de votre partenaire</Text>

          <Input onChangeHandler={setAnotherLink} value={anotherLink} placeholder="Code de votre partenaire" />

          <Text style={styles.text}>{groupMessage.message}</Text>
          <Text style={styles.text}>{linkMessage.message}</Text>

          <Button style={styles.button} size={GlobalStyles.buttons.xl} onPress={handleClick}>
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
  text: {
    color: GlobalStyles.colors.text,
    fontSize: GlobalStyles.fontsSize.text,
    marginBottom: 10,
  },
  button: {},
  image: {
    position: "absolute",
    bottom: 0,
    zIndex: -1,
    width: "100%",
    height: "50%",
  },
});
export default LinkTogetherScreen;
