import React from "react"; // ✅ Add this line
import { Feather } from "@expo/vector-icons";
import { Pressable, StyleSheet, Text, View } from "react-native";
import * as Localization from "expo-localization";

export type NotificationCardProps = {
  taskId: string;
  title: string;
  time: Date;
  description?: string;
};

const formatTimeAgo = (dateString: string) => {
  const now = new Date();
  const date = new Date(dateString);
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diffInSeconds < 60) return `${diffInSeconds} seconds ago`;
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`;
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`;
  return new Intl.DateTimeFormat(Localization.locale, {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(date);
};

const NotificationCard: React.FC<NotificationCardProps> = ({ taskId, title, time, description }) => {
  return (
    <Pressable style={({ pressed }) => [pressed && { opacity: 0.5 }]}>
      <View style={styles.card}>
        <View style={styles.headerTags}>
          <Text style={styles.taskId}> {taskId}</Text>
          <View style={styles.timeAgo}>
            <Text style={styles.timeText}>{formatTimeAgo(time.toString())}</Text>
          </View>
        </View>

        <View>
          <Text style={styles.cardTitle}>{title}</Text>
          <Text style={styles.cardDescription}>
            {description?.slice(0, 30)}
            {description && description.length > 30 && "..."}
          </Text>
        </View>
      </View>
    </Pressable>
  );
};

export default NotificationCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#f9f9f9",
    borderWidth: 1,
    borderColor: "#7878801F",
    padding: 15,
    width: "100%",
    elevation: 3,
    marginBottom: 5,
    shadowColor: "transparent",
  },
  headerTags: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  taskId: {
    fontSize: 12,
    fontWeight: "bold",
  },
  timeAgo: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  timeText: {
    color: "#043547",
    fontSize: 10,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "bold",
    textTransform: "capitalize",
  },
  cardDescription: {
    color: "gray",
    marginTop: 5,
    fontSize: 12,
  },
});
