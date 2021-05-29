import _ from "lodash";

export const getAllCountryName = (data) => _.map(data, "name");
