import { GestureResponderEvent } from "react-native";

export type ButtonProps = {
  children: string;
  style?: object;
  size?: string;
  alternativeStyle?: boolean;
  onPress: (event: GestureResponderEvent) => void;
};
