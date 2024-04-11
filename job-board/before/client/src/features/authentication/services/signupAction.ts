import { ActionFunctionArgs, redirect } from "react-router-dom";
import { registerUser } from "./users";

export async function signupAction({ request }: ActionFunctionArgs) {
  const formData = await request.formData();

  const email = formData.get("email")?.toString() || "";
  const password = formData.get("password")?.toString() || "";

  await registerUser({ email, password });
  return redirect("/tasks");
}