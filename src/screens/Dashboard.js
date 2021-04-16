import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons';

import CustomButton from '../components/CustomButton';
import {logout} from '../redux/actions/auth';
import {PRIMARY, TEXT} from '../utils/colors';
import {boxStyle} from '../utils/styles';
import {getUserRecord, updateSocial} from '../redux/actions/core';
import {serverURL} from '../utils/axios';
import UrlModal from '../components/UrlModal';

const {width} = Dimensions.get('screen');

const Dashboard = ({navigation}) => {
  const {name, email, image, locations, social} = useSelector((state) => state);
  const dispatch = useDispatch();
  const [modal, setModal] = useState(false);

  useEffect(() => {
    dispatch(getUserRecord());
  }, []);

  const onAddLoc = () => {
    if (social === '') {
      navigator.alert('Kindly add your social profile url');
    } else navigation.navigate('Add Location');
  };

  return (
    <>
      <View style={styles.main}>
        <View style={styles.profileSection}>
          <Image style={styles.photo} source={{uri: serverURL + '/' + image}} />
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
          onPress={onAddLoc}
        />

        <Text style={styles.profileHead}>
          {social === '' ? 'Enter' : 'Update'} any of your social profile url
        </Text>
        <TouchableOpacity
          style={[boxStyle, styles.profileTouch]}
          onPress={() => setModal(true)}>
          <View style={styles.profileRow}>
            {['facebook', 'instagram', 'twitter'].map((name) => (
              <Ionicons
                name={'logo-' + name}
                size={25}
                style={styles.profilebutton}
              />
            ))}
          </View>
        </TouchableOpacity>

        <CustomButton
          text="Logout"
          style={styles.logout}
          onPress={() => dispatch(logout())}
        />
      </View>
      <UrlModal
        visible={modal}
        setVisible={setModal}
        initValue={social}
        onSave={(social) => {
          dispatch(
            updateSocial(social, () => {
              setModal(false);
            }),
          );
        }}
      />
    </>
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
    alignItems: 'center',
    justifyContent: 'center',
    margin: 5,
    overflow: 'hidden',
  },
  label: {
    fontSize: 15,
    margin: 1,
    color: TEXT,
    textAlign: 'center',
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

  profileHead: {
    fontSize: 20,
    color: PRIMARY,
    marginTop: 15,
    alignSelf: 'center',
    textAlign: 'center',
  },
  profileTouch: {
    alignSelf: 'center',
  },
  profileRow: {
    alignSelf: 'center',
    flexDirection: 'row',
    marginHorizontal: 5,
  },
  profilebutton: {
    padding: 5,
    marginHorizontal: 5,
  },
});

export default Dashboard;
