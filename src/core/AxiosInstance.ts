import axios from "axios";
import createAuthRefreshInterceptor from "axios-auth-refresh";
import { AuthApi } from "./authentication/AuthApi";

const AxiosApi = axios.create();

const refreshLogic = async (failedRequest: any) => {
  console.error("## Running refresh logic");
  const accessToken = await AuthApi.refreshToken();
  localStorage.setItem("accessToken", accessToken);
  failedRequest.response.config.headers["Authorization"] = accessToken;
  return;
};

// Instantiate the interceptor
createAuthRefreshInterceptor(AxiosApi, refreshLogic);

function getAccessToken() {
  return localStorage.getItem("accessToken");
}

AxiosApi.interceptors.request.use((request) => {
  if (!request.headers) {
    return;
  }
  request.headers["Authorization"] = `${getAccessToken()}`;
  return request;
});

export default AxiosApi;
