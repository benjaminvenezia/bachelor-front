import { KeyboardTypeOptions, StyleSheet } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { GlobalStyles } from "../../constants/style";

type Props = {
  style?: object;
  onChangeHandler: any;
  value: any;
  placeholder?: string;
  keyboard?: KeyboardTypeOptions | undefined;
};

const Input = ({ style, onChangeHandler, value, placeholder, keyboard }: Props) => {
  return (
    <TextInput
      style={[styles.input, style]}
      onChangeText={onChangeHandler}
      value={value}
      placeholder={placeholder}
      keyboardType={keyboard}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    height: 50,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: GlobalStyles.colors.muted,
    padding: 10,
    fontSize: 20,
    borderRadius: 5,
  },
});

export default Input;
