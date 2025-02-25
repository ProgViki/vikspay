import React from "react";
import { StyleSheet, View, Text, Image } from "react-native";
import { FTTHsubtasks, FTTHTasks } from "../api/types/types";
import CustomLabel from "./CustomLabel";

type Props = {
  task: FTTHTasks | FTTHsubtasks;
};

const ViewCommentAndUploadComponent = ({ task }: Props) => {
  return (
    <View>
      {task?.comment || task.attachments?.length ? (
        <View style={styles.taskUpdate}>
          {task.comment ? (
            <View style={styles.commentContainer}>
              <CustomLabel label="Comment" />
              <Text style={styles.commentText}>
                {task?.comment ? task.comment : "No comment"}
              </Text>
            </View>
          ) : null}

          {task?.attachments?.length ? (
            <View style={styles.filesContainer}>
              <CustomLabel label="Attachments" />
              <View style={styles.filesWrapper}>
                {task.attachments?.map((file, index) => (
                  <View style={styles.attachment}>
                    <Image source={file.url} style={styles.attachmentImage} />
                    <Text key={index} style={styles.fileText}>
                      {file.name}
                    </Text>
                  </View>
                ))}
              </View>
            </View>
          ) : null}
        </View>
      ) : null}
    </View>
  );
};

export default ViewCommentAndUploadComponent;

const styles = StyleSheet.create({
  taskUpdate: {
    gap: 4,
    marginTop: 4,
  },

  commentContainer: {},

  commentText: {
    // color: "gray",
    fontSize: 12,
    marginTop: 1,
  },

  filesContainer: {},

  filesWrapper: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 5,
  },

  attachment: {
    backgroundColor: "red",
    height: 100,
    width: 100,
  },

  attachmentImage: {
    height: 250,
    width: 250,
    objectFit: "cover",
  },

  fileText: {
    fontSize: 12,
  },
});
