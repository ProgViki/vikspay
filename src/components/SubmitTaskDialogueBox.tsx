import React, { Dispatch, SetStateAction } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { TicketStatus } from "../api/types/types";
import { ticketStatus } from "../hooks/useTicketsStatus";
import { styles } from "./TaskDetailCard";
import CustomDialoguebox from "./CustomDialogueBox";
import { current } from "@reduxjs/toolkit";

const SubmitTaskDialogue: React.FC<{
  title: string;
  taskId: string;
  isSubtask: boolean;
  isOpen: boolean;
  handleSubmitTask: (arg0: string, arg1: boolean) => void;
  setIsOpen: Dispatch<SetStateAction<string>>;
  isLoading?: boolean;
}> = ({
  title,
  taskId = "",
  isSubtask,
  isOpen,
  isLoading,
  setIsOpen,
  handleSubmitTask,
}) => {
  return (
    <CustomDialoguebox
      currentId={taskId}
      actionButtonText="Submit"
      title={"Submit Task"}
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      onOk={() => handleSubmitTask(taskId, isSubtask)}
      isLoading={isLoading}
    >
      <View style={styles.submitTaskWrapper}>
        <Text style={{ fontSize: 12, color: "gray" }}>
          Mark{" "}
          <Text
            style={{
              color: "#0a96cc",
              fontWeight: 700,
              textDecorationLine: "underline",
            }}
          >
            {title}{" "}
          </Text>
          as completed? This cannot be undone.{" "}
        </Text>
      </View>
    </CustomDialoguebox>
  );
};

export default SubmitTaskDialogue;
