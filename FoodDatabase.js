import React, { useState, useContext } from 'react';
import { StyleSheet, View, TextInput, Button, Text, Image, Modal, FlatList, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import axios from 'axios';
import { MealPlanContext } from './MealPlanningContext.js';

const styles = StyleSheet.create({
});


const FoodDatabase = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState(null);
  const [error, setError] = useState(null);
  const [selectedFoods, setSelectedFoods] = useState([]);
  const [showPicker, setShowPicker] = useState(false);
  const [selectedMeal, setSelectedMeal] = useState('Breakfast');
  const [selectedDay, setSelectedDay] = useState('Monday');
  const [autocompleteSuggestions, setAutocompleteSuggestions] = useState([]);
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

  const handleInputChange = async (query) => {
    setSearchQuery(query);
    setAutocompleteSuggestions([]);

    try {
      const response = await axios.get(
        `https://api.edamam.com/auto-complete?app_id=190a734c&app_key=9115f8a7aefa3d9acc780dc40f6f3908&q=${query}&limit=3`
      );

      const suggestions = response.data;
      setAutocompleteSuggestions(suggestions);
    } catch (error) {
      console.error('Error while fetching autocomplete suggestions:', error);
    }
  };

  const handleSearch = async () => {
    if (searchQuery.trim() === '') {
      setError('Please enter a food to search');
      return;
    }

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
    if (searchResults) {
      addToMealPlan(searchResults.label);
    }
  };

  const handleConfirm = () => {
    if (searchResults) {
      const updatedMealPlan = { ...mealPlan };
      updatedMealPlan[selectedDay][selectedMeal].push({
        label: searchResults.label,
        calories: Math.round(searchResults.nutrients.ENERC_KCAL),
      });
      setMealPlan(updatedMealPlan);
      setShowPicker(false);
    }
  };

  const handleSuggestionSelection = async (suggestion) => {
    setSearchQuery(suggestion);
    setAutocompleteSuggestions([]);

    try {
      const response = await fetch(
        `https://api.edamam.com/api/food-database/v2/parser?app_id=190a734c&app_key=9115f8a7aefa3d9acc780dc40f6f3908&ingr=${suggestion}&nutrition-type=cooking`
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
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search for a food"
        value={searchQuery}
        onChangeText={handleInputChange}
      />
      
      <FlatList
        data={autocompleteSuggestions}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.suggestionItem}
            onPress={() => handleSuggestionSelection(item)}
          >
            <Text>{item}</Text>
          </TouchableOpacity>
        )}
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
                <Text>Select Meal:</Text>
                <Picker
                  style={styles.picker}
                  selectedValue={selectedMeal}
                  onValueChange={handleMealSelection}
                >
                  <Picker.Item label="Breakfast" value="Breakfast" />
                  <Picker.Item label="Lunch" value="Lunch" />
                  <Picker.Item label="Dinner" value="Dinner" />
                  <Picker.Item label="Snack" value="Snack" />
                </Picker>
                <Text>Select Day:</Text>
                <Picker
                  style={styles.picker}
                  selectedValue={selectedDay}
                  onValueChange={handleDaySelection}
                >
                  <Picker.Item label="Monday" value="Monday" />
                  <Picker.Item label="Tuesday" value="Tuesday" />
                  <Picker.Item label="Wednesday" value="Wednesday" />
                  <Picker.Item label="Thursday" value="Thursday" />
                  <Picker.Item label="Friday" value="Friday" />
                  <Picker.Item label="Saturday" value="Saturday" />
                  <Picker.Item label="Sunday" value="Sunday" />
                </Picker>
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
