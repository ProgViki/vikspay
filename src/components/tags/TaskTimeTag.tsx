import React from "react";
import { Text, View, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface TaskTimeTagProps {
  time: Date;
}

const TaskTimeTag: React.FC<TaskTimeTagProps> = ({ time }) => {
  return (
    <View style={styles.timeTagContainer}>
      <Ionicons name="time" size={18} color="#d3d3d3" style={styles.icon} />
      <Text style={styles.timeTagText}>{time as unknown as string}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  timeTagContainer: {
    flexDirection: "row",
    backgroundColor: "#fff",
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 20,
    marginLeft: 10,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#d3d3d3",
  },
  icon: {
    marginRight: 5,
  },
  timeTagText: {
    color: "#777",
    fontSize: 14,
    fontWeight: "bold",
  },
});

export default TaskTimeTag;
