import { StyleSheet } from "react-native";
import GageTaskListItem from "../GageTaskItem/GageTaskListItem";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { Gage } from "../../../types/Gage";
import { ScrollView } from "react-native-gesture-handler";

const ListGagesTasks = () => {
  const { gagesTaskFiltered, gageTaskId } = useSelector((state: RootState) => state.gages);

  return (
    <ScrollView style={styles.wrapper}>
      {gagesTaskFiltered.map((item: Gage) => {
        return (
          <GageTaskListItem isSelected={!gageTaskId ? false : true && item.id === gageTaskId} key={item.id} {...item}>
            {item.title}
          </GageTaskListItem>
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
export default ListGagesTasks;
