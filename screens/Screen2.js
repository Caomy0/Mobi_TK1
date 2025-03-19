import React, { useEffect, useRef } from "react";
import { View, Animated, StyleSheet } from "react-native";

const Screen2 = () => {
  // Animation 1: Hình vuông xoay liên tục
  const rotateAnim = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.loop(
      Animated.timing(rotateAnim, {
        toValue: 1,
        duration: 2000,
        useNativeDriver: true,
      })
    ).start();
  }, []);

  const rotateInterpolate = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  // Animation 2: Hình tròn đổi màu
  const colorAnim = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.loop(
      Animated.timing(colorAnim, {
        toValue: 3,
        duration: 4000,
        useNativeDriver: false,
      })
    ).start();
  }, []);

  const backgroundColorInterpolate = colorAnim.interpolate({
    inputRange: [0, 1, 2, 3],
    outputRange: ["blue", "red", "purple", "yellow"],
  });

  // Animation 3: Chạy tuần tự 3 animation
  const moveAnim = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.sequence([
      Animated.timing(moveAnim, {
        toValue: 100,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(moveAnim, {
        toValue: -100,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(moveAnim, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <View style={styles.container}>
      {/* Hình vuông xoay */}
      <Animated.View
        style={[styles.square, { transform: [{ rotate: rotateInterpolate }] }]}
      />

      {/* Hình tròn đổi màu */}
      <Animated.View
        style={[styles.circle, { backgroundColor: backgroundColorInterpolate }]}
      />

      {/* Hình chữ nhật di chuyển tuần tự */}
      <Animated.View
        style={[styles.rectangle, { transform: [{ translateX: moveAnim }] }]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 20,
    backgroundColor: "#f0f0f0",
  },
  square: {
    width: 80,
    height: 80,
    backgroundColor: "green",
  },
  circle: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  rectangle: {
    width: 100,
    height: 50,
    backgroundColor: "orange",
  },
});

export default Screen2;
