import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import TabNavigator from './TabNavigator.js';
import { MealPlanContext } from './MealPlanningContext.js';

export default function App() {
  const [mealPlan, setMealPlan] = useState({
    Breakfast: [],
    Lunch: [],
    Snack: [],
    Dinner: [],
  });

  return (
    <MealPlanContext.Provider value={{ mealPlan, setMealPlan }}>
      <NavigationContainer>
        <TabNavigator />
      </NavigationContainer>
    </MealPlanContext.Provider>
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
