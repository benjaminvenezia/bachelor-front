import { Pressable, Text } from "react-native";

type DayProps = {
  children: any;
};

const Day = ({ children }: DayProps) => {
  return (
    <Pressable onPress={() => alert(1)}>
      <Text>{children}</Text>
    </Pressable>
  );
};

export default Day;
