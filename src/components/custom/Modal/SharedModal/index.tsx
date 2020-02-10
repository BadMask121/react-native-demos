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
  set,
} from 'react-native-reanimated';
import {Position, App} from 'helpers/Modal';
import {createValue, spring} from 'helpers/Spring';
import {ScrollView} from 'react-native-gesture-handler';

const {wWidth, hHeight} = Dimensions.get('window');

const style = {
  // ImageContainer: {height: height - 150, width, padding: 15},
  Image: {
    flex: 1,
    resizeMode: 'cover',
  },
};

export interface AppModalProps {
  app: App;
  position: Position;
  close: () => void;
}

export default ({app, position}: AppModalProps) => {
  const width = createValue(position.width);
  const height = createValue(position.height);
  const x = createValue(position.x);
  const y = createValue(position.y);

  const opacity = cond(
    greaterThan(width.value, sub(wWidth, position.width / 2)),
    1,
    0,
  );

  const nWidth = interpolate(width.value, {
    inputRange: [0, width.value],
    outputRange: [0, 1],
  });
  const imageView = {
    position: 'absolute',
    // width: width.value,
    height: height.value,
    // left: x.value,
    // top: y.value,
  };
  // useCode(
  //   () =>
  //     block([
  //       // cond(greaterThan(width.value, sub(wWidth, position.width / 2))),
  //       interpolate(width.value, {
  //         inputRange: [0, 100],
  //         outputRange: [0, 100],
  //       }),
  //     ]),
  //   [],
  // );

  return (
    <>
      <Animated.View
        style={[
          imageView,
          {
            backgroundColor: '#000',
            transform: [
              {
                translateX: nWidth,
              },
              {
                // translateY: position.height,
              },
            ],
          },
        ]}
        pointerEvents={app ? 'auto' : 'none'}>
        <Animated.View
          style={[
            imageView,
            {
              flex: 1,
              opacity,
              height: position.height,
              paddingTop: position.height,
              left: x.value,
              right: y.value,
            },
          ]}>
          <View
            style={{
              flex: 1,
              height: position.height,
              padding: 16,
              backgroundColor: '#fff',
            }}>
            <ScrollView>
              <Text>{app.content}</Text>
            </ScrollView>
          </View>
        </Animated.View>
        <Animated.View style={[{opacity, height: position.height}]}>
          <Animated.Image
            style={[{...style.Image}, style.Image]}
            source={app ? app.source : null}
          />
        </Animated.View>
      </Animated.View>
    </>
  );
};
