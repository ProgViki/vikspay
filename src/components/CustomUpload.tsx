import { Feather } from "@expo/vector-icons";
import React, { Dispatch } from "react";
import { View, Pressable, Text, Image, StyleSheet } from "react-native";
import * as DocumentPicker from "expo-document-picker";
import { FileType } from "../api/types/types";
import CustomLabel from "./CustomLabel";
import { uploadFile } from "../utils/uploadFile";
import { useSearchParams } from "expo-router/build/hooks";
import { useRoute } from "@react-navigation/native";

type Props = {
  files: FileType[] | [];
  setFiles: Dispatch<React.SetStateAction<FileType[]>>;
};

const CustomUpload = ({ files, setFiles }: Props) => {
  const route = useRoute<{
    key: string;
    name: string;
    params: { id: string };
  }>();
  const { id } = route.params;

  let order = 1;

  const handleFileUpload = async () => {
    const form = new FormData();

    const id = (prefix = "img") => {
      return `${prefix}-${Date.now()}-${Math.random()
        .toString(36)
        .substring(2, 10)}`;
    };

    try {
      const result = await DocumentPicker.getDocumentAsync({});
      if (result.canceled || !result.assets?.length) return;
      const asset = {
        name: result.assets[0].name || "Unknown file",
        uri: result.assets[0].uri,
        type: result.assets[0].mimeType || "unknown",
        size: result.assets[0].size || 0,
      };

      // const file = new File(
      //   [await (await fetch(result.assets[0].uri)).blob()],
      //   result.assets[0].name || "Unknown file",
      //   {
      //     type: result.assets[0].mimeType || "unknown",
      //     lastModified: Date.now(),
      //   }
      // );

      // await uploadFile({ result, id: id(), order }).then((res) => {
      //   console.log(res);
      // });

      setFiles((prev) => [...prev, asset]);
    } catch (error) {
      console.error("File upload error:", error);
    }
  };

  const handleRemoveFiles = (uri: string) => {
    setFiles((prev) => prev.filter((item) => item.uri !== uri));
  };

  return (
    <View style={styles.uploadWrapper}>
      <View>
        <Pressable
          style={({ pressed }) => [
            styles.uploadCard,
            pressed && { opacity: 0.5 },
          ]}
          onPress={handleFileUpload}
        >
          <Feather name="file-plus" size={26} color={"lightgray"} />
          <Text style={{ color: "gray", fontSize: 12 }}>
            Select{" "}
            <Text style={{ fontWeight: 700, color: "black" }}>
              Photos/Videos
            </Text>{" "}
            from your gallery
          </Text>
        </Pressable>
      </View>

      {files.length && (
        <View style={{ gap: 4 }}>
          <CustomLabel label="Uploads" />
          <View style={styles.uploadsWrapper}>
            {files.map((file, index) => (
              <View style={styles.upload} key={index}>
                <Image
                  source={{ uri: file.uri }}
                  alt={file.name}
                  style={styles.img}
                />
                <Pressable
                  onPress={() => handleRemoveFiles(file.uri)}
                  style={({ pressed }) => [
                    styles.trash,
                    pressed && { transform: [{ scale: 1.2 }] },
                  ]}
                >
                  <Feather name="trash" alt="delete" color={"red"} size={20} />
                </Pressable>
              </View>
            ))}
          </View>
        </View>
      )}

      {/* {image && (
                <Image
                  source={{ uri: image }}
                  style={{ width: 100, height: 100 }}
                />
              )} */}
    </View>
  );
};

export default CustomUpload;
export const styles = StyleSheet.create({
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
});
