import React from "react";
import { SafeAreaView } from "react-native";
import Screen1 from "./screens/Screen1";
import Screen2 from "./screens/Screen2";
import Screen3 from "./screens/Screen3";

export default function App() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      {/* <Screen1 /> */}
      <Screen2 />
      {/* <Screen3 /> */}
    </SafeAreaView>
  );
}
