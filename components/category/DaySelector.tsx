import { View, Text, Pressable, StyleSheet } from "react-native";

type Props = {
  label: string;
};

const DaySelector = ({ label }: Props) => {
  return (
    <Pressable style={styles.container}>
      <View>
        <Text>{label}</Text>
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
});

export default DaySelector;
