import {
  Feather,
  FontAwesome,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import React from "react";
import { View, Text, StyleSheet } from "react-native";

interface SeverityTagProps {
  severity: string;
}

// Function to return the appropriate icon based on severity
const SeverityIcon = ({ severity }: { severity: string }) => {
  let icon;

  switch (severity?.toLowerCase()) {
    case "critical":
      icon = <Feather name="alert-triangle" size={12} color="#FFEBE6" />;
      break;
    case "high":
      icon = <Feather name="alert-triangle" size={12} color="red" />;
      break;
    case "medium":
      icon = <Feather name="alert-circle" size={12} color="orange" />;
      break;
    case "low":
      icon = <FontAwesome name="info-circle" size={12} color="green" />;
      break;
    default:
      icon = <Feather name="help-circle" size={12} color="gray" />;
  }

  return icon;
};

const SeverityTag: React.FC<SeverityTagProps> = ({ severity }) => {
  let severityColor = "#e0e0e0";
  let textColor = "#000";

  switch (severity.toLowerCase()) {
    case "critical":
      severityColor = "#FF5C5C";
      textColor = "#FFEBE6";
      break;
    case "high":
      severityColor = "#FEE2E2";
      textColor = "#cf0000";
      break;
    case "medium":
      severityColor = "#FFD7BE";
      textColor = "#FF9900";
      break;
    case "low":
      severityColor = "#E6F9E6";
      textColor = "#90EE90";
      break;
  }

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: severityColor,
          borderColor: textColor,
          borderWidth: 1,
        },
      ]}
    >
      <SeverityIcon severity={severity} />
      <Text style={[styles.text, { color: textColor }]}>
        {severity.slice(0, 1).toUpperCase() + severity.slice(1).toLowerCase()}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 30,
    paddingVertical: 3,
    paddingHorizontal: 8,
    gap: 3,
    alignSelf: "flex-start",
  },
  text: {
    fontSize: 10,
    fontWeight: "bold",
  },
});

export default SeverityTag;
