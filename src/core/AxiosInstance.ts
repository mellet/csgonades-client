import axios from "axios";
import createAuthRefreshInterceptor from "axios-auth-refresh";
import { AuthApi } from "./authentication/AuthApi";

const AxiosApi = axios.create();

const refreshLogic = async (failedRequest: any) => {
  try {
  } catch (error) {}
  const result = await AuthApi.refreshToken();
  if (result.authenticated) {
    localStorage.setItem("accessToken", result.accessToken);
    failedRequest.response.config.headers["Authorization"] = result.accessToken;
  } else {
    await AuthApi.signOut();
  }
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
