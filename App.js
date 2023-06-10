import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import TabNavigator from './TabNavigator.js';
import { MealPlanContext } from './MealPlanningContext.js';

export default function App() {
  const [mealPlan, setMealPlan] = useState({
    Monday: {
      Breakfast: [],
      Lunch: [],
      Snack: [],
      Dinner: [],
    },
    Tuesday: {
      Breakfast: [],
      Lunch: [],
      Snack: [],
      Dinner: [],
    },
    Wednesday: {
      Breakfast: [],
      Lunch: [],
      Snack: [],
      Dinner: [],
    },
    Thursday: {
      Breakfast: [],
      Lunch: [],
      Snack: [],
      Dinner: [],
    },
    Friday: {
      Breakfast: [],
      Lunch: [],
      Snack: [],
      Dinner: [],
    },
    Saturday: {
      Breakfast: [],
      Lunch: [],
      Snack: [],
      Dinner: [],
    },
    Sunday: {
      Breakfast: [],
      Lunch: [],
      Snack: [],
      Dinner: [],
    },
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
