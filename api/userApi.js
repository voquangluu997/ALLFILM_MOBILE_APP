import axios from "axios";
import axiosClient from "./axiosClient";
const userApi = {
  get: () => {
    const url = "/user/profile";
    return axiosClient.get(url);
  },
};
export default userApi;
