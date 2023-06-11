import React, { useContext } from 'react';
import { View, Text, Button } from 'react-native';
import { MealPlanContext } from './MealPlanningContext.js';

const MealPlanning = ({ navigation }) => {
  const { mealPlan, setMealPlan } = useContext(MealPlanContext);

  const calculateTotalCalories = (foods) => {
    let totalCalories = 0;
    foods.forEach((food) => {
      totalCalories += food.calories;
    });
    return totalCalories;
  };

  const handleAddFood = () => {
    navigation.navigate('FoodDatabase');
  };

  const handleRemoveFood = (day, meal, index) => {
    const updatedMealPlan = { ...mealPlan };
    updatedMealPlan[day][meal].splice(index, 1);
    setMealPlan(updatedMealPlan);
  };

  return (
    <View>
      {Object.entries(mealPlan).map(([day, meals]) => (
        <View key={day}>
          <Text>{day}</Text>
          {Object.entries(meals).map(([meal, foods]) => (
            <View key={meal}>
              <Text>{meal}</Text>
              {foods.map((food, index) => (
                <View key={index}>
                  <Text>{food.label}</Text>
                  <Button title="Remove" onPress={() => handleRemoveFood(day, meal, index)} />
                </View>
              ))}
            </View>
          ))}
          <Text>Total Calories: {calculateTotalCalories(Object.values(meals).flat())}</Text>
        </View>
      ))}
      <Button title="Add Food" onPress={handleAddFood} />
    </View>
  );
};

export default MealPlanning;
