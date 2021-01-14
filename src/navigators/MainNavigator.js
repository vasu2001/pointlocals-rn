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
    width: 100,
  },
};

const MainNavigator = () => (
  <>
    <Text style={styles.heading}>Add New Location</Text>
    <View style={styles.row}>
      <Text style={styles.text}>
        Welcome, <Text style={styles.colorText}>admin</Text>
      </Text>
      <TouchableOpacity>
        <Text style={styles.text}>Logout</Text>
      </TouchableOpacity>
    </View>

    <Tab.Navigator tabBarOptions={tabBarOptions}>
      <Tab.Screen name="Main Info" component={MainInfo} />
      <Tab.Screen name="Location" component={Location} />
      <Tab.Screen name="Details" component={Details} />
      <Tab.Screen name="Contact" component={Contact} />
      <Tab.Screen name="Gallery" component={Gallery} />
    </Tab.Navigator>
  </>
);

const styles = StyleSheet.create({
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    alignSelf: 'center',
    margin: 3,
  },
  row: {
    margin: 2,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  text: {
    fontSize: 15,
    color: TEXT,
  },
  colorText: {
    color: PRIMARY,
  },
});

export default MainNavigator;
