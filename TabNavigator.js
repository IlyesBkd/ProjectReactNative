import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HealthGoals from './HealthGoals.js';
import MealPlanning from './MealPlanning.js';
import FoodDatabase from './FoodDatabase.js';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
    return (
      <Tab.Navigator>
        <Tab.Screen name="Health Goals" component={HealthGoals} />
        <Tab.Screen name="Food Database" component={FoodDatabase} />
        <Tab.Screen name="Meal Planning" component={MealPlanning} />
      </Tab.Navigator>
    );
  };

  export default TabNavigator;