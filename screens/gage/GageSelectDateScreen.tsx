import { View, Text } from "react-native";
import { Button } from "../../components";
import ROUTES from "../../constants/routes";

const GageSelectDateScreen = ({ navigation }: any) => {
  return (
    <View>
      <Text>GageSelectDateScreen</Text>
      <View>
        <Button onPress={() => navigation.navigate(ROUTES.VALIDATE_GAGE)}>validation</Button>
        <Button onPress={() => navigation.goBack()}>Retour</Button>
      </View>
    </View>
  );
};
export default GageSelectDateScreen;
