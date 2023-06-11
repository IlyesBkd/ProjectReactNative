import React, { useContext } from 'react';
import { View, Text, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MealPlanContext } from './MealPlanningContext';

const MealPlanning = () => {
  const { mealPlan, setMealPlan, saveMealPlanToStorage } = useContext(MealPlanContext);
  const navigation = useNavigation();

  const calculateTotalCalories = (foods) => {
    let totalCalories = 0;
    foods.forEach((food) => {
      totalCalories += food.calories;
    });
    return totalCalories;
  };

  const handleAddFood = () => {
    navigation.navigate('Food Database');
  };

  const handleRemoveFood = (day, meal, index) => {
    const updatedMealPlan = { ...mealPlan };
    updatedMealPlan[day][meal].splice(index, 1);
    setMealPlan(updatedMealPlan);
    //saveMealPlanToStorage(updatedMealPlan);
  };

  return (
    <View>
      <Button title="Add Food" onPress={handleAddFood} />
      {Object.entries(mealPlan).map(([day, meals]) => (
        <View key={day}>
          <Text>{day}</Text>
          {Object.entries(meals).map(([meal, foods]) => (
            <View key={meal}>
              <Text>{meal}</Text>
              {foods.map((food, index) => (
                <View key={index}>
                  <Text>{food.label}</Text>
                  <Button
                    title="Remove"
                    onPress={() => handleRemoveFood(day, meal, index)}
                  />
                </View>
              ))}
            </View>
          ))}
          <Text>Total Calories: {calculateTotalCalories(Object.values(meals).flat())}</Text>
        </View>
      ))}
    </View>
  );
};

export default MealPlanning;
