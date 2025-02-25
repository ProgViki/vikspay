import { Feather } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { FTTHTasks, HomeConnStatus, TicketStatus } from "../api/types/types";
import { ticketStatus } from "../hooks/useTicketsStatus";
import { activateNextTask } from "../utils/activateNextTask";
import useOrderedPredefinedTasks from "../utils/sortTasks";
import AddCommentAndUploadsComponent from "./AddCommentAndUploadsComponent";
import LocationComponent from "./Location";
import SubtaskComponent from "./SubtaskComponent";
import ViewCommentAndUploadComponent from "./ViewCommentAndUploadComponent";

const TaskDetailCard = ({
  task,
  tasks,
}: {
  task: FTTHTasks;
  tasks: FTTHTasks[] | [];
  ticketId: string;
  index: number;
}) => {
  const [openTask, setOpenTask] = useState<string>("");
  const { orderedTasks } = useOrderedPredefinedTasks();

  useEffect(() => {
    handleExpand(task.id);
  }, [task.id]);

  const handleExpand = (id: string) => {
    const getTask = tasks.find((item) => item.id === id);

    const shouldPreventExpansion =
      ticketStatus(getTask?.status) === HomeConnStatus.CLOSED &&
      !getTask?.subtasks?.length &&
      !getTask?.comment &&
      (!getTask?.attachments || getTask.attachments.length === 0);

    if (shouldPreventExpansion) {
      return;
    }

    if (!getTask) return;

    const hasSubtasks =
      getTask?.subtasks?.length && getTask?.subtasks?.length > 0;
    const canActivateNext = activateNextTask(getTask.order ?? 0, orderedTasks);

    if (hasSubtasks || canActivateNext) {
      setOpenTask(openTask === id ? "" : id);
    }
  };

  return (
    <View
      style={[
        styles.wrapper,
        { opacity: activateNextTask(task?.order ?? 0, orderedTasks) ? 1 : 0.5 },
      ]}
    >
      <View
        style={[
          styles.container,
          ticketStatus(task?.status) === HomeConnStatus.CLOSED &&
            styles.containerCompleted,
        ]}
      >
        <TouchableOpacity
          style={styles.taskTitleWrapper}
          onPress={() => handleExpand(task.id)}
        >
          <View style={styles.titleWrapper}>
            <Text style={styles.taskTitle}>{task.title}</Text>
            {(task.subtasks?.length ||
              (!task.subtasks?.length &&
                activateNextTask(task?.order ?? 0, orderedTasks))) && (
              <TouchableOpacity
                style={{
                  transform: [
                    { rotate: openTask === task.id ? "180deg" : "0deg" },
                  ],
                }}
                onPress={() => handleExpand(task.id)}
              >
                {(task.subtasks?.length ||
                  (ticketStatus(task.status) === HomeConnStatus.CLOSED &&
                    task.comment) ||
                  task.attachments ||
                  (ticketStatus(task?.status) === "ongoing" &&
                    !task.subtasks?.length)) && (
                  <Feather
                    name="chevron-down"
                    size={18}
                    color={openTask === task.id ? "#0a96cc" : "gray"}
                  />
                )}
              </TouchableOpacity>
            )}
          </View>

          <LocationComponent
            containerStyle={{
              marginTop: 2,
              borderWidth: 0,
              padding: 0,
              paddingRight: 12,
              paddingInline: 0,
              marginBottom: 0,
              alignItems: "flex-start",
            }}
            textStyle={{ fontSize: 12 }}
            iconSize={12}
          />
        </TouchableOpacity>

        <View
          style={[
            styles.subtasksWrapper,
            {
              height: openTask === task.id ? undefined : 0,
              paddingBottom: openTask === task.id ? 2 : 0,
            },
          ]}
        >
          {task.subtasks?.length
            ? task.subtasks?.map((subtask, index) => (
                <SubtaskComponent task={task} subtask={subtask} key={index} />
              ))
            : null}

          {!task.subtasks?.length &&
            ticketStatus(task?.status) === "ongoing" && (
              <AddCommentAndUploadsComponent task={task} />
            )}
          <ViewCommentAndUploadComponent task={task} />
        </View>
      </View>
    </View>
  );
};

export const styles = StyleSheet.create({
  wrapper: {
    alignItems: "flex-end",
  },

  subtaskCount: {
    color: "#0a96cc",
    fontSize: 10,
    fontWeight: 700,
  },

  container: {
    width: "100%",
    gap: 4,
    borderWidth: 1,
    borderColor: "lightgray",
    borderRadius: 8,
    padding: 8,
    marginBottom: 28,
    animationDelay: "200ms",
  },

  containerCompleted: {
    borderColor: "#009E00",
    backgroundColor: "#E8F5E9",
  },

  taskTitleWrapper: {},

  titleWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  taskTitle: {
    fontSize: 16,
    fontWeight: 700,
    textTransform: "capitalize",
    color: "#0A96CC",
  },

  subtasksWrapper: {
    overflow: "hidden",
    paddingBottom: 120,
  },

  subtaskCard: {
    borderWidth: 1,
    borderColor: "lightgray",
    borderRadius: 8,
    padding: 8,
    gap: 12,
    marginTop: 12,
  },

  taskTag: {
    borderColor: "#0A96CC",
    borderWidth: 1,
    width: 70,
    alignItems: "center",
    borderRadius: 30,
    backgroundColor: "#c4e6f3",
    paddingBlock: 2,
  },

  taskCount: {
    fontWeight: 700,
    color: "#0A96CC",
    fontSize: 12,
  },

  title: {
    fontSize: 13,
    fontWeight: "bold",
    textTransform: "capitalize",
  },

  subtaskheading: {
    gap: 3,
  },

  tagWrapper: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 3,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: "#ccc",
    paddingVertical: 2,
    paddingHorizontal: 6,
  },

  tag: {
    color: "gray",
  },

  timeWrapper: {
    flexDirection: "row",
    gap: 4,
    justifyContent: "space-between",
  },
});

export default TaskDetailCard;
