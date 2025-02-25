import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import * as SecureStore from "expo-secure-store";

export const tagTypes = ["user", "tickets", "tasks"];

export const api = createApi({
  reducerPath: "api",
  tagTypes,
  baseQuery: fetchBaseQuery({
    baseUrl: "https://sm.api.miro.zoracom.com",
    prepareHeaders: async (headers) => {
      const token = await SecureStore.getItemAsync("token");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
    },
  }),
  endpoints: () => ({}),
});
