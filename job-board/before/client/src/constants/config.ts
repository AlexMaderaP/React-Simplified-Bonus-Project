import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";
import axios from "axios";

export const env = createEnv({
  clientPrefix: "VITE_",
  client: {
    VITE_API_URL: z.string().url(),
  },
  isServer: false,
  runtimeEnv: import.meta.env,
});

export const baseApi = axios.create({ baseURL: import.meta.env.VITE_API_URL });
