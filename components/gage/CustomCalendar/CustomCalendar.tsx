import React, { useState, useMemo } from "react";
import { Calendar } from "react-native-calendars";

const CustomCalendar = (props: any) => {
  const [selected, setSelected]: any = useState();
  const currentDate = new Date();
  const maxDate = new Date().setMonth(currentDate.getMonth() + 3);

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
      markedDates={marked}
      {...props}
    />
  );
};
export default CustomCalendar;
