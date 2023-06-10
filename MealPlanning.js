import React, { useContext } from 'react';
import { View, Text } from 'react-native';
import { MealPlanContext } from './MealPlanningContext.js';

const MealPlanning = () => {
  const { mealPlan } = useContext(MealPlanContext);

  return (
    <View>
      {Object.entries(mealPlan).map(([day, meals]) => (
        <View key={day}>
          <Text>{day}</Text>
          {Object.entries(meals).map(([meal, foods]) => (
            <View key={meal}>
              <Text>{meal}</Text>
              {foods.map((food, index) => (
                <Text key={index}>{food}</Text>
              ))}
            </View>
          ))}
        </View>
      ))}
    </View>
  );
};

export default MealPlanning;
