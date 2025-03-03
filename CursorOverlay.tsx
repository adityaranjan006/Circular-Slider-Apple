import React, { ComponentProps } from "react";
import Animated, { useAnimatedStyle } from "react-native-reanimated";
import { Vector } from "react-native-redash";
import { FontAwesome as Icon } from "@expo/vector-icons";
import Clock from "./assets/ClockAlarm.svg"
import Bed from "./assets/BedAlarm.svg"
import { STROKE } from "./Constants";

interface CursorOverlayProps {
  position: Animated.SharedValue<Vector>;
  icon: "Clock" | "Bed";
}

const CursorOverlay = ({ position, icon }: CursorOverlayProps) => {
  const style = useAnimatedStyle(() => {
    const { x, y } = position.value;
    return {
      position: "absolute",
      top: 0,
      left: 0,
      width: STROKE,
      height: STROKE,
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      transform: [
        { translateX: x - STROKE / 2 },
        { translateY: y - STROKE / 2 },
      ],
    };
  });
  return (
    <Animated.View style={style}>
      {icon === "Clock" ? <Clock width={14} height={14} /> : <Bed width={14} height={14} />}
    </Animated.View>
  );
};

export default CursorOverlay;