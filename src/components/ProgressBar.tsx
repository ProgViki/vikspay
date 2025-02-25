import React from "react";
import { StyleSheet, View, Image } from "react-native";

type Props = {
  progressParcent: number;
};

const ProgressBar = (props: Props) => {
  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <View
          style={[
            styles.progress,
            {
              width: `${props.progressParcent}%`,
              backgroundColor:
                props.progressParcent === 100 ? "#379D51" : "#0a96cc",
            },
          ]}
        ></View>
        <Image
          source={require("../../assets/images/progressIcon.png")}
          style={[
            styles.progressIcon,
            { marginLeft: props.progressParcent === 100 ? -8 : -4 },
          ]}
        />
      </View>
    </View>
  );
};

export default ProgressBar;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#E7F5FA",
    height: 8,
    width: 120,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "flex-start",
  },

  wrapper: {
    flexDirection: "row",
    alignItems: "center",
  },

  progress: {
    backgroundColor: "#0A96CC",
    height: 8,
    borderRadius: 50,
  },

  progressIcon: {
    width: 16,
    marginLeft: -4,
    objectFit: "contain",
  },
});
