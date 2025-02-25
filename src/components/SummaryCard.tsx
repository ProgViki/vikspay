import { Feather } from "@expo/vector-icons";
import React, { Dispatch, SetStateAction } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { TaskCardProps } from "./TaskCard";

type Props = {
  label: string;
  count: number;
  setFilterOption: Dispatch<SetStateAction<string>>;
};

const SummaryCard = (props: Props) => {
  const icon = () => {
    switch (props.label) {
      case "Total":
        return "list";
      case "Ongoing":
        return "play";
      case "Completed":
        return "check";
      default:
        return "help-circle";
    }
  };

  const summaryCardColor = () => {
    switch (props.label) {
      case "Total":
        return { thick: "#374151", thin: "#F3F4F6", icon: "#D1D5DB" };
      case "Ongoing":
        return { thick: "#2563EB", thin: "#EFF6FF", icon: "#BFDBFE" };
      case "Completed":
        return { thick: "#059669", thin: "#ECFDF5", icon: "#D1FAE5" };
      default:
        return { thick: "#6B7280", thin: "#F9FAFB", icon: "#E5E7EB" };
    }
  };

  return (
    <TouchableOpacity
      onPress={() => props.setFilterOption(props.label)}
      style={[
        styles.summaryCard,
        {
          backgroundColor: summaryCardColor().thin,
          borderColor: summaryCardColor().thick,
        },
      ]}
    >
      <View style={styles.countWrapper}>
        <Text style={styles.count}>{props.count}</Text>
        <Text style={styles.label}>{props.label}</Text>
      </View>
      <View
        style={[
          styles.iconWrapper,
          { backgroundColor: summaryCardColor().icon },
        ]}
      >
        <Feather name={icon()} color={summaryCardColor().thick} />
      </View>
    </TouchableOpacity>
  );
};

export default SummaryCard;

const styles = StyleSheet.create({
  summaryCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "32%",
    borderWidth: 0.5,
    borderRadius: 10,
    padding: 8,
    paddingBlock: 4,
  },

  countWrapper: {},

  count: {
    fontWeight: 700,
    fontSize: 12,
  },

  label: {
    fontSize: 10,
    color: "gray",
  },

  iconWrapper: {
    backgroundColor: "lightgray",
    height: 28,
    width: 28,
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
  },
});
