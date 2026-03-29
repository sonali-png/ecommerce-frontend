import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000",
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

api.interceptors.response.use(
  res => res,
  async err => {
    const originalRequest = err.config;
    if (err.response.status === 403 && !originalRequest._retry) {
      originalRequest._retry = true;
      const { data } = await api.post("/refresh");
      api.defaults.headers.common["Authorization"] = `Bearer ${data.accessToken}`;
      originalRequest.headers["Authorization"] = `Bearer ${data.accessToken}`;
      return api(originalRequest);
    }
    return Promise.reject(err);
  }
);

export default api;