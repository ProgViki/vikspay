import { Feather } from "@expo/vector-icons";
import { default as React } from "react";
import { Image, StyleSheet, Text, View } from "react-native";

const NoTask = () => {
  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <Image
          source={require("../../assets/images/clipboard.png")}
          style={styles.image}
        />
        <Text style={styles.noTaskTitle}>No Task Available</Text>
        <Text style={styles.noTaskText}>
          Reach out to the{" "}
          <Text style={{ color: "#0a7ea4", fontWeight: "bold" }}>Admin</Text>{" "}
          for a task to be assigned to you
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 20,
    flexDirection: "column",
  },
  wrapper: {
    maxWidth: 250,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: 46,
    height: 70,
    marginBottom: 10,
    objectFit: "contain",
  },
  noTaskTitle: {
    fontSize: 16,
    color: "black",
    fontWeight: "800",
    textAlign: "center",
    marginTop: 12,
  },
  noTaskText: {
    fontSize: 16,
    color: "#90A4AE",
    fontWeight: "500",
    textAlign: "center",
  },
});

export default NoTask;
