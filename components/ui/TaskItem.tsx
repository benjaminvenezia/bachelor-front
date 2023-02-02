import { View, Text } from "react-native";

type TaskItemProps = {
  title: string;
  reward: number;
};

const TaskItem = ({ title, reward }: TaskItemProps) => {
  return (
    <View>
      <Text>{title}</Text>
      <Text>{reward}</Text>
    </View>
  );
};

export default TaskItem;
