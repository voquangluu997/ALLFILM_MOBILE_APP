import axios from "axios";
import axiosClient from "./axiosClient";
const promotionApi = {
  getAll: () => {
    const url = "/promotion";
    return axiosClient.get(url);
  },
  getById: (id) => {
    const url = `/promotion/${id}`;
    return axiosClient.get(url);
  },
  getNews: (email) => {
    const url = `/promotion`;
    return axiosClient.post(url, email);
  },
};
export default promotionApi;
