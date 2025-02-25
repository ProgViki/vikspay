import * as DocumentPicker from "expo-document-picker";
import React, { Dispatch } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { FileType } from "../api/types/types";
import { Feather } from "@expo/vector-icons";

type Props = {
  isSelected: boolean;
  setIsSelected: (arg: boolean) => void;
};

const CustomCheckbox = ({ isSelected, setIsSelected }: Props) => {
  const handleCheck = async () => {
    setIsSelected(!isSelected);
  };

  const styles = StyleSheet.create({
    container: {
      borderColor: isSelected ? "#0a96cc" : "lightgray",
      borderWidth: 1,
      width: 18,
      height: 18,
      alignItems: "center",
      justifyContent: "center",
      borderRadius: 6,
      backgroundColor: isSelected ? "#0a96cc" : "transparent",
    },
  });

  return (
    <TouchableOpacity style={styles.container} onPress={handleCheck}>
      {isSelected && <Feather name="check" color={"white"} />}
    </TouchableOpacity>
  );
};

export default CustomCheckbox;
