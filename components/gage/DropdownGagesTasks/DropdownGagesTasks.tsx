import { View, StyleSheet } from "react-native";
import GageTaskDropdownItem from "../GageTaskDropdownItem/GageTaskDropdownItem";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { Gage } from "../../../types/Gage";
import { ScrollView } from "react-native-gesture-handler";
import { useState } from "react";

const DropdownGagesTasks = () => {
  const { gagesTaskFiltered } = useSelector((state: RootState) => state.gages);
  const [selectedGageTaskId, setSelectedGageTaskId] = useState(null);

  return (
    <ScrollView style={styles.wrapper}>
      {gagesTaskFiltered.map((item: Gage) => {
        return (
          <GageTaskDropdownItem
            key={item.id}
            isSelected={selectedGageTaskId === item.id ? true : false}
            handleSelect={setSelectedGageTaskId}
            {...item}
          >
            {item.title}
          </GageTaskDropdownItem>
        );
      })}

      {!selectedGageTaskId}
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
