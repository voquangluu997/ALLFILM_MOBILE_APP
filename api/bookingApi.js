import axios from "axios";
import axiosClient from "./axiosClient";
const bookingApi = {
  booking: (data) => {
    const url = "/booking";
    return axiosClient.post(url, data);
  },
  checkout: (id) => {
    const url = `/booking/${id}`;
    return axiosClient.post(url);
  },
};
export default bookingApi;
