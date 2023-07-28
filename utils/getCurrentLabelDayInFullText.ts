import getCurrentLabelDay from "./getCurrentLabelDay";
import DAYS from "../constants/days";

const getCurrentLabelDayInFullText = (dayAcronym: string): string => {
  let label: string = "";

  switch (dayAcronym) {
    case DAYS.SUNDAY:
      label = "Dimanche";
      break;
    case DAYS.MONDAY:
      label = "Lundi";
      break;
    case DAYS.TUESDAY:
      label = "Mardi";
      break;
    case DAYS.WEDNESDAY:
      label = "Mercredi";
      break;
    case DAYS.THURSDAY:
      label = "Jeudi";
      break;
    case DAYS.FRIDAY:
      label = "Vendredi";
      break;
    case DAYS.SATURDAY:
      label = "Samedi";
      break;
    default:
      break;
  }

  return label;
};

export default getCurrentLabelDayInFullText;
