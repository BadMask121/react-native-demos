import React from 'react';
import {View, Container, Content, Text, Card, CardItem} from 'native-base';
import {
  SafeAreaView,
  ScrollView,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from 'react-native';
import {app} from '../../../helpers/constants';
export default props => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <ScrollView style={{flex: 1}}>
        <View style={{flex: 1, marginTop: 50, margin: 5}}>
          <Text style={{fontSize: 40, fontWeight: 'bold'}}>
            React Native Demos
          </Text>
        </View>
        <Container
          style={{backgroundColor: 'transparent', marginTop: 20, margin: 5}}>
          <TouchableOpacity
            onPress={() =>
              props.navigation.navigate(app.ROUTES.TRANSITIONSCREEN)
            }>
            <CardItem header bordered>
              <Text>Transitions</Text>
            </CardItem>
          </TouchableOpacity>
        </Container>
      </ScrollView>
    </SafeAreaView>
  );
};
