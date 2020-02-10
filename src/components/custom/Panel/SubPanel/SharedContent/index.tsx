import React from 'react';
import {ScrollView, Text} from 'react-native';

export interface ContentProps {
  app;
  position;
}
export default ({app, position}: ContentProps) => {
  return (
    <ScrollView
      style={{
        paddingTop: position.height - 100,
        backgroundColor: '#fff',
      }}>
      <Text style={{padding: 20, lineHeight: 25}}>{app.content}</Text>
    </ScrollView>
  );
};
