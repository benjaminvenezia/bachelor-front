import { View, Text } from "react-native";
import { Button } from "../../components";
import ROUTES from "../../constants/routes";

const GageValidateGageScreen = ({ navigation }: any) => {
  return (
    <View>
      <Button onPress={() => navigation.goBack()}>Retour</Button>
      <Button onPress={() => navigation.navigate(ROUTES.HOME)}>Home</Button>
    </View>
  );
};
export default GageValidateGageScreen;
