import _ from "lodash";
import countries from "../Data/countries.json";

export function getAllCountryNameByKey(dataSource, key) {
  return _.map(dataSource, key);
}

export function getISO(country) {
  const found = _.find(countries, ["name", country]);
  return found.alpha3Code;
}

export function keysToCamel(obj) {
  if (isObject(obj)) {
    const n = {};

    Object.keys(obj).forEach((k) => {
      n[toCamel(k)] = keysToCamel(obj[k]);
    });

    return n;
  } else if (Array.isArray(obj)) {
    return obj.map((i) => {
      return keysToCamel(i);
    });
  }

  return obj;
}

function toCamel(str) {
  return _.camelCase(str);
}

const isObject = function (obj) {
  return (
    obj === Object(obj) && !Array.isArray(obj) && typeof obj !== "function"
  );
};

export function monthToString(month) {
  return monthToStringMap["short"][month];
}

export function formatDate(date) {
  return `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
}

const monthToStringMap = {
  short: [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ],
};

export function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
