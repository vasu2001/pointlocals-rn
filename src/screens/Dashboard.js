import React, {useEffect} from 'react';
import {Text, View, StyleSheet, Dimensions, Image} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

import CustomButton from '../components/CustomButton';
import {logout} from '../redux/actions/auth';
import {serverURL} from '../utils/axios';
import {PRIMARY, TEXT} from '../utils/colors';
import {boxStyle} from '../utils/styles';
import {getUserRecord} from '../redux/actions/core';

const {width} = Dimensions.get('screen');

const Dashboard = ({navigation}) => {
  const {name, email, image, locations} = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserRecord());
  }, []);

  return (
    <View style={styles.main}>
      <View style={styles.profileSection}>
        <Image style={styles.photo} source={{uri: serverURL + image}} />
        <Text style={styles.value}>{name}</Text>
        <Text style={styles.value}>{email}</Text>
      </View>

      <View style={styles.cardContainer}>
        <View style={[boxStyle, styles.card]}>
          <Text style={styles.label}>Locations Uploaded</Text>
          <Text style={styles.value}>{locations.uploaded}</Text>
        </View>
        <View style={[boxStyle, styles.card]}>
          <Text style={styles.label}>Locations Verified</Text>
          <Text style={styles.value}>{locations.verified}</Text>
        </View>
        <View style={[boxStyle, styles.card]}>
          <Text style={styles.label}>Locations Deleted</Text>
          <Text style={styles.value}>{locations.deleted}</Text>
        </View>
      </View>

      <CustomButton
        text="Add a new location"
        style={styles.addLoc}
        onPress={() => navigation.navigate('Main Info')}
      />

      <CustomButton
        text="Logout"
        style={styles.logout}
        onPress={() => dispatch(logout())}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    padding: 15,
    flex: 1,
  },
  heading: {
    fontSize: 16.5,
    color: PRIMARY,
    alignSelf: 'stretch',
    borderBottomWidth: 1,
    borderColor: 'gray',
  },

  profileSection: {
    alignItems: 'center',
    marginVertical: 10,
  },
  photo: {
    height: 100,
    width: 100,
    backgroundColor: 'darkgray',
    borderRadius: 50,
    marginBottom: 10,
  },

  cardContainer: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },
  card: {
    width: width / 2 - 30,
    // height: width / 2 - 10,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 5,
  },
  label: {
    fontSize: 15,
    margin: 1,
    color: TEXT,
  },
  value: {
    fontSize: 15,
    margin: 1,
    color: TEXT,
    fontWeight: 'bold',
  },

  addLoc: {
    marginTop: 20,
  },
  logout: {
    position: 'absolute',
    bottom: 20,
  },
});

export default Dashboard;
