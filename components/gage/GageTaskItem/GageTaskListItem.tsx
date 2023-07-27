import { Text, StyleSheet, Pressable, View, Image } from "react-native";
import { GlobalStyles } from "../../../constants/style";
import { useDispatch, useSelector } from "react-redux";
import { setGageTaskId, setTheGageBeforeSendingDatabase } from "../../../store/slices/gagesSlice";
import { GageTaskItemProps } from "./GageTaskListItemProps.types";
import { RootState } from "../../../store/store";
import { PointsLabel } from "../../index";

const GageTaskListItem = ({ children, isSelected, ...props }: GageTaskItemProps) => {
  const { id, category, cost, description, title } = props;

  const { user } = useSelector((state: RootState) => state.user);

  const dispatch = useDispatch();

  const priceIsToHigh = () => user?.points < cost;

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
    <Pressable
      onPress={priceIsToHigh() ? () => {} : handlePress}
      style={[priceIsToHigh() ? styles.disabledBackground : styles.container, isSelected ? styles.isSelected : {}]}
    >
      <View style={styles.content}>
        <Text style={[styles.title, isSelected ? styles.isSelectedText : {}]}>{title}</Text>
        <Text style={[styles.description, isSelected ? styles.isSelectedText : {}]}>{description}</Text>
        {user?.points < cost ? (
          <Text style={styles.disabledLabel}>
            Il vous manque {cost - user?.points} <PointsLabel /> pour ce gage.
          </Text>
        ) : (
          ""
        )}
      </View>
      <View style={styles.cost}>
        <Text style={[styles.costText, isSelected ? styles.isSelectedText : {}]}>{cost}</Text>
        <PointsLabel />
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    minHeight: 140,
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
    minHeight: 140,
  },
  title: {
    fontSize: GlobalStyles.fontsSize.text,
    color: GlobalStyles.colors.text,
    fontWeight: "bold",
    marginBottom: 5,
  },
  description: {
    fontSize: GlobalStyles.fontsSize.text,
    color: GlobalStyles.colors.text,
  },
  cost: {
    flexDirection: "row",
    alignItems: "center",
  },
  costText: {
    fontSize: GlobalStyles.fontsSize.text,
    color: GlobalStyles.colors.primary,
    fontWeight: "900",
    marginEnd: 5,
  },
  disabledLabel: {
    marginTop: 10,
    fontSize: 13,
    color: "#e84a5f",
  },
  disabledBackground: {
    flexDirection: "row",
    minHeight: 120,
    padding: 10,
    backgroundColor: "#2a363b",
    width: "100%",
    marginBottom: 10,
    borderRadius: 20,
  },
});

export default GageTaskListItem;
