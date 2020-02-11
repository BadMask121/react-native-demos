import React from 'react';
import {View, Text} from 'native-base';
import {StyleSheet, Dimensions, StatusBar} from 'react-native';
import Animated, {
  Value,
  cond,
  greaterThan,
  sub,
  block,
  interpolate,
  useCode,
  eq,
  set,
  Clock,
  Easing,
  startClock,
  debug,
} from 'react-native-reanimated';
import {timing} from 'react-native-redash';
import {Position, App} from 'helpers/Modal';
import {createValue, spring} from 'helpers/Spring';
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
  const transY = createValue(0);
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
    left: x.value,
    top: y.value,
  };

  console.log(position.y, position.height);
  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="transparent" />
      <Animated.Code>
        {() =>
          block([
            spring(width, position.width, wWidth),
            spring(height, position.height, wHeight),
            spring(x, position.x, 0),

            spring(y, position.y, 0, {
              damping: 18,
              mass: 1,
              overshootClamping: true,
              restDisplacementThreshold: 0.001,
              restSpeedThreshold: 0.001,
              stiffness: 100,
              toValue: new Value(0),
            }),
            // spring(transY, position.y, 0, {
            //   damping: 18,
            //   mass: 1,
            //   overshootClamping: true,
            //   restDisplacementThreshold: 0.001,
            //   restSpeedThreshold: 0.001,
            //   stiffness: 100,
            //   toValue: new Value(0),
            // }),
            spring(borderRadius, 20, 10),
            // spring(opacity, 0, 1),
          ])
        }
      </Animated.Code>
      <Animated.View
        style={{
          backgroundColor: 'transparent',
          ...imageView,

          transform: [
            {
              translateY: transY.value,
            },
          ],
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
            style={[
              style.Image,
              {
                borderBottomLeftRadius: borderRadius.value || 20,
                borderBottomRightRadius: borderRadius.value || 20,
              },
            ]}
            source={app ? app.source : null}
          />
        </Animated.View>
      </Animated.View>
    </>
  );
};
