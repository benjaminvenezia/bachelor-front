import { View, Text, Pressable, StyleSheet } from "react-native";
import { useState } from "react";

type Props = {
  label: string;
};

const DaySelector = ({ label }: Props) => {
  const [isSelected, setIsSelected] = useState(false);

  return (
    <Pressable onPress={() => setIsSelected(!isSelected)} style={[styles.container, isSelected ? styles.isSelectedItem : null]}>
      <View>
        <Text style={isSelected ? styles.isSelectedText : null}>{label}</Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 40,
    paddingVertical: 15,
    backgroundColor: "lightblue",
    marginVertical: 5,
    marginHorizontal: 3,
    borderRadius: 5,
  },
  isSelectedItem: {
    backgroundColor: "purple",
  },
  isSelectedText: {
    color: "white",
  },
});

export default DaySelector;
