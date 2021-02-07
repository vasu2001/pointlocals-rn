import React from 'react';
import {Text, StyleSheet} from 'react-native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {useSelector} from 'react-redux';

import {PRIMARY, TEXT} from '../utils/colors';
import Dashboard from '../screens/Dashboard';
import StackNavigator from './StackNavigator';

const Tab = createMaterialTopTabNavigator();

const tabBarOptions = {
  labelStyle: {
    fontSize: 17,
    textTransform: 'none',
    margin: 0,
    // borderWidth: 1,
    marginTop: -15,
  },
  activeTintColor: PRIMARY,
  inactiveTintColor: TEXT,
  style: {
    height: 35,
  },
  indicatorStyle: {
    height: 2.5,
  },
  // scrollEnabled: true,
  // tabStyle: {
  //   width: 110,
  // },
};

const MainNavigator = () => {
  const {name} = useSelector((state) => state);

  return (
    <>
      <Text style={styles.heading}>Add New Location</Text>
      <Text style={styles.text}>
        Welcome, <Text style={styles.colorText}>{name}</Text>
      </Text>

      <Tab.Navigator tabBarOptions={tabBarOptions}>
        <Tab.Screen name="Dashboard" component={Dashboard} />
        <Tab.Screen name="Add Location" component={StackNavigator} />
      </Tab.Navigator>
    </>
  );
};

const styles = StyleSheet.create({
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    alignSelf: 'center',
    margin: 3,
  },
  text: {
    margin: 2,
    borderBottomWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 5,
    fontSize: 15,
    color: TEXT,
  },
  colorText: {
    color: PRIMARY,
  },
});

export default MainNavigator;
