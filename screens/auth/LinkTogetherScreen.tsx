import { View, Text, StyleSheet, SafeAreaView, ImageBackground } from "react-native";
import { Button } from "../../components";
import { Title, Input } from "../../components";
import { GlobalStyles } from "../../constants/style";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { setGroupInDatabase, getGroupFromDatabase } from "../../store/slices/groupSlice";
import { getPartnerByCode } from "../../store/slices/userSlice";
import ROUTES from "../../constants/routes";
import { getValueFor } from "../../utils/secureStore";

const LinkTogetherScreen = ({ navigation }: any) => {
  const { user, idPartner } = useSelector((state: RootState) => state.user);
  const [anotherLink, setAnotherLink] = useState("");
  // const [anotherId, setAnotherId] = useState(-1);
  const [groupMessage, setGroupMessage]: any = useState("");
  const [linkMessage, setLinkMessage]: any = useState("");

  const dispatch = useDispatch();

  //On récupère l'id de l'autre utilisateur pour set le groupe dans la database
  const handleClick = () => {
    dispatch(getPartnerByCode(anotherLink));
    dispatch(setGroupInDatabase(idPartner));
    dispatch(getGroupFromDatabase());
  };

  useEffect(() => {
    if (groupMessage["code"] === 200) {
      navigation.navigate(ROUTES.HOME);
    }
  }, [groupMessage]);

  const getTheToken = async () => {
    const tokendudus = await getValueFor("token");
    return tokendudus;
  };

  return (
    <SafeAreaView style={styles.wrapper}>
      <ImageBackground style={styles.image} source={require("../../assets/images/man-looking-binoculars.png")} />

      <View style={styles.container}>
        <Title titleType="h1" style={styles.title}>
          Lien avec votre partenaire
        </Title>

        <Button onPress={() => {}}>Voir</Button>

        <View style={styles.inputsContainer}>
          <Text style={styles.text}>Mon code d'invitation : </Text>
          <Title titleType="h1">{user.personal_code}</Title>

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
