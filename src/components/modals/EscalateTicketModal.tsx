import { useEscalateTicketMutation } from "@/src/api/services/taskApi";
import { FileType, HomeConn } from "@/src/api/types/types";
import { useRoute } from "@react-navigation/native";
import React, { Dispatch, SetStateAction, useState } from "react";
import { StyleSheet, Text, ToastAndroid, View } from "react-native";
import CustomCheckbox from "../CustomCheckbox";
import CustomLabel from "../CustomLabel";
import CustomModal from "../CustomModal";
import CustomTextArea from "../CustomTextArea";
import CustomUpload from "../CustomUpload";

type Props = {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  data?: HomeConn;
};

const EscalateTicketModal = (props: Props) => {
  const [files, setFiles] = useState<FileType[] | []>([]);
  const [isChecked, setIsChecked] = useState(false);
  const [comment, setComment] = useState("");

  const route = useRoute<{
    key: string;
    name: string;
    params: { id: string };
  }>();
  const { id } = route.params;

  // console.log(props.data);

  const [escalateTicket, { isLoading }] = useEscalateTicketMutation();

  const handleResolveTicket = async () => {
    const data = {
      id,
      escalateToId: props.data?.logs[props.data.logs.length - 1]?.byStaff.id,
      // attachments: files,
      comment,
    };

    console.log(data);

    try {
      await escalateTicket(data).unwrap();
      ToastAndroid.showWithGravity(
        "Ticket escalated successfully",
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM
      );
      props.setIsOpen(false);
    } catch (error) {
      console.error(error);
      ToastAndroid.showWithGravity(
        "Ticket escalation failed, try again",
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM
      );
    }
  };

  return (
    <CustomModal
      onOk={handleResolveTicket}
      title={"Escalate Ticket"}
      subtitle={"all fields marked (*) are required"}
      icon={"arrow-up"}
      okText="Escalate"
      isOpen={props.isOpen}
      setIsOpen={props.setIsOpen}
      disabled={!isChecked || !comment || !files.length}
      isLoading={isLoading}
    >
      <View style={{ gap: 12 }}>
        <View>
          <CustomLabel label="Comment" isRequired />
          <CustomTextArea
            handleChange={(e) => setComment(e.nativeEvent.text)}
            placeholder="Enter comment"
          />
        </View>

        <View>
          <CustomLabel label="Upload files" isRequired />
          <CustomUpload files={files} setFiles={setFiles} />
        </View>

        <View style={styles.checkboxWrapper}>
          <CustomCheckbox isSelected={isChecked} setIsSelected={setIsChecked} />
          <Text style={styles.confirmMessage}>Confirm this action</Text>
        </View>
      </View>
    </CustomModal>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingInline: 6,
    paddingTop: 12,
    paddingBottom: 50,
    backgroundColor: "#FAFCFB",
    // gap: 20,
  },

  checkboxWrapper: {
    flexDirection: "row",
    gap: 8,
  },

  confirmMessage: {
    fontSize: 12,
    color: "gray",
  },
});

export default EscalateTicketModal;
