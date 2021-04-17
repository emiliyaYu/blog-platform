import { DateTime } from "luxon";

const convertDate = (date) => DateTime.fromISO(date, { locale: "en" });
export default convertDate;