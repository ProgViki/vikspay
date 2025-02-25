import { Feather } from "@expo/vector-icons";
import { Dispatch, default as React, ReactNode, SetStateAction } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import LoadingIcon from "./LoadingIcon";
import { Animated } from "react-native";
import { useEffect, useRef } from "react";

type Props = {
  title: string;
  subtitle?: string;
  icon?: React.ComponentProps<typeof Feather>["name"];
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<string>>;
  cancelText?: string;
  okText?: string;
  okButtonProps?: any;
  cancelButtonProps?: any;
  okTextProps?: any;
  cancelTextProps?: any;
  children: ReactNode;
  disabled?: boolean;
  onOk: () => void;
  isLoading?: boolean;
  actionButtonText: string;
  currentId?: string;
};

const CustomDialoguebox = (props: Props) => {
  const handleAction = () => {
    if (props.disabled) {
      return;
    }
    props.onOk();
  };

  const handleCancel = () => {
    props.setIsOpen("");
  };

  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: props.isOpen ? 1 : 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [props.isOpen]);

  return (
    <View style={styles.dialogueWrapper}>
      <Animated.View
        style={[
          styles.container,
          { opacity: fadeAnim, display: props.isOpen ? "flex" : "none" },
        ]}
      >
        <View style={styles.header}>
          <View style={styles.headerWrapper}>
            {/* <View style={styles.titleIcon}>
              <Feather name={props.icon ?? "list"} color={"#0a96cc"} size={16} />
            </View> */}
            <View>
              <Text style={styles.title}>{props.title}</Text>
              {/* {props.subtitle && (
                <Text style={styles.subtitle}>{props.subtitle}</Text>
              )} */}
            </View>
          </View>
          <TouchableOpacity onPress={handleCancel}>
            <Feather name="x" color={"red"} size={18} />
          </TouchableOpacity>
        </View>
        <View style={styles.children}>{props.children}</View>
        <View style={styles.footer}>
          <TouchableOpacity
            onPress={handleCancel}
            style={[styles.btn, styles.cancelBtn, props.cancelButtonProps]}
          >
            <Text style={[styles.cancelText, props.okTextProps]}>
              {props.cancelText ?? "Cancel"}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleAction}
            style={[
              styles.btn,
              styles.okBtn,
              props.okButtonProps,
              props.disabled && { backgroundColor: "lightgray" },
            ]}
          >
            {props.isLoading ? (
              <LoadingIcon />
            ) : (
              <Text style={[styles.okBtnText, props.okTextProps]}>
                {props.okText ?? "Ok"}
              </Text>
            )}
          </TouchableOpacity>
        </View>
      </Animated.View>
      <TouchableOpacity
        style={[styles.actionBtn, { marginTop: props.isOpen ? -32 : 0 }]}
        onPress={() => props.setIsOpen(props.currentId ?? "")}
      >
        <Text style={styles.actionBtnText}>
          {props.actionButtonText ?? "Action"}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  actionBtn: {
    width: "100%",
    borderRadius: 50,
    backgroundColor: "#0a96cc",
    paddingBlock: 6,
    alignItems: "center",
  },

  actionBtnText: {
    fontWeight: 700,
    fontSize: 13,
    color: "#fff",
  },

  dialogueWrapper: {
    position: "relative",
    marginTop: 10,
  },

  container: {
    backgroundColor: "#fff",
    borderRadius: 10,
    overflow: "hidden",
    position: "fixed",
    bottom: 0,
    zIndex: 50000,
    width: "100%",
  },

  header: {
    backgroundColor: "#ecf7fb",
    padding: 4,
    paddingInline: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  headerWrapper: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },

  title: {
    fontWeight: 700,
    fontSize: 12,
  },

  subtitle: {
    fontSize: 11,
    color: "gray",
  },

  titleIcon: {
    height: 32,
    width: 32,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#c4e6f3",
    borderRadius: 100,
  },

  children: {
    padding: 12,
  },

  footer: {
    justifyContent: "flex-end",
    flexDirection: "row",
    gap: 12,
    paddingTop: 12,
    paddingBottom: 12,
    paddingInline: 12,
  },

  btn: {
    paddingInline: 12,
    paddingBlock: 2,
    borderRadius: 6,
    minWidth: 80,
    alignItems: "center",
  },

  okBtn: {
    backgroundColor: "#0a96cc",
  },

  okBtnText: {
    fontWeight: 700,
    color: "#fff",
    fontSize: 12,
  },

  cancelBtn: {
    borderWidth: 1,
    borderColor: "lightgray",
  },

  cancelText: {
    color: "gray",
    fontSize: 12,
    fontWeight: 700,
  },
});

export default CustomDialoguebox;
