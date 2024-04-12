import { ActionFunctionArgs, redirect } from "react-router-dom";
import { logIn } from "./users";

export async function logInAction({ request }: ActionFunctionArgs) {
  const formData = await request.formData();

  const email = formData.get("email")?.toString() || "";
  const password = formData.get("password")?.toString() || "";

  const res = await logIn({ email, password });

  if (res.status === 401) {
    return res.data;
  }

  return redirect("/");
}
