import React from 'react';
import {View, Text} from 'native-base';
import {StyleSheet, Dimensions} from 'react-native';
import Animated, {
  Value,
  cond,
  greaterThan,
  sub,
  block,
  interpolate,
  useCode,
  eq,
  timing,
  set,
  Clock,
  Easing,
  startClock,
  debug,
} from 'react-native-reanimated';
import {Position, App} from 'helpers/Modal';
import {createValue, spring} from 'helpers/Spring';
import {ScrollView, State} from 'react-native-gesture-handler';
import SharedContent from 'components/custom/Panel/SubPanel/SharedContent';

const style = {
  // ImageContainer: {height: height - 150, width, padding: 15},
  Image: {
    ...StyleSheet.absoluteFillObject,
    width: null,
    height: null,
    resizeMode: 'cover',
  },
};

export interface AppModalProps {
  app: App;
  position: Position;
  close: () => void;
}

export default ({app, position}: AppModalProps) => {
  const wWidth = Dimensions.get('window').width;
  const wHeight = Dimensions.get('window').height;

  const width = createValue(position.width);
  const height = createValue(position.height);
  const x = createValue(position.x);
  const y = createValue(position.y);
  const borderRadius = createValue(20);
  const opacity = cond(
    greaterThan(width.value, sub(wWidth, position.width / 2)),
    1,
    0,
  );
  const imageView = {
    position: 'absolute',
    width: width.value,
    height: height.value,
    // left: x.value,
    // top: y.value,
  };
  return (
    <>
      <Animated.Code>
        {() =>
          block([
            spring(width, position.width, wWidth),
            spring(height, position.height, wHeight),
            spring(x, position.x, 0),
            spring(y, position.y, 0),
            spring(borderRadius, 20, 10),
            // spring(opacity, 0, 1),
          ])
        }
      </Animated.Code>
      <Animated.View
        style={{
          backgroundColor: 'transparent',
          ...imageView,
        }}>
        <Animated.View
          style={[
            imageView,
            {
              opacity: opacity,
            },
          ]}>
          <SharedContent {...{app, position}} />
        </Animated.View>
        <Animated.View
          style={{
            ...imageView,
            height: position.height - 100,
            borderRadius: borderRadius.value,
          }}>
          <Animated.Image
            style={[style.Image, {borderRadius: borderRadius.value || 20}]}
            source={app ? app.source : null}
          />
        </Animated.View>
      </Animated.View>
    </>
  );
};
