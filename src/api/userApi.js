import axios from "axios";

const userApi = axios.create({
  baseURL: "http://localhost:5000",
  withCredentials: true,
});

// Request interceptor
userApi.interceptors.request.use((config) => {
  const token = localStorage.getItem("userAccessToken");
  console.log(`token : ${token}`);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// Response interceptor
userApi.interceptors.response.use(
  res => res,
  async err => {
    const originalRequest = err.config;

    if (
      err.response?.status === 401 &&
      err.response?.data?.code === "TOKEN_EXPIRED" &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      try {
        const { data } = await userApi.post("/refresh");

        localStorage.setItem("userAccessToken", data.userAccessToken);

        originalRequest.headers["Authorization"] = `Bearer ${data.userAccessToken}`;

        return userApi(originalRequest);
      } catch (error) {
        localStorage.removeItem("userAccessToken");
        return Promise.reject(error);
      }
    }
    return Promise.reject(err);
  }
);

export default userApi;