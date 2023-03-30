import { Text, StyleSheet, Pressable } from "react-native";
import { GlobalStyles } from "../../../constants/style";
import { useDispatch } from "react-redux";
import { setTheGageBeforeSendingDatabase } from "../../../store/slices/gagesSlice";
import { GageTaskDropdownItemProps } from "./GageTaskDropdownItemProps.types";

const GageTaskDropdownItem = ({ children, ...props }: GageTaskDropdownItemProps) => {
  const { category, cost, description, title } = props;
  const dispatch = useDispatch();

  const handlePress = () => {
    const gageToSendToStore = {
      category,
      cost,
      description,
      title,
    };

    dispatch(setTheGageBeforeSendingDatabase(gageToSendToStore));
  };

  return (
    <Pressable onPress={handlePress} style={styles.wrapper}>
      <Text style={styles.text}>{children}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    borderWidth: 2,
    borderColor: "white",
    alignItems: "center",
    justifyContent: "center",
    padding: 5,
    marginBottom: 10,
    borderRadius: 100,
    width: "50%",
  },
  text: {
    fontSize: GlobalStyles.fontsSize.text,
    color: GlobalStyles.colors.text,
  },
});
export default GageTaskDropdownItem;
