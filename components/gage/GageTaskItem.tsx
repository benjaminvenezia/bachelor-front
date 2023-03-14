import { Text, StyleSheet, Pressable } from "react-native";
import { GlobalStyles } from "../../constants/style";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { Gage, setTheGageBeforeSendingDatabase } from "../../store/slices/gagesSlice";

const GageTaskItem = ({ children, ...props }: any) => {
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
    paddingVertical: 10,
    paddingHorizontal: 10,
    marginBottom: 10,
    borderRadius: 100,
    width: "50%",
  },
  text: {
    fontSize: GlobalStyles.fontsSize.text,
    color: GlobalStyles.colors.text,
  },
});
export default GageTaskItem;
