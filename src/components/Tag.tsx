import { Feather } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { FTTHsubtasks } from "../api/types/types";
import { ticketStatus } from "../hooks/useTicketsStatus";

type Props = {};

const Tag = ({
  tag,
  icon,
  task,
}: {
  tag: string;
  icon: any;
  style?: {};
  task: FTTHsubtasks;
}) => {
  return (
    <View
      style={[
        styles.subtasksCountWrapper,
        {
          backgroundColor:
            ticketStatus(task?.status) === "ongoing" ? "#fff" : "#ebfff0",
          flexDirection: "row",
          alignItems: "center",
          gap: 4,
          borderColor:
            ticketStatus(task?.status) === "ongoing" ? "lightgray" : "#009E00",
        },
      ]}
    >
      <Feather
        color={ticketStatus(task?.status) === "ongoing" ? "gray" : "#009E00"}
        name={icon}
        size={10}
      />
      <Text
        style={[
          {
            fontSize: 10,
            color: "gray",
            fontWeight: ticketStatus(task?.status) === "ongoing" ? 500 : 700,
          },
          {
            color:
              ticketStatus(task?.status) === "ongoing" ? "gray" : "#009E00",
          },
        ]}
      >
        {tag}
      </Text>
    </View>
  );
};

export default Tag;

export const styles = StyleSheet.create({
  subtasksCountWrapper: {
    backgroundColor: "#ebf9ff",
    borderColor: "#069edb",
    borderWidth: 1,
    borderRadius: 10,
    paddingInline: 5,
    paddingBlock: 1,
    marginBottom: 4,
    alignSelf: "flex-end",
  },
});
