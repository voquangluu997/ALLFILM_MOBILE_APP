// api/axiosClient.js
import axios from "axios";
import queryString from "query-string";
import { getToken } from "../utils/common";
import { API_URL } from "@env";

let config = getToken()
  ? {
      "content-type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers":
        "Origin, X-Requested-With, Content-Type, Accept, Authorization",
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS, DELETE, PATCH",

      Authorization: `Bearer ${getToken()}`,
    }
  : {
      "content-type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers":
        "Origin, X-Requested-With, Content-Type, Accept, Authorization",
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS, DELETE, PATCH",
      allowCredentials: "true",
    };

// });
// Set up default config for http requests here
// Please have a look at here `https://github.com/axios/axios#requestconfig` for the full list of configs
const axiosClient = axios.create({
  baseURL: API_URL,
  headers: config,

  paramsSerializer: (params) => {
    return typeof params == "object" ? queryString.stringify(params) : params;
  },
});

axiosClient.interceptors.request.use(async (config) => {
  const token = getToken();
  if (token) {
    config.headers["Authorization"] = "Bearer " + token;
  }
  // config.headers['Content-Type'] = 'application/json';

  // Handle token here ...
  return config;
});

axiosClient.interceptors.response.use(
  (response) => {
    if (response && response.data) {
      return response.data;
    }
    return response;
  },
  (error) => {
    console.log(error);
    // const originalRequest = error.config;
    // if (error.response.status === 401 && !originalRequest._retry) {
    //   originalRequest._retry = true;
    //   return axios.post('/auth/token',
    // Handle errors
    throw error;
  }
);
export default axiosClient;
