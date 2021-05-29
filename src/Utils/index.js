import _ from "lodash";
import countries from "../Data/countries.json";

export function getAllCountryName() {
  return _.map(countries, "name");
}

export function getISO(country) {
  const found = _.find(countries, ["name", country]);
  return found.alpha3Code;
}

export function toCamel(obj) {
  return _.mapKeys(obj, (v, k) => _.camelCase(k));
}
