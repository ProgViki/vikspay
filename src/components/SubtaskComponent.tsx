import { format } from "date-fns";
import { Dispatch, default as React, SetStateAction } from "react";
import { Text, View } from "react-native";
import {
  FileType,
  FTTHsubtasks,
  FTTHTasks,
  HomeConnStatus,
} from "../api/types/types";
import { ticketStatus } from "../hooks/useTicketsStatus";
import { activateNextTask } from "../utils/activateNextTask";
import useOrderedPredefinedTasks from "../utils/sortTasks";
import AddCommentAndUploadsComponent from "./AddCommentAndUploadsComponent";
import Tag from "./Tag";
import { styles } from "./TaskDetailCard";
import ViewCommentAndUploadComponent from "./ViewCommentAndUploadComponent";

type Props = {
  task: FTTHTasks;
  subtask: FTTHsubtasks;
};

const SubtaskComponent = ({ subtask, task }: Props) => {
  const { orderedTasks: tasks } = useOrderedPredefinedTasks();

  return (
    <View
      style={[
        styles.subtaskCard,
        {
          borderColor:
            ticketStatus(subtask?.status) === "ongoing"
              ? "lightgray"
              : "#009E00",
          backgroundColor:
            ticketStatus(subtask?.status) === "ongoing" ? "white" : "#ebfff0",
          gap: ticketStatus(subtask.status) === "ongoing" ? 12 : 0,
        },
      ]}
    >
      <View style={styles.timeWrapper}>
        <View style={styles.subtaskheading}>
          <Text style={styles.title}>{subtask.title}</Text>
        </View>
        {ticketStatus(subtask.status) === HomeConnStatus.CLOSED ? (
          <View style={{ flexDirection: "row", gap: 4 }}>
            <Tag
              task={subtask}
              icon={"calendar"}
              tag={format(new Date(subtask.updatedAt), "dd/M/yy")}
            />

            <Tag
              task={subtask}
              icon={"clock"}
              tag={format(new Date(subtask.updatedAt), "h:mm a")}
            />
          </View>
        ) : null}
      </View>

      {ticketStatus(subtask?.status) === "ongoing" &&
      activateNextTask(task.order ?? 0, tasks) ? (
        <AddCommentAndUploadsComponent task={subtask} isSubtask={true} />
      ) : null}

      <ViewCommentAndUploadComponent task={subtask} />
    </View>
  );
};

export default SubtaskComponent;
