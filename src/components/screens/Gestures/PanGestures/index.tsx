import React, {Component} from 'react';
import {View, Text} from 'native-base';
import {PanGestureHandler, State} from 'react-native-gesture-handler';
import Animated, {eq, set, event} from 'react-native-reanimated';
import {onGestureEvent, opacity} from 'react-native-redash';
import {Dimensions} from 'react-native';

const {
  Value,
  Clock,
  startClock,
  cond,
  add,
  interpolate,
  Extrapolate,
  block,
} = Animated;
const style = {
  box: {
    height: 100,
    width: 100,
    // borderRadius: 50,
    backgroundColor: 'red',
  },
};
const {width, height} = Dimensions.get('window');
export default class extends Component {
  dragX = new Value(0);
  dragY = new Value(0);
  offsetX = new Value(width / 2);
  offsetY = new Value(height / 2);
  gestureState = new Value(-1);

  handleGesture = event([
    {
      nativeEvent: {
        translationX: this.dragX,
        translationY: this.dragY,
        state: this.gestureState,
      },
    },
  ]);

  transX = cond(
    eq(this.gestureState, State.ACTIVE),
    add(this.offsetX, this.dragX),
    set(this.offsetX, add(this.offsetX, this.dragX)),
  );
  transY = cond(
    eq(this.gestureState, State.ACTIVE),
    add(this.offsetY, this.dragY),
    set(this.offsetY, add(this.offsetY, this.dragY)),
  );

  opacity = interpolate(this.transX, {
    inputRange: [0, width],
    outputRange: [0.3, 1],
    extrapolate: Extrapolate.CLAMP,
  });

  borderRadius = interpolate(this.transY, {
    inputRange: [0, height / 2, height],
    outputRange: [50, 10, 20],
    extrapolate: Extrapolate.CLAMP,
  });

  render() {
    return (
      <View>
        <PanGestureHandler
          maxPointers={1}
          onGestureEvent={this.handleGesture}
          onHandlerStateChange={this.handleGesture}>
          <Animated.Code>{}</Animated.Code>
          <Animated.View
            style={[
              style.box,
              {
                borderRadius: this.borderRadius,
                opacity: this.opacity,
                transform: [
                  {
                    translateX: this.transX,
                  },
                  {
                    translateY: this.transY,
                    scale: this.transY,
                  },
                ],
              },
            ]}
          />
        </PanGestureHandler>
      </View>
    );
  }
}
