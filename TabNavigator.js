import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import HealthGoals from './HealthGoals.js';
import MealPlanning from './MealPlanning.js';
import FoodDatabase from './FoodDatabase.js';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Health Goals "
        component={HealthGoals}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="fitness-outline" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Food Database"
        component={FoodDatabase}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="fast-food-outline" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Meal Planning"
        component={MealPlanning}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="calendar-outline" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;
