import { View, Text, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import Animated from 'react-native-reanimated';

const Clock = () => {

    const [time, setTime] = useState(new Date());
    const [morphAnimation] = useState(new Animated.Value(0));
    const [glowAnimation] = useState(new Animated.Value(0));

    useEffect(() => {
        const interval = setInterval(() => {
            setTime(new Date());
        }, 1000)
        return () => clearInterval(interval)
    }, []);

    useEffect(() => {
       animateMophing()
       animateGlowing()
    })

    const animateMophing = () => {
        Animated.loop(
            Animated.sequence([
                Animated.timing(morphAnimation, {
                    toValue: 1,
                    duration: 1000,
                    useNativeDriver: false,
                }),
                Animated.timing(glowAnimation, {
                    toValue: 1,
                    duration: 1000,
                    useNativeDriver: false,
                })
            ])
        )
    }

    const animateGlowing = () => {
        Animated.loop(
            
                Animated.timing(morphAnimation, {
                    toValue: 1,
                    duration: 2000,
                    easing: Easing.linear,
                    useNativeDriver: false,
                })).start();
    }

    const morphStyle = {
        // transform: [
        //     {scale: morphAnimation.interpolate({
        //         inputRange: [0, 1],
        //         outputRange: [1, 1.2],
        //     })},
        // ]
        borderRadius: morphAnimation.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 20],
        })
    }

    const glowStyle = {
        opacity: glowAnimation.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 1],
        })
    }

    const interpolateColors = glowAnimation.interpolateColors({
        inputRange: [0, 0.5, 1],
        outputRange: ["rgba(255, 0, 0, 1)", "rgba(0, 255, 0, 1)", "rgba(0, 0, 255, 1)", ],
    })

    
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Digital Clock</Text>
      <Animated.View style={[styles.clockContainer, morphStyle]}>
        <Animated.Text style={[styles.time, animatedStyles]}>
            {time.toLocaleTimeString()}
            </Animated.Text>
      </Animated.View>
    </View>
  )
}

export default Clock

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    title: {
        fontSize: 24,
        marginBottom: 20,
    },
    clockContainer: {
        width: 200,
        height: 200,
        justifyContent: "center",
        alignItems: "center",
    },
    time: {
        fontSize: 48,
    },
    morphStyle: {
        transform: [{ scale: morphAnimation }],
    },
    glowStyle: {
        backgroundColor: interpolateColors,
    },
    animatedStyles: {
        opacity: glowAnimation,
    }
})

// const glowAnimation = useSharedValue(0);
// const morphAnimation = useSharedValue(1);
// const animatedStyles = useAnimatedStyle(() => {
//     return {
//         opacity: glowAnimation.value, // 0 to 1
//         transform: [{ scale: morphAnimation.value }],
//     };
// });

// const interpolateColors = useAnimatedStyle(() => {
//     return {
//         backgroundColor: interpolateColor(
//             glowAnimation.value,
//             [0, 1],
//             ["#000000", "#ffffff"]
//         ),
//     };
// });

// useEffect(() => {
//     glowAnimation.value = withRepeat(withTiming(1, { duration: 1000 }), Infinity, true); // 0 to 1
//     morphAnimation.value = withRepeat(withTiming(1.2, { duration: 1000 }), Infinity, true); // 1 to 1.2
