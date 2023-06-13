import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const styles = StyleSheet.create({
  result: {
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 20,
  },
});

const BMRResult = ({ bmr }) => {
  return <Text style={styles.result}>Caloric Intake: {bmr} calories</Text>;
};

export default BMRResult;
