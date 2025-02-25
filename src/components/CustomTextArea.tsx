import { default as React, SetStateAction } from "react";
import {
  NativeSyntheticEvent,
  StyleSheet,
  TextInput,
  TextInputChangeEventData,
  View,
} from "react-native";

interface Props {
  placeholder?: string;
  handleChange: (event: NativeSyntheticEvent<TextInputChangeEventData>) => void;
}

const CustomTextArea = (props: Props) => {
  return (
    <View>
      <TextInput
        style={styles.textInput}
        multiline={true}
        textAlignVertical="top"
        placeholder={props.placeholder}
        onChange={props.handleChange}
      />
    </View>
  );
};

export default CustomTextArea;

const styles = StyleSheet.create({
  textInput: {
    fontSize: 12,
    borderWidth: 1,
    borderColor: "lightgray",
    borderRadius: 8,
    minHeight: 50,
    padding: 12,
  },
});
