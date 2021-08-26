import axios from "axios";
import axiosClient from "./axiosClient";
const userApi = {
  get: () => {
    const url = "/user/profile";
    return axiosClient.get(url);
  },
  updatePassword: (pass) => {
    const url = "/user/profile/password";
    return axiosClient.post(url, pass);
  },
  updateInfo: (info) => {
    const url = "/user/profile";
    return axiosClient.post(url, info);
  },
};
export default userApi;
