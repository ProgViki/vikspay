import React, { Component, ReactNode } from "react";
import { Button, StyleSheet, Text, View } from "react-native";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: undefined };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: any) {
    console.error("Error Boundary Caught an Error:", error, errorInfo);
    // Optionally log error to an external service like Sentry or Firebase
  }

  resetError = () => {
    this.setState({ hasError: false, error: undefined });
  };

  render() {
    if (this.state.hasError) {
      return (
        <View style={styles.container}>
          <Text style={styles.errorText}>Oops...</Text>
          <Text style={styles.errorDetails}>Something went wrong.</Text>
          <Button title="Try Again" onPress={this.resetError} />
        </View>
      );
    }

    return this.props.children;
  }
}

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    height: "100%",
  },
  errorText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "red",
    marginBottom: 10,
  },
  errorDetails: {
    fontSize: 14,
    color: "gray",
    marginBottom: 20,
    textAlign: "center",
  },
});

export default ErrorBoundary;
