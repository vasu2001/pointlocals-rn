import {DefaultTheme, NavigationContainer} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {StatusBar} from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import {Provider} from 'react-redux';

import Main from './src/navigators/Main';
import store from './src/redux/store';
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

      <Provider store={store}>
        <NavigationContainer theme={myTheme}>
          <Main />
        </NavigationContainer>
      </Provider>
    </>
  );
};

export default App;
