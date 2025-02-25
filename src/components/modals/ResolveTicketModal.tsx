import { useResolveTicketMutation } from "@/src/api/services/taskApi";
import { FileType, HomeConn, Ticket } from "@/src/api/types/types";
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

const ResolveTicketModal = (props: Props) => {
  const [files, setFiles] = useState<FileType[] | []>([]);
  const [isChecked, setIsChecked] = useState(false);
  const [comment, setComment] = useState("");

  const route = useRoute<{
    key: string;
    name: string;
    params: { id: string };
  }>();
  const { id } = route.params;

  const [resolveTicket, { isLoading }] = useResolveTicketMutation();

  const handleResolveTicket = async () => {
    const data = {
      id,
      // attachments: files,
      comment,
    };
    try {
      await resolveTicket(data).unwrap();
      ToastAndroid.showWithGravity(
        "Ticket resolved successfully",
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM
      );
      props.setIsOpen(false);
    } catch (error) {
      console.error(error);
      ToastAndroid.showWithGravity(
        "Resolve ticket failed, try again",
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM
      );
    }
  };

  return (
    <CustomModal
      onOk={handleResolveTicket}
      title={"Resolve Ticket"}
      subtitle={"all fields marked (*) are required"}
      icon={"file-text"}
      okText="Resolve"
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
          <Text style={styles.confirmMessage}>
            I confirm that Ticket has been resolved.
          </Text>
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

export default ResolveTicketModal;
