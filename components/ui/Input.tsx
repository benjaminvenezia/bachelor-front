import { KeyboardTypeOptions, StyleSheet } from "react-native";
import { TextInput } from "react-native-gesture-handler";

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
    height: 60,
    marginBottom: 20,
    borderWidth: 2,
    borderColor: "white",
    padding: 10,
    fontSize: 20,
    fontWeight: "bold",
    borderRadius: 50,
    color: "white",

    textShadowColor: "rgba(0, 0, 0, 0.2)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 1,

    elevation: 5,
    shadowColor: "rgba(0, 0, 0, 1)",
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 5,
    shadowOpacity: 1,
  },
});

export default Input;
