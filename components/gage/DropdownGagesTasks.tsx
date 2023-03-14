import { View, StyleSheet } from "react-native";
import GageTaskItem from "./GageTaskItem";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { GlobalStyles } from "../../constants/style";
import { Gage } from "../../store/slices/gagesSlice";

const DropdownGagesTasks = () => {
  const gagesStore = useSelector((state: RootState) => state.gages);

  return (
    <View style={styles.wrapper}>
      {gagesStore.gagesTaskFiltered.map((item: Gage, index: any) => {
        return (
          <GageTaskItem key={item.id} {...item}>
            {item.title}
          </GageTaskItem>
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
