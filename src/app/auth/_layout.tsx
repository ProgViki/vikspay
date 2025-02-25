import React from "react";
import { Stack } from "expo-router";

export default function AuthLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="login"
        options={{ headerTitle: "", headerBackVisible: true }}
      />
      <Stack.Screen
        name="forgot-password"
        options={{ headerTitle: "", headerBackVisible: true }}
      />
    </Stack>
  );
}
