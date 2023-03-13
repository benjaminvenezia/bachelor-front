import { StyleSheet, Text } from "react-native";
import { GlobalStyles } from "../../constants/style";

type Props = {
  children: any;
  titleType: string;
  style?: object;
};

const Title = ({ children, titleType = "h1", style }: Props) => {
  const stylesByType: any = {
    h1: {
      fontSize: GlobalStyles.fontsSize.h1,
      color: GlobalStyles.colors.h1,
      fontFamily: "Gatwick-Bold",
    },
    h2: {
      fontSize: GlobalStyles.fontsSize.h2,
      color: GlobalStyles.colors.h2,
    },
    h3: {
      fontSize: GlobalStyles.fontsSize.h3,
      color: GlobalStyles.colors.h3,
    },
    h4: {
      fontSize: GlobalStyles.fontsSize.h4,
      color: GlobalStyles.colors.h4,
    },
    h5: {
      fontSize: GlobalStyles.fontsSize.h5,
      color: GlobalStyles.colors.h5,
    },
    h6: {
      fontSize: GlobalStyles.fontsSize.h6,
      color: GlobalStyles.colors.h6,
    },
  };

  return <Text style={[styles.default, stylesByType[titleType], style]}>{children}</Text>;
};

const styles = StyleSheet.create({
  default: {
    marginBottom: 10,
    fontWeight: "bold",
  },
});

export default Title;
