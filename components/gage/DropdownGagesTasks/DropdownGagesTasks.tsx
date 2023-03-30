import { View, StyleSheet } from "react-native";
import GageTaskDropdownItem from "../GageTaskDropdownItem/GageTaskDropdownItem";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { Gage } from "../../../types/Gage";

const DropdownGagesTasks = () => {
  const { gagesTaskFiltered } = useSelector((state: RootState) => state.gages);

  return (
    <View style={styles.wrapper}>
      {gagesTaskFiltered.map((item: Gage) => {
        return (
          <GageTaskDropdownItem key={item.id} {...item}>
            {item.title}
          </GageTaskDropdownItem>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    paddingVertical: 10,
    display: "flex",
    flexDirection: "row",
  },
});
export default DropdownGagesTasks;
