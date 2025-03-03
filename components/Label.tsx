import React, { ComponentProps, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { FontAwesome as Icon } from "@expo/vector-icons";
import Animated, { useAnimatedReaction, runOnJS } from "react-native-reanimated";

import { radToMinutes } from "../Constants";

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  row: {
    color: "#9D9EA7",
  },
  time: {
    color: "white",
    fontSize: 14,
    fontFamily: "SFProRounded-Semibold",
  },
  label: {
    fontSize: 14,
    fontFamily: "SFProRounded-Semibold",
  },
});

interface LabelProps {
  theta: Animated.SharedValue<number>;
  label: string;
  icon: ComponentProps<typeof Icon>["name"];
}

const Label = ({ theta, label, icon }: LabelProps) => {
  const [timeDisplay, setTimeDisplay] = useState("00:00");
  
  const updateTime = (rawMinutes: number) => {
    try {
      const totalMinutes = isNaN(rawMinutes) ? 0 : Math.round(rawMinutes);

      const hours = Math.floor(totalMinutes / 60);
      const minutes = Math.floor(totalMinutes % 60);
      
      const hoursStr = hours.toString().padStart(2, "0");
      const minutesStr = minutes.toString().padStart(2, "0");
      
      setTimeDisplay(`${hoursStr}:${minutesStr}`);
    } catch (e) {
      setTimeDisplay("00:00");
    }
  };
  
  useAnimatedReaction(
    () => theta.value,
    (currentValue, previousValue) => {
      if (currentValue !== previousValue) {
        const minutes = radToMinutes(currentValue);
        runOnJS(updateTime)(minutes);
      }
    },
    [theta]
  );
  
  React.useEffect(() => {
    updateTime(radToMinutes(theta.value));
  }, []);
  
  return (
    <View style={styles.container}>
      <Text style={styles.row}>
        <Icon name={icon} size={16} />
        <Text style={styles.label}>{"\u00A0" + label}</Text>
      </Text>
      <Text style={styles.time}>{timeDisplay}</Text>
    </View>
  );
};

export default Label;