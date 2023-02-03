import { StyleSheet, Text } from "react-native";
import { GlobalStyles } from "../../constants/style";

type Props = {
  children: string;
};

const Title = ({ children }: Props) => {
  return <Text style={styles.title}>{children}</Text>;
};

const styles = StyleSheet.create({
  title: {
    fontWeight: "bold",
    fontSize: GlobalStyles.fonts.h1,
    marginBottom: 10,
  },
});

export default Title;
