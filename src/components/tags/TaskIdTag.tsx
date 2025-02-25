import React from "react";
import { View, Text, StyleSheet } from "react-native";

// TaskIdTag Component
interface TaskIdTagProps {
  taskId: string;
}

const TaskIdTag: React.FC<TaskIdTagProps> = ({ taskId }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}> {taskId}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#DAEFF7",
    borderRadius: 30,
    borderWidth: 1,
    borderColor: "#065A7A",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: 20,
    paddingInline: 8,
  },
  text: {
    fontSize: 10,
    color: "#043547",
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default TaskIdTag;
