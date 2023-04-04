import { Text, StyleSheet, Pressable, View, Image } from "react-native";
import { GlobalStyles } from "../../../constants/style";
import { useDispatch } from "react-redux";
import { setGageTaskId, setTheGageBeforeSendingDatabase } from "../../../store/slices/gagesSlice";
import { GageTaskDropdownItemProps } from "./GageTaskDropdownItemProps.types";

const GageTaskDropdownItem = ({ children, isSelected, ...props }: GageTaskDropdownItemProps) => {
  const { id, category, cost, description, title } = props;

  const dispatch = useDispatch();

  const handlePress = () => {
    const gageToSendToStore = {
      category,
      cost,
      description,
      title,
    };

    dispatch(setGageTaskId({ gageTaskId: id }));
    dispatch(setTheGageBeforeSendingDatabase(gageToSendToStore));
  };

  return (
    <Pressable onPress={handlePress} style={[styles.wrapper, isSelected ? styles.isSelected : {}]}>
      <View style={styles.content}>
        <Text style={[styles.title, isSelected ? styles.isSelectedText : {}]}>{title}</Text>
        <Text style={[styles.description, isSelected ? styles.isSelectedText : {}]}>{description}</Text>
      </View>
      <View style={styles.cost}>
        <Text style={[styles.costText, isSelected ? styles.isSelectedText : {}]}>{cost}</Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: "row",
    minHeight: 120,
    padding: 10,
    backgroundColor: "gray",
    width: "100%",
    marginBottom: 10,
    borderRadius: 20,
  },
  category: {
    backgroundColor: GlobalStyles.colors.secondary,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
    marginRight: 10,
  },
  isSelected: {
    backgroundColor: GlobalStyles.colors.primary,
  },
  isSelectedText: {
    color: "black",
  },
  content: {
    flex: 1,
    justifyContent: "center",
  },
  title: {
    fontSize: GlobalStyles.fontsSize.text,
    fontWeight: "bold",
    marginBottom: 5,
  },
  description: {
    fontSize: GlobalStyles.fontsSize.text,
    color: GlobalStyles.colors.text,
  },
  cost: {
    justifyContent: "center",
  },
  costText: {
    fontSize: GlobalStyles.fontsSize.text,
    color: GlobalStyles.colors.primary,
    fontWeight: "900",
  },
});

export default GageTaskDropdownItem;
