import React, { useState, useMemo } from "react";
import { Calendar } from "react-native-calendars";

const CustomCalendar = (props: any) => {
  const [selected, setSelected]: any = useState();
  const marked = useMemo(
    () => ({
      [selected]: {
        selected: true,
        selectedColor: "#222222",
        selectedTextColor: "yellow",
      },
    }),
    [selected]
  );

  return <Calendar disableAllTouchEventsForDisabledDays={true} firstDay={1} markedDates={marked} {...props} />;
};
export default CustomCalendar;
