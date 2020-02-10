import React, {ReactNode, Component, Ref, RefObject} from 'react';
import {
  TapGestureHandler,
  GestureHandlerGestureEventNativeEvent,
  PanGestureHandler,
  ScrollView,
} from 'react-native-gesture-handler';
import Animated from 'react-native-reanimated';
import {Card, CardItem, Text, View} from 'native-base';
import {
  Dimensions,
  ImageProps,
  Image,
  TouchableWithoutFeedback,
  GestureResponderEvent,
} from 'react-native';
import {App, Position} from 'helpers/Modal';

const {width, height} = Dimensions.get('window');
const style = {
  ImageContainer: {
    flex: 1,
    height: height - 100,
    width,
    padding: 30,
    justifyContent: 'center',
  },
  Image: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: 'cover',
    borderRadius: 20,
  },

  cardContainer: {
    flex: 0.15,
    bottom: 60,
    right: 4,
    width: '101%',
    elevation: 0,
    borderRadius: 20,
    borderTopRightRadius: 0,
    borderTopLeftRadius: 0,
    backgroundColor: 'rgb(255,255,255)',
    borderColor: 'transparent',
  },
  cardItem: {
    backgroundColor: 'transparent',
    borderRadius: 20,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
  },
};

interface Props {
  app: App;
  open: (app: App, position: Position) => void;
}

const measure = async (
  ref: View | Text | ScrollView | RefObject,
): Promise<Position> => new Promise(resolve => resolve(ref.layout));

export default class extends Component<Props> {
  container = React.createRef();
  startTransition = async () => {
    const {app, open} = this.props;
    const position = await measure(this.container);
    open(app, position);
  };

  setContainer = ({nativeEvent}) => (this.container = nativeEvent);

  render() {
    const {app} = this.props;
    return (
      <TouchableWithoutFeedback onPress={this.startTransition}>
        <View onLayout={this.setContainer}>
          <AppThumbnail {...app} />
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

export const AppThumbnail = ({source, content}: App) => {
  return (
    <Animated.View style={style.ImageContainer}>
      <Image source={source} style={style.Image} />

      <Card style={style.cardContainer}>
        <CardItem style={style.cardItem}>
          <Text style={{color: '#000'}}>{content.substring(0, 50)}</Text>
        </CardItem>
      </Card>
    </Animated.View>
  );
};
