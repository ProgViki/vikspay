import { useRouter } from "expo-router";
import * as SecureStore from "expo-secure-store";

const router = useRouter();

export const reroute = async () => {
  try {
    const token = await SecureStore.getItemAsync("token");
    console.log(token);
    if (token) {
      router.replace("/(tabs)");
    }
  } catch (error) {
    console.error("Error retrieving token", error);
  }
};
