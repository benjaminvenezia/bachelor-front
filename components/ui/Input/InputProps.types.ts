import { KeyboardTypeOptions } from "react-native";

export type InputProps = {
  style?: object;
  onChangeHandler: any;
  value: any;
  placeholder?: string;
  keyboard?: KeyboardTypeOptions | undefined;
  shadow?: boolean;
};
