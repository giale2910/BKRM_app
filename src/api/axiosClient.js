import axios from "axios";
import queryString from "query-string";
import store from "../store/index";
import { authActions } from "../store/slice/authSlice";
import { statusAction } from "../store/slice/statusSlice";
import AsyncStorage from '@react-native-async-storage/async-storage';

const axiosClient = axios.create({
  // baseURL: process.env.REACT_APP_API_URL,
  baseURL: "http://103.163.118.100/bkrm-api/public/index.php/api",

  headers: {
    "content-type": "application/json",
  },
  paramsSerializer: (params) => queryString.stringify(params),
});

axiosClient.interceptors.request.use(
   async (config) => {
    const accessToken = await  AsyncStorage.getItem('@token')
    config.headers.authorization = `Bearer ${accessToken}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
// axiosClient.interceptors.response.use(
//   (response) => {
//     if (response && response.data) {
//       return response.data;
//     }
//     return response;
//   },
//   (error) => {
//     if (error.response.status == "401" || error.response.status == "500" ) {
//       if (!(document.URL.includes("/login") || document.URL.includes("/signup") )) {
//         console.log(!document.URL.includes("/login"))
//         store.dispatch(authActions.logOut())
//         store.dispatch(statusAction.failedStatus("Hết phiên đăng nhập"))
//       }
//     }
//     throw error
//   }
// );
export default axiosClient;
