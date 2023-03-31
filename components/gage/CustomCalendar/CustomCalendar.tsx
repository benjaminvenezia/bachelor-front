import React, { useMemo, useState } from "react";
import { Calendar } from "react-native-calendars";

const CustomCalendar = (props: any) => {
  const currentDate = new Date();
  const maxDate = new Date().setMonth(currentDate.getMonth() + 2);

  const initDate = "2023-03-31";
  const [selected, setSelected]: any = useState(initDate);

  console.log(selected);

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
      minDate={new Date(currentDate).toDateString()}
      maxDate={new Date(maxDate).toDateString()}
      disableAllTouchEventsForDisabledDays={true}
      firstDay={1}
      initialDate={initDate}
      markedDates={marked}
      onDayPress={(day) => {
        console.log("bfbf");
        setSelected(day.dateString);
        props.onDaySelect && props.onDaySelect(day);
      }}
      {...props}
    />
  );
};
export default CustomCalendar;
