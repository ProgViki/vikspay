import { Feather } from "@expo/vector-icons";
import React, { ReactNode, useState } from "react";
import { StyleSheet, TouchableOpacity, View, Text } from "react-native";

type Props = {
  buttonText?: string;
  options: {
    icon?: string;
    label: string;
    onPress: () => void;
    color?: string;
  }[];
};

const CustomDropdown = (props: Props) => {
  const [openDropdown, setOpenDropdown] = useState(false);
  const [isHovered, setIsHovered] = useState<number | null>(null);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.actionBtn}
        onPress={() => setOpenDropdown(!openDropdown)}
      >
        <Feather name="menu" size={20} />
      </TouchableOpacity>

      {openDropdown && (
        <View style={styles.dropdownWrapper}>
          {props.options?.map((item, index) => (
            <TouchableOpacity
              onPressIn={() => setIsHovered(index)}
              onPressOut={() => setIsHovered(null)}
              style={[
                styles.btn,
                isHovered === index && { backgroundColor: "#dcdbdb" },
              ]}
              key={item.label}
              onPress={() => {
                setOpenDropdown(false);
                item.onPress();
              }}
            >
              <View style={styles.icon}>
                <Feather
                  size={14}
                  name={(item.icon as keyof typeof Feather.glyphMap) ?? "list"}
                  color={item.color ?? "gray"}
                />
              </View>
              <Text style={[styles.label, { color: item.color ?? "gray" }]}>
                {item.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "relative",
    alignItems: "flex-end",
  },

  dropdownWrapper: {
    overflow: "hidden",
    position: "absolute",
    backgroundColor: "#fff",
    borderRadius: 8,
    marginTop: 32,
    zIndex: 50,
    minWidth: 144,
  },

  btn: {
    paddingBlock: 8,
    paddingInline: 18,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },

  icon: {},
  label: {},

  actionBtnWrapper: {
    flexDirection: "row",
    alignItems: "flex-end",
    position: "relative",
  },

  actionBtn: {
    // paddingInline: 18,
    // paddingBlock: 6,
  },

  btnText: {
    textAlign: "center",
    color: "white",
    fontWeight: 700,
  },
});

export default CustomDropdown;
