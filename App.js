import {DefaultTheme, NavigationContainer} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {StatusBar} from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import RNLocation from 'react-native-location';

import Main from './src/navigators/Main';
import {persistor, store} from './src/redux/store';
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
    RNLocation.configure({
      desiredAccuracy: {
        ios: 'bestForNavigation',
        android: 'highAccuracy',
      },
      interval: 500, // Milliseconds
    });
  }, []);

  return (
    <>
      <StatusBar backgroundColor={PRIMARY} barStyle="light-content" />

      <NavigationContainer theme={myTheme}>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <Main />
          </PersistGate>
        </Provider>
      </NavigationContainer>
    </>
  );
};

export default App;
