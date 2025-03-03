import React from "react";
import { polar2Canvas } from "react-native-redash";
import { Circle, Line, G, Text } from "react-native-svg";
import MoonAlarm from '../assets/moonAlarm.svg'
import SunAlarm from '../assets/sunAlarm.svg'

import { CENTER, PADDING, R, SIZE, STROKE, TAU } from "../Constants";

const LINES = 60;
const DELTA = TAU / LINES;

const Quadrant = () => {
  return (
    <>
      <Circle
        strokeWidth={STROKE}
        stroke="#1C1B1D"
        cx={SIZE / 2}
        cy={SIZE / 2}
        r={R}
      />
      <G mask="url(#mask)">
        <Circle fill="#5D5D5D" cx={SIZE / 2} cy={SIZE / 2} r={R + PADDING} strokeLinecap="round" />
        {new Array(LINES).fill(0).map((_, i) => {
          const theta = DELTA * i;
          const p1 = polar2Canvas({ theta, radius: R - PADDING / 2 }, CENTER);
          const p2 = polar2Canvas({ theta, radius: R + PADDING / 2 }, CENTER);
          return (
            <Line
              stroke="#000000"
              strokeWidth={4}
              strokeLinecap="round"
              key={i}
              x1={p1.x}
              y1={p1.y}
              x2={p2.x}
              y2={p2.y}
            />
          );
        })}
      </G>
      {new Array(24).fill(0).map((_, i) => {
        const theta = (i * TAU) / 24;
        const p1 = polar2Canvas({ theta, radius: R - 1.4 * PADDING }, CENTER);
        const p2 = polar2Canvas(
          { theta, radius: R - (2.5 * PADDING) / 2 },
          CENTER
        );
        return (
          <React.Fragment key={i}>
            {/* Show longer lines for 12, 6 positions (AM/PM) */}
            {i % 12 === 0 && (
              <Line
                stroke="#646367"
                strokeWidth={2}
                strokeLinecap="round"
                x1={p1.x}
                y1={p1.y}
                x2={p2.x}
                y2={p2.y}
              />
            )}
            {/* Show medium lines for positions with number labels (every 2 hours) */}
            {i % 12 !== 0 && i % 2 === 0 && (
              <Line
                stroke="#646367"
                strokeWidth={1.5}
                strokeLinecap="round"
                x1={p1.x}
                y1={p1.y}
                x2={p2.x}
                y2={p2.y}
              />
            )}
            {/* Show shorter lines for every hour without labels */}
            {i % 2 !== 0 && (
              <Line
                stroke="#646367"
                strokeWidth={1}
                strokeLinecap="round"
                x1={polar2Canvas({ theta, radius: R - 1.2 * PADDING }, CENTER).x}
                y1={polar2Canvas({ theta, radius: R - 1.2 * PADDING }, CENTER).y}
                x2={p2.x}
                y2={p2.y}
              />
            )}
          </React.Fragment>
        );
      })}
      
      {/* Add Moon and Sun icons */}
      <G>
        {/* Moon at 12 AM position */}
        <G transform={`translate(${SIZE/2 - 10},${SIZE/2 - R + 3.2 * PADDING - 10})`}>
          <MoonAlarm width={14} height={14} />
        </G>
        
        {/* Sun at 12 PM position */}
        <G transform={`translate(${SIZE/2 - 10},${SIZE/2 + R - 3.2 * PADDING - 10})`}>
          <SunAlarm width={14} height={14} />
        </G>
      </G>
      
      {/* Add hour labels */}
      {new Array(12).fill(0).map((_, i) => {
        // Adjust theta calculation to match the clock orientation
        const theta = (-i * TAU) / 12 + TAU / 4;
        const position = polar2Canvas(
          { theta, radius: R - 2.2 * PADDING },
          CENTER
        );
        
        let label;
        switch(i) {
          case 0:
            label = '12 AM';
            break;
          case 1:
            label = '2';
            break;
          case 2:
            label = '4';
            break;
          case 3:
            label = '6 AM';
            break;
          case 4:
            label = '8';
            break;
          case 5:
            label = '10';
            break;
          case 6:
            label = '12 PM';
            break;
          case 7:
            label = '2';
            break;
          case 8:
            label = '4';
            break;
          case 9:
            label = '6 PM';
            break;
          case 10:
            label = '8';
            break;
          case 11:
            label = '10';
            break;
        }

        // Adjust font size and make text bolder for main time markers
        const isMajorLabel = (label ?? '').includes('AM') || (label ?? '').includes('PM');
        return (
          <Text
            key={i}
            x={position.x}
            y={position.y}
            fill="#646367"
            fontSize={isMajorLabel ? 11 : 10}
            fontWeight={isMajorLabel ? "bold" : "normal"}
            textAnchor="middle"
            alignmentBaseline="middle"
          >
            {label}
          </Text>
        );
      })}
    </>
  );
};

export default Quadrant;