import { View, StyleSheet } from "react-native";
import GageTaskDropdownItem from "../GageTaskDropdownItem/GageTaskDropdownItem";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { Gage } from "../../../types/Gage";
import { ScrollView } from "react-native-gesture-handler";

const DropdownGagesTasks = () => {
  const { gagesTaskFiltered } = useSelector((state: RootState) => state.gages);

  return (
    <ScrollView style={styles.wrapper}>
      {gagesTaskFiltered.map((item: Gage) => {
        return (
          <GageTaskDropdownItem key={item.id} {...item}>
            {item.title}
          </GageTaskDropdownItem>
        );
      })}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    paddingVertical: 10,
    display: "flex",
    flexDirection: "column",
  },
});
export default DropdownGagesTasks;
