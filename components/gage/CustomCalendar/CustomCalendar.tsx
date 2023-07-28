import React, { useMemo, useState } from "react";
import { Calendar, LocaleConfig } from "react-native-calendars";
import { useDispatch } from "react-redux";
import { setDate } from "../../../store/slices/gagesSlice";

const CustomCalendar = (props: any) => {
  const date = new Date();
  const [month, day, year] = [String(date.getMonth() + 1).padStart(2, "0"), String(date.getDate()).padStart(2, "0"), date.getFullYear()];
  const maxDate = new Date().setMonth(date.getMonth() + 2);
  const initDate = `${year}-${month}-${day}`;
  const [selected, setSelected]: any = useState(initDate);

  const dispatch = useDispatch();

  const setTheCalendarGagePart = (data: any) => {
    dispatch(setDate({ day: data.day, month: data.month, year: data.year, date_string: data.dateString }));
  };

  LocaleConfig.locales["fr"] = {
    monthNames: ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"],
    monthNamesShort: ["Janv.", "Févr.", "Mars", "Avril", "Mai", "Juin", "Juil.", "Août", "Sept.", "Oct.", "Nov.", "Déc."],
    dayNames: ["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"],
    dayNamesShort: ["Dim.", "Lun.", "Mar.", "Mer.", "Jeu.", "Ven.", "Sam."],
    today: "Aujourd'hui",
  };

  LocaleConfig.defaultLocale = "fr";

  return (
    <Calendar
      minDate={new Date(date).toDateString()}
      maxDate={new Date(maxDate).toDateString()}
      disableAllTouchEventsForDisabledDays={true}
      firstDay={1}
      initialDate={initDate}
      markedDates={{
        [selected]: { selected: true, disableTouchEvent: true, selectedDotColor: "orange" },

        "2023-07-01": { selected: false, marked: true, selectedColor: "blue" },
      }}
      onDayPress={(day) => {
        setTheCalendarGagePart(day);

        setSelected(day.dateString);
        props.onDaySelect && props.onDaySelect(day);
      }}
      {...props}
    />
  );
};
export default CustomCalendar;
