import { baseApi } from "@/constants/config";

type registerUserType = {
  email: String;
  password: String;
};

export function registerUser(data: registerUserType) {
  return baseApi
    .post("/users/signup", data)
    .then((res) => res.data)
    .catch((error) => Promise.reject(error));
}

export function logIn(data: registerUserType) {
  return baseApi
    .post("/users/login", data)
    .then((res) => res)
    .catch((error) => {
      if (error.response && error.response.status === 401) {
        return Promise.resolve(error.response);
      } else {
        return Promise.reject(error);
      }
    });
}

export function getSession() {
  return baseApi
    .get("/users/session")
    .then((res) => res.data)
    .catch((error) => Promise.reject(error));
}

export function deleteSession() {
  return baseApi
    .delete("/users/logout")
    .then((res) => res.data)
    .catch((error) => Promise.reject(error));
}
