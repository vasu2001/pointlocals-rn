import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {PRIMARY, TEXT} from '../utils/colors';
import {boxStyle} from '../utils/styles';

const Dashboard = ({}) => {
  return (
    <View style={styles.main}>
      <View style={boxStyle}>
        <Text style={styles.heading}>No of Locations</Text>

        <View style={styles.table}>
          <View style={styles.col1}>
            <Text style={styles.label}>Uploaded</Text>
            <Text style={styles.label}>Verified</Text>
            <Text style={styles.label}>Deleted</Text>
          </View>

          <View style={styles.col2}>
            <Text style={styles.value}>100</Text>
            <Text style={styles.value}>23</Text>
            <Text style={styles.value}>5</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    padding: 15,
  },
  heading: {
    fontSize: 16.5,
    color: PRIMARY,
    alignSelf: 'stretch',
    borderBottomWidth: 1,
    borderColor: 'gray',
  },

  table: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 10,
    marginTop: 5,
  },
  col1: {
    justifyContent: 'space-between',
  },
  col2: {
    justifyContent: 'space-between',
    alignItems: 'flex-end',
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
});

export default Dashboard;
