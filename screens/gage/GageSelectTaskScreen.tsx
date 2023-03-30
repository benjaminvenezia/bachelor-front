import { View, Text } from "react-native";
import { Button } from "../../components";
import ROUTES from "../../constants/routes";

const GageSelectTaskScreen = ({ navigation }: any) => {
  return (
    <View>
      <Button onPress={() => navigation.navigate(ROUTES.SELECT_DATE)}>date</Button>
      <Button onPress={() => navigation.goBack()}>Retour</Button>
    </View>
  );
};
export default GageSelectTaskScreen;
