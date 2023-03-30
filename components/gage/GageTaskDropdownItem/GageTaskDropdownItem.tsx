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
      <Text style={styles.text}>{cost}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    padding: 5,
    backgroundColor: "purple",
    width: "100%",
    marginBottom: 5,
    minHeight: 60,
  },
  text: {
    fontSize: GlobalStyles.fontsSize.text,
    color: GlobalStyles.colors.text,
  },
});
export default GageTaskDropdownItem;
