import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { useSharedValue } from "react-native-reanimated";

import CircularSlider from "./CircularSlider";
import { PADDING, PI, TAU } from "./Constants";
import Container from "./components/Container";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#1C1B1D",
    padding: PADDING,
  },
  title: {
    fontFamily: "SFProRounded-Semibold",
    fontSize: 36,
    color: "white",
    marginBottom: 32,
  },
});

// Minimum angle separation (60 degrees in radians)
const MIN_ANGLE_SEPARATION = PI / 6;

const Bedtime = () => {
  // Initialize with values that are clearly separated
  const start = useSharedValue(3*PI/2); // 9 o'clock (bedtime)
  const end = useSharedValue(5*PI/6);    // 3 o'clock (wake up time)
  
  return (
    <View style={styles.container}>
      <Container start={start} end={end}>
        <CircularSlider 
          start={start} 
          end={end} 
          minAngleSeparation={MIN_ANGLE_SEPARATION} 
        />
      </Container>
    </View>
  );
};

export default Bedtime;