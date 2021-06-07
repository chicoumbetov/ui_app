import { Frequency } from '../src/API';

const parseToDateObj = (date: string) => {
  const dateObj = new Date(date);
  return dateObj;
};

const addMonths = (date:string, nbmonths: number) => {
  const dateObj = parseToDateObj(date);
  const d = dateObj.getDate();
  dateObj.setMonth(dateObj.getMonth() + nbmonths);
  if (dateObj.getDate() !== d) {
    dateObj.setDate(0);
  }
  return dateObj.toISOString().substr(0, 10);
};

const frequencyToMonths = (frequence: Frequency) => {
  switch (frequence) {
    case Frequency.annual:
      return 12;
    case Frequency.quarterly:
      return 3;
    case Frequency.monthly:
    default:
      return 1;
  }
};

export default {
  parseToDateObj,
  addMonths,
  frequencyToMonths,
};
