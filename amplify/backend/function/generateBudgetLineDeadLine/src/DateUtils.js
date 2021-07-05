"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Frequency = void 0;
var Frequency;
(function (Frequency) {
    Frequency["monthly"] = "monthly";
    Frequency["fortnightly"] = "fortnightly";
    Frequency["quarterly"] = "quarterly";
    Frequency["annual"] = "annual";
})(Frequency = exports.Frequency || (exports.Frequency = {}));
const parseToDateObj = (date) => {
    const dateObj = date ? new Date(date) : new Date();
    return dateObj;
};
const addMonths = (date, nbmonths) => {
    const dateObj = parseToDateObj(date);
    const d = dateObj.getDate();
    dateObj.setMonth(dateObj.getMonth() + nbmonths);
    if (dateObj.getDate() !== d) {
        dateObj.setDate(0);
    }
    return dateObj.toISOString().substr(0, 10);
};
const frequencyToMonths = (frequence) => {
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
const daysInMonth = (month, year) => new Date(year, month + 1, 0).getDate();
const lastDayOfMonthDate = (date) => {
    const returnDate = new Date(date.getTime());
    returnDate.setMonth(returnDate.getMonth() + 1);
    returnDate.setDate(0);
    returnDate.setHours(23, 59, 59);
    return returnDate;
};
exports.default = {
    parseToDateObj,
    addMonths,
    frequencyToMonths,
    daysInMonth,
    lastDayOfMonthDate,
};
