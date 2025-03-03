import React from "react";
import { View } from "react-native";
import Animated, {
  useAnimatedProps,
  useDerivedValue,
} from "react-native-reanimated";
import { polar2Canvas } from "react-native-redash";
import Svg, { Defs, Mask, Path } from "react-native-svg";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import {
  SIZE,
  STROKE,
  R,
  PI,
  CENTER,
  arc,
  absoluteDuration,
} from "./Constants";
import Cursor from "./Cursor";
import Gesture from "./Gesture";
import Quadrant from "./components/Quadrant";

const AnimatedPath = Animated.createAnimatedComponent(Path);

interface CircularProps {
  start: Animated.SharedValue<number>;
  end: Animated.SharedValue<number>;
  minAngleSeparation?: number;
}

const CircularSlider = ({ start, end, minAngleSeparation }: CircularProps) => {
  const startPos = useDerivedValue(() =>
    polar2Canvas({ theta: start.value, radius: R }, CENTER)
  );
  const endPos = useDerivedValue(() =>
    polar2Canvas({ theta: end.value, radius: R }, CENTER)
  );
  const animatedProps = useAnimatedProps(() => {
    const p1 = startPos.value;
    const p2 = endPos.value;
    const duration = absoluteDuration(start.value, end.value);
    
    // Always draw arc in the correct direction (from bedtime to wake up)
    return {
      d: `M ${p1.x} ${p1.y} ${arc(p2.x, p2.y, duration > PI, false)}`,
    };
  });
  return (
    <GestureHandlerRootView style={{padding: 16 }}>
      <View>
        <Svg width={SIZE} height={SIZE}>
          <Defs>
          <Mask id="mask">
            <AnimatedPath
              stroke="#FD9F07"
              strokeWidth={STROKE}
              animatedProps={animatedProps}
            />
          </Mask>
        </Defs>
        <Quadrant />
        <Cursor pos={startPos} />
        <Cursor pos={endPos} />
      </Svg>
      <Gesture 
        start={start}
        end={end} 
        startPos={startPos} 
        endPos={endPos} 
        minAngleSeparation={minAngleSeparation} 
      />
    </View>
    </GestureHandlerRootView>
  );
};

export default CircularSlider;