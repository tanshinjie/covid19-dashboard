export const columns = [
  {
    title: "Country",
    dataIndex: "country",
    key: "country",
    width: "6.25%",
  },
  {
    title: "Population",
    dataIndex: "population",
    key: "population",
    sorter: {
      compare: (a, b) =>
        parseInt(a.population.replaceAll(",", "")) -
        parseInt(b.population.replaceAll(",", "")),
    },
    width: "8.25%",
  },
  {
    title: "Total Tests",
    dataIndex: "totalTests",
    key: "totalTests",
    sorter: {
      compare: (a, b) =>
        parseInt(a.totalTests.replaceAll(",", "")) -
        parseInt(b.totalTests.replaceAll(",", "")),
    },
    width: "7.25%",
  },
  {
    title: "Infection Risk",
    dataIndex: "infectionRisk",
    key: "infectionRisk",
    sorter: {
      compare: (a, b) =>
        parseInt(a.infectionRisk.replaceAll(",", "")) -
        parseInt(b.infectionRisk.replaceAll(",", "")),
    },
    width: "5.25%",
  },
  {
    title: "Case Fatality Rate",
    dataIndex: "caseFatalityRate",
    key: "caseFatalityRate",
    sorter: {
      compare: (a, b) =>
        parseInt(a.caseFatalityRate.replaceAll(",", "")) -
        parseInt(b.caseFatalityRate.replaceAll(",", "")),
    },
    width: "5.25%",
  },
  {
    title: "Test Percentage",
    dataIndex: "testPercentage",
    key: "testPercentage",
    sorter: {
      compare: (a, b) =>
        parseInt(a.testPercentage.replaceAll(",", "")) -
        parseInt(b.testPercentage.replaceAll(",", "")),
    },
    width: "5.25%",
  },
  {
    title: "Recovery Proportion",
    dataIndex: "recoveryProporation",
    key: "recoveryProporation",
    sorter: {
      compare: (a, b) =>
        parseInt(a.recoveryProporation.replaceAll(",", "")) -
        parseInt(b.recoveryProporation.replaceAll(",", "")),
    },
    width: "5.25%",
  },
  {
    title: "Total Cases",
    dataIndex: "totalCases",
    key: "totalCases",
    sorter: {
      compare: (a, b) =>
        parseInt(a.totalCases.replaceAll(",", "")) -
        parseInt(b.totalCases.replaceAll(",", "")),
    },
    width: "7.25%",
  },
  {
    title: "Total Deaths",
    dataIndex: "totalDeaths",
    key: "totalDeaths",
    sorter: {
      compare: (a, b) =>
        parseInt(a.totalDeaths.replaceAll(",", "")) -
        parseInt(b.totalDeaths.replaceAll(",", "")),
    },
    width: "7.25%",
  },
  {
    title: "Total Recovered",
    dataIndex: "totalRecovered",
    key: "totalRecovered",
    sorter: {
      compare: (a, b) =>
        parseInt(a.totalRecovered.replaceAll(",", "")) -
        parseInt(b.totalRecovered.replaceAll(",", "")),
    },
    width: "6.25%",
  },
  {
    title: "One Case Every X Ppl",
    dataIndex: "oneCaseeveryXPpl",
    key: "oneCaseeveryXPpl",
    sorter: {
      compare: (a, b) =>
        parseInt(a.oneCaseeveryXPpl.replaceAll(",", "")) -
        parseInt(b.oneCaseeveryXPpl.replaceAll(",", "")),
    },
    width: "5.25%",
  },
  {
    title: "One Death Every X Ppl",
    dataIndex: "oneDeatheveryXPpl",
    key: "oneDeatheveryXPpl",
    sorter: {
      compare: (a, b) =>
        parseInt(a.oneDeatheveryXPpl.replaceAll(",", "")) -
        parseInt(b.oneDeatheveryXPpl.replaceAll(",", "")),
    },
    width: "5.25%",
  },
  {
    title: "Deaths 1M Pop",
    dataIndex: "deaths1MPop",
    key: "deaths1MPop",
    sorter: {
      compare: (a, b) =>
        parseInt(a.deaths1MPop.replaceAll(",", "")) -
        parseInt(b.deaths1MPop.replaceAll(",", "")),
    },
    width: "5.25%",
  },
  {
    title: "Tests 1M Pop",
    dataIndex: "tests1MPop",
    key: "tests1MPop",
    sorter: {
      compare: (a, b) =>
        parseInt(a.tests1MPop.replaceAll(",", "")) -
        parseInt(b.tests1MPop.replaceAll(",", "")),
    },
    width: "7.25%",
  },
  {
    title: "Total Cases 1M Pop",
    dataIndex: "totCases1MPop",
    key: "totCases1MPop",
    sorter: {
      compare: (a, b) =>
        parseInt(a.totCases1MPop.replaceAll(",", "")) -
        parseInt(b.totCases1MPop.replaceAll(",", "")),
    },
    width: "7.25%",
  },
];
