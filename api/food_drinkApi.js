import axios from "axios";
import axiosClient from "./axiosClient";
const food_drinkApi = {
  get: () => {
    const url = "/food_drink";
    return axiosClient.get(url);
  },
};
export default food_drinkApi;
