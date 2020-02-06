import React from 'react';
import {createDrawerNavigator} from 'react-navigation-drawer';
import {createAppContainer} from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome5';
import HomeDrawer from 'components/custom/Drawer/HomeDrawer';
import {app} from 'helpers/constants';
import {Home, Transition} from '../../components/screens';
import {createStackNavigator} from 'react-navigation-stack';

export const TransitionNavigator = createAppContainer(
  createStackNavigator(
    {
      TransitionHome: {
        screen: props => <Transition.default {...props} />,
        navigationOptions: ({}) => ({
          title: 'Transitions',
        }),
      },
      SharedElementTransition: {
        screen: props => (
          <Transition.SharedElementTransitionScreen {...props} />
        ),
        navigationOptions: ({}) => ({
          title: 'Shared Element Transition',
        }),
      },
    },
    {
      initialRouteName: 'TransitionHome',
      keyboardHandlingEnabled: true,
    },
  ),
);

const index = createDrawerNavigator(
  {
    Home,
    TransitionNavigator,
  },
  {
    backBehavior: 'initialRoute',
    unmountInactiveRoutes: true,
    swipeDistanceThreshold: 100,
    swipeEdgeWidth: 100,
    swipeVelocityThreshold: 10,
    drawerPosition: 'left',
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: app.primaryColorLight,
        elevation: 0,
      },
      headerTintColor: 'gray',
      headerBackTitle: null,
      headerTitle: () => null,
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    },
    screenContainerStyle: {
      borderRadius: 50,
    },
    drawerType: 'slide',
    drawerBackgroundColor: 'transparent ',
    keyboardDismissMode: 'on-drag',
    contentComponent: props => {
      return <HomeDrawer {...props} />;
    },
    initialRouteName: 'Home',
  },
);

export default createAppContainer(index);
