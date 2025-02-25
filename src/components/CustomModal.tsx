import { Feather } from "@expo/vector-icons";
import { Dispatch, default as React, ReactNode, SetStateAction } from "react";
import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import LoadingIcon from "./LoadingIcon";

type Props = {
  title: string;
  subtitle?: string;
  icon?: React.ComponentProps<typeof Feather>["name"];
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
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
};

const CustomModal = (props: Props) => {
  const handleAction = () => {
    if (props.disabled) {
      return;
    }
    props.onOk();
  };

  const handleCancel = () => {
    props.setIsOpen(false);
  };

  return (
    <Modal
      visible={props.isOpen}
      transparent
      animationType="fade"
      onRequestClose={handleCancel}
    >
      <View style={styles.overlay}>
        <View style={styles.container}>
          <View style={styles.header}>
            <View style={styles.headerWrapper}>
              <View style={styles.titleIcon}>
                <Feather
                  name={props.icon ?? "list"}
                  color={"#0a96cc"}
                  size={16}
                />
              </View>
              <View>
                <Text style={styles.title}>{props.title}</Text>
                {props.subtitle && (
                  <Text style={styles.subtitle}>{props.subtitle}</Text>
                )}
              </View>
            </View>
            <TouchableOpacity onPress={handleCancel}>
              <Feather name="x" color={"red"} size={24} />
            </TouchableOpacity>
          </View>
          <View style={styles.children}>{props.children}</View>
          <View style={styles.footer}>
            <TouchableOpacity
              onPress={handleCancel}
              style={[styles.btn, styles.cancelBtn, props.cancelButtonProps]}
            >
              <Text style={[styles.cancelText, props.cancelTextProps]}>
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
              disabled={props.disabled}
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
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    backgroundColor: "#fff",
    borderRadius: 10,
    width: "80%",
    overflow: "hidden",
  },
  header: {
    backgroundColor: "#ecf7fb",
    padding: 12,
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
    fontWeight: "700",
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
    paddingHorizontal: 12,
  },
  btn: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    minWidth: 120,
    alignItems: "center",
  },
  okBtn: {
    backgroundColor: "#0a96cc",
  },
  okBtnText: {
    fontWeight: "700",
    color: "#fff",
    fontSize: 13,
  },
  cancelBtn: {
    borderWidth: 1,
    borderColor: "lightgray",
  },
  cancelText: {
    color: "gray",
    fontSize: 13,
    fontWeight: "700",
  },
});

export default CustomModal;
