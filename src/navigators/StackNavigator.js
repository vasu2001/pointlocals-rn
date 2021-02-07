import React from 'react';
import {Text, View} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';

import Location from '../screens/Location';
import MainInfo from '../screens/MainInfo';
import Details from '../screens/Details';
import Contact from '../screens/Contact';
import Gallery from '../screens/Gallery';

const Stack = createStackNavigator();

const StackNavigator = ({}) => (
  <Stack.Navigator headerMode="none">
    <Stack.Screen name="Main Info" component={MainInfo} />
    <Stack.Screen name="Location" component={Location} />
    <Stack.Screen name="Details" component={Details} />
    <Stack.Screen name="Contact" component={Contact} />
    <Stack.Screen name="Gallery" component={Gallery} />
  </Stack.Navigator>
);

export default StackNavigator;
