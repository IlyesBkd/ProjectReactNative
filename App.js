import React from 'react';
import { StyleSheet } from 'react-native';
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


