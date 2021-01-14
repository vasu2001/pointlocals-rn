import {DefaultTheme, NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {StyleSheet, View, Text, StatusBar} from 'react-native';
import MainNavigator from './src/navigators/MainNavigator';
import {BACKGROUND, PRIMARY, TEXT} from './src/utils/colors';

const App = () => {
  const myTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: PRIMARY,
      background: BACKGROUND,
      text: TEXT,
      card: BACKGROUND,
    },
  };

  return (
    <>
      <StatusBar backgroundColor={PRIMARY} barStyle="light-content" />

      <NavigationContainer theme={myTheme}>
        <MainNavigator />
      </NavigationContainer>
    </>
  );
};

export default App;
