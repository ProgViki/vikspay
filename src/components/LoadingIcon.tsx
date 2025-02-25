import React, { useEffect, useRef } from "react";
import { View, Animated, Easing } from "react-native";
import { Feather } from "@expo/vector-icons";

const LoadingIcon = () => {
  const rotateAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const startRotation = () => {
      Animated.loop(
        Animated.timing(rotateAnim, {
          toValue: 1,
          duration: 1000,
          easing: Easing.linear,
          useNativeDriver: true,
        })
      ).start();
    };

    startRotation();
  }, []);

  return (
    <View>
      <Animated.View
        style={{
          transform: [
            {
              rotate: rotateAnim.interpolate({
                inputRange: [0, 1],
                outputRange: ["0deg", "360deg"],
              }),
            },
          ],
        }}
      >
        <Feather name="loader" size={16} color="gray" />
      </Animated.View>
    </View>
  );
};

export default LoadingIcon;
