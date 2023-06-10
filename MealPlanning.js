import React, { useContext, useEffect } from 'react';
import { View, Text } from 'react-native';
import { MealPlanContext } from './MealPlanningContext.js';

const MealPlanning = () => {
  const { mealPlan } = useContext(MealPlanContext);

  useEffect(() => {
    console.log('mealPlan:', mealPlan);
  }, [mealPlan]);

  return (
    <View>
      <Text>Meal Planning</Text>
      <Text>Breakfast: {mealPlan.Breakfast.join(', ')}</Text>
      <Text>Lunch: {mealPlan.Lunch.join(', ')}</Text>
      <Text>Snack: {mealPlan.Snack.join(', ')}</Text>
      <Text>Dinner: {mealPlan.Dinner.join(', ')}</Text>
    </View>
  );
};

export default MealPlanning;
