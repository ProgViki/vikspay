import { useRoute } from "@react-navigation/native";
import { default as React, useState } from "react";
import {
  NativeSyntheticEvent,
  StyleSheet,
  TextInputChangeEventData,
  ToastAndroid,
  View,
} from "react-native";
import { useSubmitHomeConnTaskMutation } from "../api/services/taskApi";
import { FileType, FTTHsubtasks, FTTHTasks } from "../api/types/types";
import { ticketStatus } from "../hooks/useTicketsStatus";
import CustomLabel from "./CustomLabel";
import CustomTextArea from "./CustomTextArea";
import CustomUpload from "./CustomUpload";
import SubmitTaskDialogue from "./SubmitTaskDialogueBox";

type Props = {
  task: FTTHTasks | FTTHsubtasks;
  isSubtask?: boolean;
};

const AddCommentAndUploadsComponent = ({ task, isSubtask }: Props) => {
  const [openDialogue, setOpenDialogue] = useState("");
  const [comment, setComment] = useState("");
  const [files, setFiles] = useState<FileType[]>([]);

  const [submitTicketTask, { isLoading }] = useSubmitHomeConnTaskMutation();
  const route = useRoute<{
    key: string;
    name: string;
    params: { id: string };
  }>();
  const { id } = route.params;

  const handleSubmitTask = async (taskId: string, isSubtask: boolean) => {
    const data = {
      id: id,
      taskId: taskId,
      isSubtask: isSubtask,
      comment,
      // attachments: files
    };

    console.log(data);
    // return;

    try {
      await submitTicketTask(data).unwrap();
      ToastAndroid.showWithGravity(
        "Task closed successfully",
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM
      );
    } catch (error) {
      console.log(error);
      ToastAndroid.showWithGravity(
        "Failed, try again",
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM
      );
    }
  };

  return (
    <View>
      <View style={{ gap: 10 }}>
        <View style={styles.commentWrapper}>
          <CustomLabel label="Comment" isRequired />

          <CustomTextArea
            handleChange={(e: NativeSyntheticEvent<TextInputChangeEventData>) =>
              setComment(e.nativeEvent.text)
            }
            placeholder="Type comment..."
          />
        </View>

        <CustomUpload files={files} setFiles={setFiles} />

        {ticketStatus(task?.status) === "ongoing" && (
          <SubmitTaskDialogue
            title={task.title}
            taskId={task.id}
            isSubtask={isSubtask ?? false}
            isOpen={openDialogue === task.id}
            handleSubmitTask={handleSubmitTask}
            setIsOpen={setOpenDialogue}
            isLoading={isLoading}
          />
        )}
      </View>
    </View>
  );
};

export default AddCommentAndUploadsComponent;

const styles = StyleSheet.create({
  commentWrapper: {
    gap: 4,
  },

  commentBox: {
    padding: 10,
    borderColor: "lightgray",
    borderRadius: 12,
    borderWidth: 1,
  },

  uploadWrapper: {
    gap: 16,
  },

  uploadCard: {
    padding: 12,
    borderWidth: 1,
    borderColor: "#0a96cc",
    borderStyle: "dashed",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    gap: 3,
    paddingBlock: 12,
  },

  uploadsWrapper: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 5,
  },

  upload: {
    height: 100,
    width: 100,
    borderWidth: 4,
    borderColor: "lightgray",
    borderRadius: 4,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    overflow: "hidden",
  },

  img: {
    height: "100%",
    width: "100%",
    borderRadius: 4,
    objectFit: "cover",
  },

  trash: {
    position: "absolute",
    top: 4,
    right: 4,
    backgroundColor: "white",
    padding: 2,
    borderRadius: 6,
    textAlign: "center",
    opacity: 0.8,
  },

  btn: {
    backgroundColor: "#0A96CC",
    padding: 8,
    borderRadius: 50,
    marginTop: 16,
    marginBottom: 8,
  },

  btnText: {
    textAlign: "center",
    color: "white",
    fontWeight: 700,
    fontSize: 12,
  },
});
