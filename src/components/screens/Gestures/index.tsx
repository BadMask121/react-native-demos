import React from 'react';
import {View, Container, Content, Text, Card, CardItem} from 'native-base';
import {SafeAreaView, ScrollView, TouchableWithoutFeedback} from 'react-native';

import DraggableView from './DraggableView';
import TapAndHoldView from './TapAndHold';
import {app} from 'helpers/constants';

export {DraggableView, TapAndHoldView};

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

interface ListCardProps {
  onPress: () => void;
  title: string;
  description: string;
}
const ListCard = ({onPress, title, description}: ListCardProps) => (
  <TouchableWithoutFeedback onPress={onPress}>
    <Card style={style.CardContainer}>
      <CardItem header bordered>
        <Text>{title}</Text>
      </CardItem>
      <CardItem bordered>
        <Text style={{fontSize: 20}}>{description}</Text>
      </CardItem>
    </Card>
  </TouchableWithoutFeedback>
);
export default props => (
  <SafeAreaView style={{flex: 1}}>
    <ScrollView style={{flex: 1}}>
      <Container style={style.Container}>
        <ListCard
          onPress={() => props.navigation.navigate(app.ROUTES.DRAGGABLE_SCREEN)}
          title="Draggable View"
          description="Demonstration of dragable view"
        />
        <ListCard
          onPress={() =>
            props.navigation.navigate(app.ROUTES.TAPANDHOLD_SCREEN)
          }
          title="Tap and Hold Gesture"
          description="Demonstration of tap and hold gestures view"
        />
      </Container>
    </ScrollView>
  </SafeAreaView>
);
