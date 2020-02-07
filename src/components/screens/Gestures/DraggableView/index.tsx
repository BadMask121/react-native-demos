import React, {Component} from 'react';
import {View, Text} from 'native-base';
import {PanGestureHandler, State} from 'react-native-gesture-handler';
import Animated, {eq, set, event, neq} from 'react-native-reanimated';
import {onGestureEvent, opacity} from 'react-native-redash';
import {Dimensions, LayoutChangeEvent, Alert} from 'react-native';

const {
  Value,
  Clock,
  startClock,
  cond,
  add,
  interpolate,
  Extrapolate,
  block,
  call,
  and,
} = Animated;
const style = {
  box: {
    height: 100,
    width: 100,
    zIndex: 1,
    // backgroundColor: 'red',
  },
  dropzone: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'blue',
    height: '50%',
  },
};
const {width, height} = Dimensions.get('window');
export default class extends Component {
  dragX: Animated.Value<0>;
  dragY: Animated.Value<0>;
  offsetX: Animated.Value<number>;
  offsetY: Animated.Value<number>;
  gestureState: Animated.Value<-1>;
  addX: Animated.Node<number>;
  addY: Animated.Node<number>;
  transX: Animated.Node<any>;
  transY: Animated.Node<number>;
  opacity: Animated.Node<number>;
  borderRadius: Animated.Node<number>;
  scale: Animated.Node<number>;
  handleGesture: {
    onHandlerStateChange: (...args: any[]) => void;
    onGestureEvent: (...args: any[]) => void;
  };
  top: number | any;
  bottom: number | any;
  left: number | any;
  right: number | any;
  dropped: Animated.Value<-1>;
  elevation: Animated.Node<number>;
  backgroundcolor: Animated.Value<string | number | boolean>;
  backgroundColor: Animated.Node<number>;

  constructor(props) {
    super(props);

    this.onDrop = this.onDrop.bind(this);
    this.dropped = new Value(-1);
    this.dragX = new Value(0);
    this.dragY = new Value(0);
    this.offsetX = new Value(width / 2.5);
    this.offsetY = new Value(height / 4);
    this.gestureState = new Value(-1);

    this.backgroundcolor = new Value(0);
    this.addX = add(this.offsetX, this.dragX);
    this.addY = add(this.offsetY, this.dragY);

    // setting translate Move
    this.transX = cond(eq(this.gestureState, State.ACTIVE), this.addX, [
      set(this.offsetX, this.addX),
    ]);
    this.transY = cond(
      and(eq(this.gestureState, State.ACTIVE), neq(this.dropped, 1)),
      this.addY,
      [
        cond(
          and(eq(this.gestureState, State.END), neq(this.dropped, 1)),
          [set(this.dropped, 1), call([this.addX, this.addY], this.onDrop)],
          set(this.dropped, 0),
        ),
        set(this.offsetY, this.addY),
      ],
    );

    // interpolating opacity
    this.opacity = interpolate(this.transX, {
      inputRange: [0, width],
      outputRange: [0.3, 1],
      extrapolate: Extrapolate.CLAMP,
    });

    // interpolating borderRadius
    this.borderRadius = interpolate(this.transY, {
      inputRange: [0, height / 2, height],
      outputRange: [50, 10, 20],
      extrapolate: Extrapolate.CLAMP,
    });

    // interpolating scale
    this.scale = interpolate(this.transY, {
      inputRange: [0, height],
      outputRange: [1, 2],
      extrapolate: Extrapolate.CLAMP,
    });

    this.elevation = interpolate(this.dropped, {
      inputRange: [0, 1],
      outputRange: [4, 10],
      extrapolate: Extrapolate.CLAMP,
    });
    this.backgroundColor = interpolate(this.dropped, {
      inputRange: [0, 1],
      outputRange: [Animated.color(0, 0, 0), Animated.color(245, 81, 48)],
    });

    // intitialing gestureEvent
    this.handleGesture = onGestureEvent({
      translationX: this.dragX,
      translationY: this.dragY,
      state: this.gestureState,
    });
  }
  onDrop([x, y]) {
    if (
      x >= this.left &&
      x <= this.right &&
      y >= this.top &&
      y <= this.bottom
    ) {
      Alert.alert('Hello, you are in the dropzone ');
    }
  }

  saveDropZone = (e: LayoutChangeEvent) => {
    const {width, height, x, y} = e.nativeEvent.layout;

    console.log(width);
    this.top = y;
    this.bottom = y + height;
    this.left = x;
    this.right = x + width;
  };

  render() {
    return (
      <View style={{flex: 1}}>
        <Animated.View style={[style.dropzone]} onLayout={this.saveDropZone} />
        <PanGestureHandler maxPointers={1} {...this.handleGesture}>
          <Animated.View
            style={[
              style.box,
              {
                borderRadius: this.borderRadius,
                opacity: this.opacity,
                elevation: this.elevation,
                backgroundColor: this.backgroundColor,
                transform: [
                  {
                    translateX: this.transX,
                  },
                  {
                    translateY: this.transY,
                  },
                  {
                    scale: this.scale,
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
