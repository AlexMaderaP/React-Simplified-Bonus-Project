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