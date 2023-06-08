import DAYS from "../constants/days";

function getCurrentLabelDay() {
  const date = new Date();
  const day = date.getDay();
  let label = "";

  switch (day) {
    case 1:
      label = DAYS.MONDAY;
      break;
    case 2:
      label = DAYS.TUESDAY;
      break;
    case 3:
      label = DAYS.WEDNESDAY;
      break;
    case 4:
      label = DAYS.THURSDAY;
      break;
    case 5:
      label = DAYS.FRIDAY;
      break;
    case 6:
      label = DAYS.SATURDAY;
      break;
    case 7:
      label = DAYS.SUNDAY;
      break;

    default:
      break;
  }
  return label;
}

export default getCurrentLabelDay;
