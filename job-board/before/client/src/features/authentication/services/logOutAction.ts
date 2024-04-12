import { redirect } from "react-router-dom";
import { deleteSession } from "./users";

export async function logOutAction() {
  await deleteSession();
  return redirect("/tasks");
}
