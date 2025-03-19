import React, { useEffect, useRef } from "react";
import { View, Text, Animated, Image, StyleSheet } from "react-native";

const Screen1 = () => {
  const fadeAnim = useRef(new Animated.Value(0)).current; // Animation cho text
  const ballAnim = useRef(new Animated.Value(-100)).current; // Animation cho bóng
  const springAnim = useRef(new Animated.Value(1)).current; // Animation lò xo

  useEffect(() => {
    // Text xuất hiện dần
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 3000,
      useNativeDriver: true,
    }).start();

    // Quả bóng rơi từ trên xuống
    Animated.timing(ballAnim, {
      toValue: 300,
      duration: 3000,
      useNativeDriver: true,
    }).start();

    // Hiệu ứng lò xo cho hình vuông
    Animated.spring(springAnim, {
      toValue: 1.5,
      friction: 2,
      tension: 100,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <View style={styles.container}>
      {/* Text xuất hiện dần */}
      <Animated.Text style={[styles.text, { opacity: fadeAnim }]}>
        You are Welcome!
      </Animated.Text>

      {/* Quả bóng rơi xuống */}
      <Animated.Image
        source={{
          uri: "https://cdn-icons-png.flaticon.com/512/1048/1048952.png",
        }} // Hình quả bóng
        style={[styles.ball, { transform: [{ translateY: ballAnim }] }]}
      />

      {/* Hình vuông có hiệu ứng lò xo */}
      <Animated.View
        style={[styles.square, { transform: [{ scale: springAnim }] }]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  ball: {
    width: 50,
    height: 50,
    marginBottom: 20,
  },
  square: {
    width: 80,
    height: 80,
    backgroundColor: "blue",
  },
});

export default Screen1;
