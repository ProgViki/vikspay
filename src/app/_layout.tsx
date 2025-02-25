import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { LogBox } from "react-native";
import { Provider } from "react-redux";
import store from "../api/data/store";
import ErrorBoundary from "../utils/ErrorBoundary";

LogBox.ignoreAllLogs(true);

export default function RootLayout() {
  return (
    <ErrorBoundary>
      <Provider store={store}>
        <StatusBar style="auto" />
        <Stack>
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="auth" options={{ headerShown: false }} />
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        </Stack>
      </Provider>
    </ErrorBoundary>
  );
}
