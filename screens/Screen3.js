import React, { useRef, useState } from "react";
import { View, Animated, PanResponder, StyleSheet } from "react-native";

const Screen3 = () => {
  // Animation 1: Hình tròn kéo và đổi màu
  const circleAnim = useRef(new Animated.ValueXY({ x: 0, y: 0 })).current;
  const [circleColor, setCircleColor] = useState("blue");

  const circleResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderGrant: () => setCircleColor("red"), // Đổi màu khi nhấn
    onPanResponderMove: Animated.event(
      [null, { dx: circleAnim.x, dy: circleAnim.y }],
      { useNativeDriver: false }
    ),
    onPanResponderRelease: () => {
      setCircleColor("blue"); // Trả về màu cũ
      Animated.spring(circleAnim, {
        toValue: { x: 0, y: 0 },
        useNativeDriver: true,
      }).start();
    },
  });

  // Animation 2: Kéo hình biến mất và xuất hiện hình mới
  const squareAnim = useRef(new Animated.ValueXY({ x: 0, y: 0 })).current;
  const [showNewSquare, setShowNewSquare] = useState(false);

  const squareResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderMove: (evt, gesture) => {
      squareAnim.setValue({ x: gesture.dx, y: 0 });

      // Nếu kéo quá 1/4 màn hình thì ẩn hình cũ, hiện hình mới
      if (gesture.dx < -100) {
        setShowNewSquare(true);
      }
    },
    onPanResponderRelease: () => {
      Animated.spring(squareAnim, {
        toValue: { x: 0, y: 0 },
        useNativeDriver: true,
      }).start();
    },
  });

  return (
    <View style={styles.container}>
      {/* Hình tròn kéo và đổi màu */}
      <Animated.View
        {...circleResponder.panHandlers}
        style={[
          styles.circle,
          {
            backgroundColor: circleColor,
            transform: circleAnim.getTranslateTransform(),
          },
        ]}
      />

      {/* Hình vuông kéo và biến mất */}
      {!showNewSquare ? (
        <Animated.View
          {...squareResponder.panHandlers}
          style={[styles.square, squareAnim.getLayout()]}
        />
      ) : (
        <View style={styles.newSquare} />
      )}
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
  circle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "blue",
  },
  square: {
    width: 100,
    height: 100,
    backgroundColor: "green",
  },
  newSquare: {
    width: 100,
    height: 100,
    backgroundColor: "orange",
  },
});

export default Screen3;
