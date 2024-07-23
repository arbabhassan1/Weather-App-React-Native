import axios from "axios";
import { apiKey } from "../constants/index";
// const API_KEY = "6160ec9788d74c1bac2151246231009";
const forecastEndpoint = (params) =>
  `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${params.cityName}&days=${params.days}&aqi=no&alerts=no`;

const locationEndpoint = (params) =>
  `https://api.weatherapi.com/v1/search.json?key=${apiKey}&q=${params.cityName}`;

const apiCall = async (endpoint) => {
  const options = {
    method: "GET",
    url: endpoint,
    headers: {
      "Content-Type": "application/json",
    },
  };

  try {
    const response = await axios.request(options);
    return response.data;
  } catch (error) {
    console.log("error", error);
  }
};

export const fetchForecast = (params) => {
  return apiCall(forecastEndpoint(params));
};

export const fetchLocations = (params) => {
  //   console.log(apiKey);
  //   console.log(locationEndpoint(params));
  return apiCall(locationEndpoint(params));
};
