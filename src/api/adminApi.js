import axios from "axios";

const adminApi = axios.create({
  baseURL: "http://localhost:5000",
  withCredentials: true,
});

// Request interceptor
adminApi.interceptors.request.use((config) => {
  const token = localStorage.getItem("adminAccessToken");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// Response interceptor
adminApi.interceptors.response.use(
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
        const { data } = await adminApi.post("/refresh");

        localStorage.setItem("adminAccessToken", data.adminAccessToken);

        originalRequest.headers["Authorization"] = `Bearer ${data.adminAccessToken}`;

        return adminApi(originalRequest);
      } catch (error) {
        localStorage.removeItem("adminAccessToken");
        return Promise.reject(error);
      }
    }


    return Promise.reject(err);
  }
);

export default adminApi;