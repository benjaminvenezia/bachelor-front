import { View, Text, StyleSheet } from "react-native";
import { Button, Title } from "../../components";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { GlobalStyles } from "../../constants/style";
import ROUTES from "../../constants/routes";
import { logoutUser } from "../../store/slices/userSlice";

const UserScreen = ({ navigation }: any) => {
  let { user } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();

  const logout = () => {
    dispatch(logoutUser(1));
    navigation.navigate(ROUTES.REGISTER);
  };

  return (
    <View>
      <Title titleType="h1">Mon compte</Title>
      <Text style={styles.text}>Mon email : {user?.email}</Text>

      <View style={styles.rowContainer}>
        <Text style={styles.text}>Mon nom : {user?.name}</Text>
        <Text style={[styles.text, styles.icon]}>Icone de modif</Text>
      </View>

      <Button onPress={() => logout()} size="XL">
        Déconnexion
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    color: GlobalStyles.colors.text,
  },
  icon: {
    marginStart: 20,
  },
  rowContainer: {
    display: "flex",
    flexDirection: "row",
  },
});

export default UserScreen;
