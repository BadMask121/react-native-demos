import React, {Component, createRef} from 'react';
import {Text, Card, CardItem} from 'native-base';
import {
  View,
  ScrollView,
  Image,
  Dimensions,
  TouchableHighlight,
  SafeAreaView,
  StyleSheet,
  NativeMethodsMixinStatic,
  LayoutChangeEvent,
  NativeMethodsMixin,
} from 'react-native';
import {TapGestureHandler} from 'react-native-gesture-handler';
import {onGestureEvent} from 'react-native-redash';
import Animated, {Easing, set} from 'react-native-reanimated';
import SharedCard from 'components/custom/Card/SharedCard';
import {App, Position} from 'helpers/Modal';
import SharedModal from 'components/custom/Modal/SharedModal';

const images = [
  {
    id: 1,
    source: require('@assets/images/splashScreen/better1632x2449.jpg'),
    content:
      'Occaecat do proident in cillum ullamco ipsum tempor.VoluptateOccaecat do proident in cillum ullamco ipsum tempor.Voluptate',
  },
  {
    id: 2,
    source: require('@assets/images/splashScreen/justin-essah-RxnmKqPvW5I-unsplash.jpg'),
    content:
      'Reprehenderit aute do enim non.Culpa commodo aliqua irure ut tempor anim anim tempor irure cupidatat.',
  },
  {
    id: 3,
    source: require('@assets/images/splashScreen/kevin-laminto-nPJlwpECLcc-unsplash.jpg'),
    content:
      'Deserunt aliqua anim commodo enim.Tempor mollit consequat tempor Lorem irure in commodo veniam elit exercitation aliquip Lorem esse.',
  },
  {
    id: 4,
    source: require('@assets/images/splashScreen/tumblr_msfeffbMUG1qztgoio1_500.webp'),
    content:
      'Occaecat ad eiusmod elit ullamco nulla ullamco dolore consequat aliquip excepteur.',
  },
];
const {width, height} = Dimensions.get('window');
const style = {
  ImageContainer: {height: height - 150, width, padding: 15},
  Image: {
    flex: 1,
    width: null,
    height: null,
    left: 0,
    top: 0,
    resizeMode: 'cover',
    borderRadius: 20,
  },
};
const {
  Value,
  cond,
  and,
  Clock,
  block,
  startClock,
  stopClock,
  timing,
} = Animated;

export default class index extends Component {
  constructor(props: Readonly<{}>) {
    super(props);
  }

  state = {
    ready: false,
    modal: null,
  };

  open = (app: App, position: Position) =>
    this.setState({modal: {app, position}});

  close = () => this.setState({modal: null});

  render() {
    const {open, close} = this;
    const {modal, ready} = this.state;

    return (
      <SafeAreaView style={{flex: 1}}>
        <ScrollView style={{flex: 1}}>
          {images.map(app => (
            <SharedCard key={app.id} {...{app, open}} />
          ))}
        </ScrollView>
        {modal && <SharedModal {...modal} {...{close}} />}
      </SafeAreaView>
    );
  }
}
