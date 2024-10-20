import axios from "axios";
import { IUserData } from "../store/types";

const intance = axios.create({
  baseURL: "http://95.87.94.154:8888/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export const authAPI = {
  userRegist(data: IUserData) {
    return intance.post(`user/registration/`, data);
  },
  userLogin(data: IUserData) {
    return intance.post(`user/token/`, data);
  },
};
