import React from 'react';
import {View, Container, Content, Text, Card, CardItem} from 'native-base';
import {SafeAreaView, ScrollView, TouchableWithoutFeedback} from 'react-native';

import PanGesturesScreen from './PanGestures';
import {app} from 'helpers/constants';
export {PanGesturesScreen};

const style = {
  Container: {
    flex: 1,
    backgroundColor: 'transparent',
    marginTop: 20,
    margin: 5,
  },
  CardContainer: {
    elevation: 0.1,
  },
};
export default props => (
  <SafeAreaView style={{flex: 1}}>
    <ScrollView style={{flex: 1}}>
      <Container style={style.Container}>
        <TouchableWithoutFeedback
          onPress={() =>
            props.navigation.navigate(app.ROUTES.PANGESTURE_SCREEN)
          }>
          <Card style={style.CardContainer}>
            <CardItem header bordered>
              <Text>Pan Gestures</Text>
            </CardItem>
            <CardItem bordered>
              <Text style={{fontSize: 20}}>Demonstration of dragable view</Text>
            </CardItem>
          </Card>
        </TouchableWithoutFeedback>
      </Container>
    </ScrollView>
  </SafeAreaView>
);
