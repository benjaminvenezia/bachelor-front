import { View, Text, StyleSheet } from "react-native";
import { Button, CustomCalendar, Title } from "../../components";
import ROUTES from "../../constants/routes";
import { GlobalStyles } from "../../constants/style";
import { setDate } from "../../store/slices/gagesSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";

const GageSelectDateScreen = ({ navigation }: any) => {
  const dispatch = useDispatch();

  const { gageDay, gageMonth, gageYear, gageDateString } = useSelector((state: RootState) => state.gages);

  const running = { key: "running", color: "blue" };
  const cycling = { key: "cycling", color: "green" };
  const walking = { key: "walking", color: "orange" };
  const marked = {
    dateString: {
      dots: [running, walking],
    },
    "2023-03-02": {
      dots: [running, walking, cycling],
    },
  };

  const setTheCalendarGagePart = (data: any) => {
    dispatch(setDate({ day: data.day, month: data.month, year: data.year, date_string: data.dateString }));
  };

  const handlePress = () => {
    navigation.navigate(ROUTES.VALIDATE_GAGE);
  };

  return (
    <View>
      <View>
        <Title titleType="h2" style={styles.text}>
          Choississez une date :
        </Title>

        <CustomCalendar
          markingType="multi-dot"
          markedDates={marked}
          onDayPress={(day: string) => setTheCalendarGagePart(day)}
          onDayLongPress={(day: string) => console.log("onDayLongPress", day)}
          onMonthChange={(date: string) => console.log("onMonthChange", date)}
          onPressArrowLeft={(goToPreviousMonth: any) => {
            goToPreviousMonth();
          }}
          onPressArrowRight={(goToNextMonth: any) => {
            goToNextMonth();
          }}
          style={{
            borderRadius: 5,
            marginVertical: 10,
            elevation: 5,
            borderWidth: 4,
            borderColor: "rgba(189, 189, 189, 0.1)",
          }}
          theme={{
            "stylesheet.calendar.header": {
              dayTextAtIndex0: {
                color: "white",
              },
              dayTextAtIndex1: {
                color: "white",
              },
              dayTextAtIndex2: {
                color: "white",
              },
              dayTextAtIndex3: {
                color: "white",
              },
              dayTextAtIndex4: {
                color: "white",
              },
              dayTextAtIndex5: {
                color: "white",
              },
              dayTextAtIndex6: {
                color: "white",
              },
            },
            calendarBackground: "#111111",
            dayTextColor: "#fff",
            textDisabledColor: "#444",
            monthTextColor: "#888888",
          }}
        />
      </View>

      <View style={styles.buttonContainer}>
        <Button onPress={() => navigation.goBack()}>Retour</Button>

        {gageDay ? (
          <Button onPress={handlePress}>Suivant</Button>
        ) : (
          <Button alternativeStyle onPress={() => {}}>
            Choisir
          </Button>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: "flex-end",
  },
  text: {
    fontSize: GlobalStyles.fontsSize.text,
    color: GlobalStyles.colors.text,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    paddingBottom: 10,
  },
});
export default GageSelectDateScreen;
