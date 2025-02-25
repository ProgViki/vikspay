import { Feather } from "@expo/vector-icons";
import React from "react";
import { View, Text, StyleSheet } from "react-native";

type Props = {
  label: string;
  isRequired?: boolean;
};

const CustomLabel = (props: Props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{props.label}</Text>
      {props.isRequired && <Text style={styles.required}>*</Text>}
    </View>
  );
};

export default CustomLabel;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: 2,
  },

  label: {
    fontSize: 12,
    color: "gray",
  },

  required: {
    color: "red",
  },
});
