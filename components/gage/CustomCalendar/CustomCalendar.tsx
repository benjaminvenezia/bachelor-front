import React, { useState, useMemo } from "react";
import { Calendar } from "react-native-calendars";

const CustomCalendar = (props: any) => {
  const [selected, setSelected]: any = useState();
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
      minDate={new Date().toDateString()}
      disableAllTouchEventsForDisabledDays={true}
      firstDay={1}
      markedDates={marked}
      {...props}
    />
  );
};
export default CustomCalendar;
