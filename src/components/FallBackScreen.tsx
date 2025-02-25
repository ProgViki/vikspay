import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { useRouter } from "expo-router";

interface Props {
  onRetry: () => void;
}

const FallBackScreen: React.FC<Props> = ({ onRetry }) => {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Oops! Something went wrong.</Text>
      <Text style={styles.message}>Please try again or return to home.</Text>
      <Button title="Retry" onPress={onRetry} />
      <Button title="Go Home" onPress={() => router.replace("/")} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  message: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 20,
  },
});

export default FallBackScreen;
