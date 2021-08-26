import axios from "axios";
import axiosClient from "./axiosClient";
const filmApi = {
  getAll: () => {
    const url = "/film";
    return axiosClient.get(url);
  },
};
export default filmApi;
