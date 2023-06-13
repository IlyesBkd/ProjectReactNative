import React, { useContext } from 'react';
import { View, Text, Button, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome5 } from '@expo/vector-icons';
import { MealPlanContext } from './MealPlanningContext';

const MealPlanning = () => {
  const { mealPlan, setMealPlan } = useContext(MealPlanContext);
  const navigation = useNavigation();

  const calculateTotalCalories = (foods) => {
    let totalCalories = 0;
    for (const food of foods) {
      totalCalories += food.calories;
    }
    return totalCalories;
  };

  const handleAddFood = () => {
    navigation.navigate('Food Database');
  };

  const handleRemoveFood = (day, meal, index) => {
    const updatedMealPlan = { ...mealPlan };
    updatedMealPlan[day][meal].splice(index, 1);
    setMealPlan(updatedMealPlan);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.addButton} onPress={handleAddFood}>
        <FontAwesome5 name="plus" size={16} color="#fff" />
        <Text style={styles.addButtonText}>Add Food</Text>
      </TouchableOpacity>

      {Object.entries(mealPlan).map(([day, meals]) => (
        <View key={day} style={styles.dayContainer}>
          <Text style={styles.dayTitle}>{day}</Text>

          {Object.entries(meals).map(([meal, foods]) => (
            <View key={meal} style={styles.mealContainer}>
              <Text style={styles.mealTitle}>{meal}</Text>

              {foods.map((food, index) => (
                <View key={index} style={styles.foodContainer}>
                  <Text style={styles.foodLabel}>{food.label}</Text>
                  <TouchableOpacity
                    style={styles.removeButton}
                    onPress={() => handleRemoveFood(day, meal, index)}
                  >
                    <FontAwesome5 name="trash" size={16} color="#fff" />
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          ))}

          <View style={styles.totalContainer}>
            <Text style={styles.totalLabel}>Total Calories:</Text>
            <Text style={styles.totalCalories}>
              {calculateTotalCalories(Object.values(meals).flat())}
            </Text>
          </View>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#4287f5',
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
  },
  addButtonText: {
    color: '#fff',
    marginLeft: 5,
  },
  dayContainer: {
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  dayTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  mealContainer: {
    marginBottom: 10,
  },
  mealTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  foodContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  foodLabel: {
    fontSize: 14,
  },
  removeButton: {
    backgroundColor: '#f54242',
    padding: 5,
    borderRadius: 5,
  },
  totalContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 5,
  },
  totalCalories: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default MealPlanning;
