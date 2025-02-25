import { TicketStatus } from "@/src/api/types/types";
import { Feather } from "@expo/vector-icons";
import React from "react";
import { View, Text, StyleSheet } from "react-native";

type StatusTagProps = {
  status: TicketStatus | string;
};

const StatusTag: React.FC<StatusTagProps> = ({ status }) => {
  // Get styles dynamically based on status
  const { tagStyle, textStyle } = getStatusStyles(status);

  return (
    <View
      style={[
        styles.tag,
        tagStyle,
        { borderColor: textStyle.color, borderWidth: 1 },
      ]}
    >
      <Feather
        name={icon(status)}
        color={getStatusStyles(status).textStyle.color}
        size={12}
      />
      <Text style={[styles.text, textStyle]}>
        {status?.slice(0, 1).toUpperCase() + status?.slice(1).toLowerCase()}
      </Text>
    </View>
  );
};

// Function to return styles based on status
const getStatusStyles = (status: StatusTagProps["status"]) => {
  switch (status) {
    case TicketStatus.ASSIGNED:
      return {
        tagStyle: { backgroundColor: "#D0E8FF" }, // Light Blue
        textStyle: { color: "#007BFF" }, // Blue
      };
    case TicketStatus.ESCALATED:
      return {
        tagStyle: { backgroundColor: "#FEE2E2" }, // Light Red
        textStyle: { color: "#E63946" }, // Red
      };
    case TicketStatus.RESOLVED:
      return {
        tagStyle: { backgroundColor: "#D1FAE5" }, // Light Green
        textStyle: { color: "#10B981" }, // Green
      };
    case TicketStatus.CLOSED:
      return {
        tagStyle: { backgroundColor: "#E5E7EB" }, // Light Gray
        textStyle: { color: "#6B7280" }, // Dark Gray
      };
    case TicketStatus.COMPLETED:
      return {
        tagStyle: { backgroundColor: "#FDE68A" }, // Light Yellow
        textStyle: { color: "#D97706" }, // Deep Orange
      };
    default:
      return {
        tagStyle: { backgroundColor: "#E5E7EB" }, // Default Light Gray
        textStyle: { color: "#6B7280" }, // Default Dark Gray
      };
  }
};

const icon = (status: StatusTagProps["status"]) => {
  switch (status) {
    case TicketStatus.ASSIGNED:
      return "user-check"; // Assigned to a user
    case TicketStatus.ESCALATED:
      return "arrow-up-circle"; // Escalated to a higher level
    case TicketStatus.RESOLVED:
      return "check-circle"; // Issue has been resolved
    case TicketStatus.CLOSED:
      return "x-circle"; // Ticket is closed
    case TicketStatus.COMPLETED:
      return "check"; // Task is completed
    default:
      return "help-circle"; // Default for unknown status
  }
};

const styles = StyleSheet.create({
  tag: {
    paddingVertical: 3,
    paddingHorizontal: 8,
    borderRadius: 15,
    flexDirection: "row",
    gap: 4,
    alignSelf: "center",
  },
  text: {
    fontSize: 10,
    fontWeight: "700",
  },
});

export default StatusTag;
