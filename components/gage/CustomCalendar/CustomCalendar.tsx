import React, { useMemo, useState } from "react";
import { Calendar } from "react-native-calendars";

const CustomCalendar = (props: any) => {
  const date = new Date();
  const [month, day, year] = [String(date.getMonth() + 1).padStart(2, "0"), String(date.getDate()).padStart(2, "0"), date.getFullYear()];
  const maxDate = new Date().setMonth(date.getMonth() + 2);
  const initDate = `${year}-${month}-${day}`;
  const [selected, setSelected]: any = useState(initDate);

  const marked = useMemo(
    () => ({
      [selected]: {
        selected: true,
        selectedColor: "#ff0000",
        selectedTextColor: "yellow",
      },
    }),
    [selected]
  );

  return (
    <Calendar
      minDate={new Date(date).toDateString()}
      maxDate={new Date(maxDate).toDateString()}
      disableAllTouchEventsForDisabledDays={true}
      firstDay={1}
      initialDate={initDate}
      markedDates={marked}
      onDayPress={(day) => {
        setSelected(day.dateString);
        props.onDaySelect && props.onDaySelect(day);
      }}
      {...props}
    />
  );
};
export default CustomCalendar;
