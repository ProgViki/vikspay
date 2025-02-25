import { default as React, SetStateAction } from "react";
import {
  KeyboardType,
  NativeSyntheticEvent,
  StyleSheet,
  TextInput,
  TextInputChangeEventData,
  View,
} from "react-native";

interface Props {
  placeholder?: string;
  handleChange: (event: NativeSyntheticEvent<TextInputChangeEventData>) => void;
  keyboardType: KeyboardType;
}

const CustomTextInput = (props: Props) => {
  return (
    <View>
      <TextInput
        style={styles.textInput}
        textAlignVertical="top"
        placeholder={props.placeholder}
        keyboardType={props.keyboardType}
        onChange={props.handleChange}
      />
    </View>
  );
};

export default CustomTextInput;

const styles = StyleSheet.create({
  textInput: {
    fontSize: 12,
    borderWidth: 1,
    borderColor: "lightgray",
    borderRadius: 8,
    padding: 4,
    height: 28,
  },
});
