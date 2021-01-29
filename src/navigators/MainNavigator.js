import React from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import {
  createMaterialTopTabNavigator,
  MaterialTopTabBarOptions,
} from '@react-navigation/material-top-tabs';
import MainInfo from '../screens/MainInfo';
import {PRIMARY, TEXT} from '../utils/colors';
import Location from '../screens/Location';
import Details from '../screens/Details';
import Contact from '../screens/Contact';
import Gallery from '../screens/Gallery';
import Dashboard from '../screens/Dashboard';
import {useSelector} from 'react-redux';

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
  scrollEnabled: true,
  tabStyle: {
    width: 110,
  },
};

const MainNavigator = () => {
  const {name} = useSelector((state) => state);

  return (
    <>
      <Text style={styles.heading}>Add New Location</Text>
      <Text style={styles.text}>
        Welcome, <Text style={styles.colorText}>{name}</Text>
      </Text>

      <Tab.Navigator tabBarOptions={tabBarOptions} swipeEnabled={false}>
        <Tab.Screen name="Dashboard" component={Dashboard} />
        <Tab.Screen name="Main Info" component={MainInfo} />
        <Tab.Screen name="Location" component={Location} />
        <Tab.Screen name="Details" component={Details} />
        <Tab.Screen name="Contact" component={Contact} />
        <Tab.Screen name="Gallery" component={Gallery} />
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
