import axios from "axios";

const url = "https://covid19.mathdro.id/api";

export const fetchData = async (country = null) => {
  let dynamicUrl = url;
  if (country) {
    dynamicUrl = `${url}/countries/${country}`;
  }
  try {
    const {
      data: { confirmed, recovered, deaths, lastUpdate },
    } = await axios.get(dynamicUrl);
    const modifiedData = { confirmed, recovered, deaths, lastUpdate };

    return modifiedData;
  } catch (err) {
    console.log(err);
  }
};

export const fetchDailyData = async () => {
  try {
    const { data } = await axios.get(`${url}/daily`);
    const modifiedData = data.map(({ confirmed, deaths, reportDate }) => ({
      confirmed: confirmed.total,
      deaths: deaths.total,
      date: reportDate,
    }));

    return modifiedData;
  } catch (err) {
    console.log(err);
  }
};

export const fetchCountries = async () => {
  try {
    const {
      data: { countries },
    } = await axios.get(`${url}/countries`);

    return countries.map((country) => country.name);
  } catch (err) {
    console.log(err);
  }
};
