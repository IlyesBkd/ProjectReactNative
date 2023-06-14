import React, { useContext } from 'react';
import { View, Text, Button, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons, FontAwesome5, MaterialIcons, MaterialCommunityIcons   } from '@expo/vector-icons'; 
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
  const getMealIcon = (meal) => {
    switch (meal) {
      case 'Breakfast':
        return <MaterialIcons name="free-breakfast" size={24} color="black" />;
      case 'Lunch':
        return <MaterialIcons name="lunch-dining" size={24} color="black" />;
      case 'Snack':
        return <MaterialCommunityIcons name="food-apple" size={24} color="black" />;
      case 'Dinner':
        return <MaterialIcons name="dinner-dining" size={24} color="black" />;
      default:
        return null;
    }
  };

  return (
    <ScrollView>
    <View style={styles.container}>
        <TouchableOpacity style={styles.addButton} onPress={handleAddFood}>
          <FontAwesome5 name="plus" size={16} color="#fff" />
          <Text style={styles.addButtonText}>Add Food</Text>
        </TouchableOpacity>

        {Object.entries(mealPlan).map(([day, meals]) => (
          <View key={day} style={styles.dayContainer}>
            <View style={styles.dayTitleContainer}>
              <Ionicons name="today-outline" size={24} color="black" />
              <Text style={styles.dayTitle}>{day}</Text>
            </View>

            {Object.entries(meals).map(([meal, foods]) => (
              <View key={meal} style={styles.mealContainer}>
                <View style={styles.mealHeader}>
                  {getMealIcon(meal)}
                  <Text style={styles.mealTitle}>{meal}</Text>
                </View>

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
    </ScrollView>
  );
};

export default MealPlanning;

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
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  dayTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dayTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 5,
  },
  mealContainer: {
    marginBottom: 10,
  },
  mealHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  mealTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 5,
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
    color: 'red',
  },
});

