export const columns = [
  {
    title: "Country",
    dataIndex: "location",
    key: "location",
    width: "7.25%",
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
    width: "6.25%",
  },
  {
    title: "Last Updated Date",
    dataIndex: "lastUpdatedDate",
    key: "lastUpdatedDate",
    width: "7.25%",
  },
  {
    title: "New Cases",
    dataIndex: "newCases",
    key: "newCases",
    sorter: {
      compare: (a, b) =>
        parseInt(a.newCases.replaceAll(",", "")) -
        parseInt(b.newCases.replaceAll(",", "")),
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
    width: "6.25%",
  },
  {
    title: "New Deaths",
    dataIndex: "newDeaths",
    key: "newDeaths",
    sorter: {
      compare: (a, b) =>
        parseInt(a.newDeaths.replaceAll(",", "")) -
        parseInt(b.newDeaths.replaceAll(",", "")),
    },
    width: "5.25%",
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
    width: "6.25%",
  },
  {
    title: "Total Cases per Million",
    dataIndex: "totalCasesPerMillion",
    key: "totalCasesPerMillion",
    sorter: {
      compare: (a, b) =>
        parseInt(a.totalCasesPerMillion.replaceAll(",", "")) -
        parseInt(b.totalCasesPerMillion.replaceAll(",", "")),
    },
    width: "6.25%",
  },
  {
    title: "Total Deaths per Million",
    dataIndex: "totalDeathsPerMillion",
    key: "totalDeathsPerMillion",
    sorter: {
      compare: (a, b) =>
        parseInt(a.totalDeathsPerMillion.replaceAll(",", "")) -
        parseInt(b.totalDeathsPerMillion.replaceAll(",", "")),
    },
    width: "6.25%",
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
    width: "6.25%",
  },
  {
    title: "Total Tests per Thousand",
    dataIndex: "totalTestsPerThousand",
    key: "totalTestsPerThousand",
    sorter: {
      compare: (a, b) =>
        parseInt(a.totalTestsPerThousand.replaceAll(",", "")) -
        parseInt(b.totalTestsPerThousand.replaceAll(",", "")),
    },
    width: "6.25%",
  },
  {
    title: "Tests Per Case",
    dataIndex: "testsPerCase",
    key: "testsPerCase",
    sorter: {
      compare: (a, b) =>
        parseInt(a.testsPerCase.replaceAll(",", "")) -
        parseInt(b.testsPerCase.replaceAll(",", "")),
    },
    width: "6.25%",
  },
  {
    title: "Total Vaccinations",
    dataIndex: "totalVaccinations",
    key: "totalVaccinations",
    sorter: {
      compare: (a, b) =>
        parseInt(a.totalVaccinations.replaceAll(",", "")) -
        parseInt(b.totalVaccinations.replaceAll(",", "")),
    },
    width: "6.25%",
  },
  {
    title: "People Vaccinated",
    dataIndex: "peopleVaccinated",
    key: "peopleVaccinated",
    sorter: {
      compare: (a, b) =>
        parseInt(a.peopleVaccinated.replaceAll(",", "")) -
        parseInt(b.peopleVaccinated.replaceAll(",", "")),
    },
    width: "6.25%",
  },
  {
    title: "People Fully Vaccinated",
    dataIndex: "peopleFullyVaccinated",
    key: "peopleFullyVaccinated",
    sorter: {
      compare: (a, b) =>
        parseInt(a.peopleFullyVaccinated.replaceAll(",", "")) -
        parseInt(b.peopleFullyVaccinated.replaceAll(",", "")),
    },
    width: "6.25%",
  },
];
