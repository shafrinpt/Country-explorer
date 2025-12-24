import axios from "axios";

export const countriesApi = axios.create({
  baseURL: "https://restcountries.com/v3.1",
  timeout: 10000, // ⏱️ 10 seconds
});

export const weatherApi = axios.create({
  baseURL: "https://api.openweathermap.org/data/2.5",
  timeout: 10000,
});
