import {DefaultTheme, NavigationContainer} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {StyleSheet, View, Text, StatusBar} from 'react-native';
import SplashScreen from 'react-native-splash-screen';
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

  useEffect(() => {
    SplashScreen.hide();
  }, []);

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
