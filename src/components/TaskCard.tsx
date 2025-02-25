import { Feather } from "@expo/vector-icons";
import * as Localization from "expo-localization";
import { useNavigation } from "expo-router";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { useListHomeConnQuery } from "../api/services/taskApi";
import { HomeConnStatus } from "../api/types/types";
import { ticketStatus } from "../hooks/useTicketsStatus";
import ProgressBar from "./ProgressBar";
// import SeverityTag from "./tags/SeverityTag";
import { FTTHMappedData } from "../app/(tabs)";
import StatusTag from "./tags/StatusTags";
import TaskIdTag from "./tags/TaskIdTag";

const formatTimeAgo = (dateString: string) => {
  const now = new Date();
  const date = new Date(dateString);
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diffInSeconds < 60) return `${diffInSeconds} seconds ago`;
  if (diffInSeconds < 3600)
    return `${Math.floor(diffInSeconds / 60)} minutes ago`;
  if (diffInSeconds < 86400)
    return `${Math.floor(diffInSeconds / 3600)} hours ago`;
  return new Intl.DateTimeFormat(Localization.locale, {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(date);
};

const TaskCard: React.FC<FTTHMappedData> = ({
  id,
  jobId,
  time,
  estateName,
  estateAddress,
}) => {
  const navigate = useNavigation<any>();
  const { data: tickets } = useListHomeConnQuery();
  const ticket = tickets?.find((item) => item.id === id);

  const progressPercent = () => {
    if (ticket?.tasks && ticket.tasks.length > 0) {
      const ongoingTasks = ticket.tasks.filter(
        (item) => ticketStatus(item.status as HomeConnStatus) !== "ongoing"
      ).length;
      return ((ongoingTasks / ticket.tasks.length) * 100) / 1;
    }
    return ticketStatus(ticket?.status as unknown as HomeConnStatus) ===
      "ongoing"
      ? 0
      : 100;
  };

  const taskCount = () => {
    if (ticket?.tasks) {
      const tasksLength = ticket?.tasks?.length;
      const ongoingTasks = ticket?.tasks?.filter(
        (t) => ticketStatus(t.status as HomeConnStatus) === "ongoing"
      ).length;
      const completedTasks = tasksLength - ongoingTasks;
      return { completedTasks, tasksLength };
    }
  };

  return (
    <Pressable
      style={({ pressed }) => [pressed && { opacity: 0.5 }]}
      onPress={() => navigate.navigate("task", { id })}
    >
      <View
        style={[
          styles.card,
          {
            borderColor:
              ticketStatus(ticket?.status as unknown as HomeConnStatus) !==
              "ongoing"
                ? "green"
                : "lightgray",
            backgroundColor:
              ticketStatus(ticket?.status as unknown as HomeConnStatus) !==
              "ongoing"
                ? "#E8F5E9"
                : "white",
          },
        ]}
      >
        <View style={styles.headerTags}>
          <TaskIdTag taskId={jobId} />
          <View style={styles.timeAgo}>
            <Feather name="clock" color={"#043547"} size={10} />
            <Text style={{ color: "#043547", fontSize: 10 }}>
              {formatTimeAgo(time.toString())}
            </Text>
          </View>
        </View>

        <View>
          <Text style={styles.cardTitle}>{estateName}</Text>
          <Text style={styles.cardDescription}>
            {estateAddress?.slice(0, 50)}
            {estateAddress?.length! > 50 && "..."}.
          </Text>
        </View>

        <View style={styles.rightView}>
          <View style={styles.buttons}>
            <View style={styles.tagsWrapper}>
              {/* <SeverityTag severity={severity} /> */}
              <StatusTag status={ticket?.status as string} />
            </View>

            <View>
              <ProgressBar progressParcent={progressPercent()} />
              <Text style={{ fontSize: 10, textAlign: "right", marginTop: 2 }}>
                Task {taskCount()?.completedTasks} / {taskCount()?.tasksLength}{" "}
                completed
              </Text>
            </View>
          </View>
        </View>
      </View>
    </Pressable>
  );
};

export default TaskCard;

const styles = StyleSheet.create({
  headerTags: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 10,
  },
  card: {
    backgroundColor: "#f9f9f9",
    borderWidth: 1,
    borderColor: "#7878801F",
    borderRadius: 20,
    padding: 15,
    width: "100%",
    elevation: 3,
    marginBottom: 20,
    shadowColor: "transparent",
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "bold",
    textTransform: "capitalize",
  },
  cardDescription: {
    color: "gray",
    marginBottom: 15,
    fontSize: 12,
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  timeAgo: {
    borderColor: "#B3DEEF",
    borderWidth: 1,
    borderRadius: 50,
    paddingHorizontal: 8,
    color: "#043547",
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  tagsWrapper: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  rightView: {},
});
