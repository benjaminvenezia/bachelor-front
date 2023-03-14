import { KeyboardTypeOptions, StyleSheet } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { GlobalStyles } from "../../constants/style";

type Props = {
  style?: object;
  onChangeHandler: any;
  value: any;
  placeholder?: string;
  keyboard?: KeyboardTypeOptions | undefined;
  shadow?: boolean;
};

const Input = ({ style, onChangeHandler, value, placeholder, keyboard, shadow = false }: Props) => {
  const shadowStyle = {
    textShadowColor: "rgba(0, 0, 0, 0.2)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 1,

    elevation: 5,
    shadowColor: "rgba(0, 0, 0, 1)",
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 5,
    shadowOpacity: 1,
  };

  return (
    <TextInput
      style={[styles.input, style, shadow ? shadowStyle : null]}
      onChangeText={onChangeHandler}
      value={value}
      placeholder={placeholder}
      placeholderTextColor="white"
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
    fontFamily: GlobalStyles.police.task,
  },
});

export default Input;
