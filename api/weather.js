import axios from "axios";
import { API_KEY } from "../constants/index";

const forecastEndpoint = (params) =>
  `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${params.cityName}&days=${params.days}&aqi=no&alerts=no`;

const locationEndpoint = (params) =>
  `https://api.weatherapi.com/v1/search.json?key=${API_KEY}&q=${params.cityName}`;

const apiCall = async (endpoint) => {
  const options = {
    method: "GET",
    url: endpoint,
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
  return apiCall(locationEndpoint(params));
};
