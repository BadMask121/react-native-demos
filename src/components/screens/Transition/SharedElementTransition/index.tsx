import React, {Component} from 'react';
import {View} from 'react-native-animatable';
import {Text, Card, CardItem} from 'native-base';
// import {} from 'react-native-reanimated'
import {
  ScrollView,
  Image,
  Animated,
  Dimensions,
  TouchableHighlight,
  SafeAreaView,
} from 'react-native';
import {TapGestureHandler} from 'react-native-gesture-handler';
const images = [
  {
    id: 1,
    src: require('@assets/images/splashScreen/better1632x2449.jpg'),
  },
  {
    id: 2,
    src: require('@assets/images/splashScreen/justin-essah-RxnmKqPvW5I-unsplash.jpg'),
  },
  {
    id: 3,
    src: require('@assets/images/splashScreen/kevin-laminto-nPJlwpECLcc-unsplash.jpg'),
  },
  {
    id: 4,
    src: require('@assets/images/splashScreen/tumblr_msfeffbMUG1qztgoio1_500.webp'),
  },
];
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
};
export default class index extends Component {
  render() {
    return (
      <SafeAreaView style={{flex: 1}}>
        <ScrollView style={{flex: 1}}>
          {images.map(image => (
            <TapGestureHandler
              key={image.id}
              onGestureEvent={() => console.log('HEllo')}>
              <Animated.View style={style.ImageContainer}>
                <Image source={image.src} style={style.Image} />

                <Card
                  style={{
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
                  }}>
                  <CardItem
                    style={{
                      backgroundColor: 'transparent',
                      borderRadius: 20,
                      borderTopLeftRadius: 0,
                      borderTopRightRadius: 0,
                    }}>
                    <Text style={{color: '#fff'}}>
                      Occaecat do proident in cillum ullamco ipsum tempor.
                      Voluptate eiusmod culpa culpa laborum mollit ipsum officia
                      labore non labore cillum dolor.
                    </Text>
                  </CardItem>
                </Card>
              </Animated.View>
            </TapGestureHandler>
          ))}
        </ScrollView>
      </SafeAreaView>
    );
  }
}
