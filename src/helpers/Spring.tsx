import React from 'react';

import Animated, {debug, SpringUtils} from 'react-native-reanimated';
import {spring as runSpring} from 'react-native-redash';

const {Value, Clock, cond, eq, stopClock, set, clockRunning, neq} = Animated;

export interface SpringValue {
  value: typeof Value;
  clock: typeof Clock;
  hasSprung: typeof Value;
  hasSprungBack: typeof Value;
}

export interface SpringProps {
  toValue: Animated.Value<0>;
  damping: number;
  mass: number;
  stiffness: number;
  overshootClamping: Boolean<true | false>;
  restSpeedThreshold: number;
  restDisplacementThreshold: number;
}

const springConfig = (): SpringProps => ({
  toValue: new Value(0),
  damping: 17,
  mass: 1,
  stiffness: 300,
  overshootClamping: false,
  restSpeedThreshold: 0.001,
  restDisplacementThreshold: 0.001,
});

export const createValue = (val: number): SpringValue => ({
  value: new Value(val),
  clock: new Clock(),
  hasSprung: new Value(0),
  hasSprungBack: new Value(0),
});

export const springBack = (
  v: SpringValue,
  from: number,
  to: number,
): typeof Value => [
  cond(eq(v.hasSprung, 0), [stopClock(v.clock), set(v.hasSprung, 1)]),
  spring(v, from, to, new Value(0), 'hasSprungBack'),
];

export const spring = (
  v: SpringValue,
  from: number,
  to: number,
  config: SpringProps,
  back: 'hasSprung' | 'hasSprungBack' = 'hasSprung',
): typeof Value =>
  cond(
    eq(v[back], 0),
    [
      set(
        v.value,
        runSpring({
          clock: v.clock,
          from,
          to,
          velocity: new Value(0),
          config: config || springConfig(),
        }),
      ),

      cond(eq(clockRunning(v.clock), 0), set(v[back], 1)),
    ],
    stopClock(v.clock),
  );
