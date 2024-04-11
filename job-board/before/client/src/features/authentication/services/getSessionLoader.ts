import { getSession } from "./users";

export async function getSessionLoader() {
  return await getSession();
}
