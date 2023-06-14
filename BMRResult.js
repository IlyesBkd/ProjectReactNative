import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const BMRResult = ({ bmr }) => {
  return (
    bmr && (
      <Text style={styles.result}>
        Caloric Intake : <Text style={{ color: 'red' }}>{Math.round(bmr)}</Text> calories
      </Text>
    )
  );
};

export default BMRResult;

const styles = StyleSheet.create({
  result: {
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 20,
  },
});
