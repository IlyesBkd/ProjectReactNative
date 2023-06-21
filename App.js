import React from 'react';
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
