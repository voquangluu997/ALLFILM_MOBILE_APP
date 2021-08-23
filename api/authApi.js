import axios from "axios";
import axiosClient from "./axiosClient";
const authApi = {
  login: (userInfo) => {
    const url = "/auth/login";
    return axiosClient.post(url, userInfo);
  },
};
export default authApi;
