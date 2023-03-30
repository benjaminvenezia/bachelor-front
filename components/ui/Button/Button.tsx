import { GestureResponderEvent, Linking } from "react-native";
import { Text, Pressable, View, StyleSheet } from "react-native";
import { GlobalStyles } from "../../../constants/style";
import { ButtonProps } from "./ButtonProps.types";

const Button = ({ children, style, size = GlobalStyles.buttons.md, alternativeStyle, onPress }: ButtonProps) => {
  let dynamicSize = null;

  switch (size) {
    case GlobalStyles.buttons.xl:
      dynamicSize = styles.xl;
      break;
    case GlobalStyles.buttons.lg:
      dynamicSize = styles.lg;
      break;
    case GlobalStyles.buttons.md:
      dynamicSize = styles.lg;
      break;
    default:
      dynamicSize = styles.lg;
      break;
  }

  return (
    <Pressable style={style} onPress={onPress}>
      <View style={[styles.button, alternativeStyle ? styles.alternativeStyle : styles.defaultStyle, dynamicSize]}>
        <Text style={styles.text}>{children}</Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    justifyContent: "center",
    alignItems: "center",
  },
  defaultStyle: {
    backgroundColor: GlobalStyles.colors.primary,
    color: GlobalStyles.colors.secondary,
    borderRadius: 10,
  },
  alternativeStyle: {
    backgroundColor: "lightgrey",
    color: GlobalStyles.colors.primary,
    borderRadius: 10,
  },
  text: {
    fontWeight: "bold",
    fontSize: 15,
    color: "#1E1E1E",
  },
  xl: { width: 230, height: 60, paddingVertical: 10, paddingHorizontal: 25 },
  lg: { width: 120, height: 45, paddingVertical: 8, paddingHorizontal: 20 },
  md: { width: 80, height: 20, paddingVertical: 5, paddingHorizontal: 15 },
  sm: { width: 60, height: 10, paddingVertical: 5, paddingHorizontal: 15 },
  xs: { width: 40, height: 5, paddingVertical: 5, paddingHorizontal: 15 },
});

export default Button;
