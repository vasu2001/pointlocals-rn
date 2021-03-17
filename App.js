import {DefaultTheme, NavigationContainer} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {StatusBar} from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import Geolocation from 'react-native-geolocation-service';

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
    Geolocation.setRNConfiguration({});
    navigator.geolocation = Geolocation;
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
