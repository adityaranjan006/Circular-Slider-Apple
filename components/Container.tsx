import React, { ReactNode } from "react";
import { StyleSheet, View, Text } from "react-native";
import Animated, { useDerivedValue, useAnimatedProps } from "react-native-reanimated";

import {
  PADDING,
  formatDuration2,
  radToMinutes,
  absoluteDuration,
} from "../Constants";

import Label from "./Label";


interface ContainerProps {
  start: Animated.SharedValue<number>;
  end: Animated.SharedValue<number>;
  children: ReactNode;
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#2C2B2D",
    borderRadius: 20,
    paddingHorizontal:10,
    paddingVertical: 10,
    justifyContent: "center",
  },
  values: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingBottom: 16,

  },
  duration: {
    fontFamily: "SFProRounded-Medium",
    fontSize: 24,
    textAlign: "center",
    marginTop: PADDING,
    color: "white",
  },
});

const Container = ({ start, end, children }: ContainerProps) => {
  const duration = useDerivedValue(() => {
    const d = absoluteDuration(start.value, end.value);
    return formatDuration2(radToMinutes(d));
  });

  const durationTextProps = useAnimatedProps(() => {
    return {
      text: duration.value
    };
  });

  return (
    <View style={styles.container}>
      {children}
      <View style={styles.values}>
        <Label theta={end} label="BEDTIME" icon="bed" />
        <Label theta={start} label="WAKE UP" icon="bell" />
      </View>
    </View>
  );
};

export default Container;
