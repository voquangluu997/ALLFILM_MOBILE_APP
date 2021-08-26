import axios from "axios";
import axiosClient from "./axiosClient";
const sessionApi = {
  get: () => {
    const url = "/session";
    return axiosClient.get(url);
  },

  getById: (id) => {
    const url = `/session/${id}`;
    return axiosClient.get(url);
  },
};
export default sessionApi;
