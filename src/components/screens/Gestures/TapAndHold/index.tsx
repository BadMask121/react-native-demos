import React, {Component} from 'react';
import {View} from 'native-base';
import {TapGestureHandler, State} from 'react-native-gesture-handler';
import Animated, {Easing, block, neq} from 'react-native-reanimated';
import {onGestureEvent} from 'react-native-redash';
const style = {
  box: {
    height: 100,
    width: 100,
    backgroundColor: 'red',
  },
};

const {
  Value,
  Clock,
  event,
  timing,
  clockRunning,
  startClock,
  stopClock,
  cond,
  and,
  eq,
  interpolate,
  Extrapolate,
  set,
} = Animated;

const runOpacityTimer = (clock: typeof Clock, gestureState: typeof Value) => {
  const state = {
    finished: new Value(0),
    position: new Value(0),
    time: new Value(0),
    frameTime: new Value(0),
  };
  const config = {
    duration: 300,
    toValue: new Value(-1),
    easing: Easing.inOut(Easing.ease),
  };

  return block([
    cond(and(eq(gestureState, State.BEGAN), neq(config.toValue, 1)), [
      set(state.finished, 0),
      set(state.time, 0),
      set(state.frameTime, 0),
      set(config.toValue, 1),
      startClock(clock),
    ]),
    cond(and(eq(gestureState, State.END), neq(config.toValue, 0)), [
      set(state.finished, 0),
      set(state.time, 0),
      set(state.frameTime, 0),
      set(config.toValue, 0),
      startClock(clock),
    ]),
    timing(clock, state, config),
    cond(state.finished, stopClock(clock)),
    interpolate(state.position, {
      inputRange: [0, 1],
      outputRange: [1, 0],
      extrapolate: Extrapolate.CLAMP,
    }),
  ]);
};

export default class extends Component {
  gestureState = new Value(-1);
  clock = new Clock();
  gestureHandler = event([
    {
      nativeEvent: {
        state: this.gestureState,
      },
    },
  ]);
  opacity = runOpacityTimer(this.clock, this.gestureState);
  render() {
    return (
      <View>
        <TapGestureHandler
          minPointers={1}
          onHandlerStateChange={this.gestureHandler}
          //   onGestureEvent={this.handleGesture}
          //   onHandlerStateChange={this.handleGesture}
        >
          <Animated.View
            style={[
              style.box,
              {
                opacity: this.opacity,
              },
            ]}
          />
        </TapGestureHandler>
      </View>
    );
  }
}
