import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import TabNavigator from './TabNavigator.js';
import { MealPlanProvider } from './MealPlanningContext.js';

export default function App() {
  return (
    <MealPlanProvider>
      <NavigationContainer>
        <TabNavigator />
      </NavigationContainer>
    </MealPlanProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
