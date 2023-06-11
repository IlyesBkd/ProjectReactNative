import React, { useState, useContext } from 'react';
import { StyleSheet, View, TextInput, Button, Text, Image, Modal } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { MealPlanContext } from './MealPlanningContext.js';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchInput: {
    width: '80%',
    height: 40,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 8,
    paddingHorizontal: 8,
    marginBottom: 16,
  },
  pickerContainer: {
    width: '80%',
    height: 40,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 8,
    marginBottom: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  picker: {
    width: '100%',
    height: 40,
  },
});

const FoodDatabase = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState(null);
  const [error, setError] = useState(null);
  const [selectedFoods, setSelectedFoods] = useState([]);
  const [showPicker, setShowPicker] = useState(false);
  const [selectedMeal, setSelectedMeal] = useState('Breakfast');
  const [selectedDay, setSelectedDay] = useState('Monday');
  const { mealPlan, setMealPlan, saveMealPlanToStorage } = useContext(MealPlanContext);

  const handleMealSelection = (meal) => {
    setSelectedMeal(meal);
  };

  const handleDaySelection = (day) => {
    setSelectedDay(day);
  };

  const addToMealPlan = (food) => {
    const foodWithMeal = { ...food, meal: selectedMeal };
    setSelectedFoods([...selectedFoods, foodWithMeal]);
    setShowPicker(true);
  };

  const handleSearch = async () => {
    try {
      const response = await fetch(
        `https://api.edamam.com/api/food-database/v2/parser?app_id=190a734c&app_key=9115f8a7aefa3d9acc780dc40f6f3908&ingr=${searchQuery}&nutrition-type=cooking`
      );
      const data = await response.json();

      if (data.hints.length > 0) {
        setSearchResults(data.hints[0].food);
        setError(null);
      } else {
        setSearchResults(null);
        setError('Food not found');
      }
    } catch (error) {
      console.error('Error while fetching search results:', error);
      setSearchResults(null);
      setError('An error occurred');
    }
    setSearchQuery('');
  };

  const handleAddToMealPlan = () => {
    addToMealPlan(searchResults.label);
  };

  const handleConfirm = () => {
    const updatedMealPlan = { ...mealPlan };
    updatedMealPlan[selectedDay][selectedMeal].push({
      label: searchResults.label,
      calories: Math.round(searchResults.nutrients.ENERC_KCAL),
    });
    setMealPlan(updatedMealPlan);
    //saveMealPlanToStorage(updatedMealPlan);
    setShowPicker(false);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search for a food"
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
      <Button title="Search" onPress={handleSearch} />

      {error && <Text>{error}</Text>}
      {searchResults && (
        <View>
          <Text>Food: {searchResults.label}</Text>
          <Text>Number of Calories: {Math.round(searchResults.nutrients.ENERC_KCAL)} calories</Text>
          {searchResults.image && (
            <Image source={{ uri: searchResults.image }} style={{ width: 200, height: 200 }} />
          )}
          <Button title="Add to Meal Plan" onPress={handleAddToMealPlan} />
          {showPicker && (
            <Modal visible={showPicker} animationType="slide">
              <View style={styles.container}>
                <View style={styles.pickerContainer}>
                  <Picker
                    selectedValue={selectedMeal}
                    onValueChange={handleMealSelection}
                    style={styles.picker}>
                    <Picker.Item label="Breakfast" value="Breakfast" />
                    <Picker.Item label="Lunch" value="Lunch" />
                    <Picker.Item label="Dinner" value="Dinner" />
                    <Picker.Item label="Snack" value="Snack" />
                  </Picker>
                </View>
                <View style={styles.pickerContainer}>
                  <Picker
                    selectedValue={selectedDay}
                    onValueChange={handleDaySelection}
                    style={styles.picker}>
                    <Picker.Item label="Monday" value="Monday" />
                    <Picker.Item label="Tuesday" value="Tuesday" />
                    <Picker.Item label="Wednesday" value="Wednesday" />
                    <Picker.Item label="Thursday" value="Thursday" />
                    <Picker.Item label="Friday" value="Friday" />
                    <Picker.Item label="Saturday" value="Saturday" />
                    <Picker.Item label="Sunday" value="Sunday" />
                  </Picker>
                </View>
                <Button title="Confirm" onPress={handleConfirm} />
              </View>
            </Modal>
          )}
        </View>
      )}
    </View>
  );
};

export default FoodDatabase;
