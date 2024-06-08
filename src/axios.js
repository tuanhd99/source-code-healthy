import axios from "axios";
// eslint-disable-next-line no-unused-vars
import _ from "lodash";

const instance = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL,
  // withCredentials: true,
});

instance.interceptors.response.use((response) => {
  // eslint-disable-next-line no-unused-vars
  const { data } = response;
  return response.data;
});
export default instance;
