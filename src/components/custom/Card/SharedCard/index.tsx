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
  ImageContainer: {height: height - 150, width, padding: 15},
  Image: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: 'cover',
    borderRadius: 20,
  },

  cardContainer: {
    position: 'absolute',
    bottom: 10,
    width: '100%',
    height: '20%',
    marginLeft: 15,
    borderColor: 'transparent',
    elevation: 0,
    borderRadius: 20,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    backgroundColor: 'rgba(0,0,0,0.1)',
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
        <View style={{flex: 1}} onLayout={this.setContainer}>
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
          <Text style={{color: '#fff'}}>{content}</Text>
        </CardItem>
      </Card>
    </Animated.View>
  );
};
