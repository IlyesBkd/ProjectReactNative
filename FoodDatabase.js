import React, { useState, useContext } from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  Button,
  Text,
  Image,
  Modal,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import axios from 'axios';
import { MealPlanContext } from './MealPlanningContext.js';
import { MaterialIcons } from '@expo/vector-icons';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F5F5F5',
  },
  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  searchInput: {
    flex: 1,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 10,
  },
  searchButton: {
    marginLeft: 10,
  },
  suggestionContainer: {
    marginBottom: 10,
    backgroundColor: '#FFFFFF',
    borderRadius: 5,
    elevation: 3,
  },
  suggestionItem: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    backgroundColor: '#f0f0f0',
  },
  suggestionList: {
    width: '100%',
    marginTop: 8,
  },
  suggestionText: {
    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  resultContainer: {
    marginTop: 20,
    marginBottom: 10,
    alignItems: 'center',
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  resultText: {
    fontSize: 16,
    marginBottom: 5,
  },
  resultImage: {
    width: 200,
    height: 200,
    marginBottom: 10,
    alignSelf: 'center',
  },
  picker: {
    marginBottom: 10,
  },
  confirmButton: {
    marginBottom: 20,
  },
  button: {
    marginTop: 10,
    backgroundColor: '#4287f5',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
});

const FoodDatabase = () => {
  const [searchRequete, setSearchRequete] = useState('');
  const [searchResults, setSearchResults] = useState(null);
  const [error, setError] = useState(null);
  const [selectedFoods, setSelectedFoods] = useState([]);
  const [showPicker, setShowPicker] = useState(false);
  const [selectedMeal, setSelectedMeal] = useState('Breakfast');
  const [selectedDay, setSelectedDay] = useState('Monday');
  const [suggestions, setSuggestions] = useState([]);
  const { mealPlan, setMealPlan } = useContext(MealPlanContext);

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
    setSearchRequete(query);
    setSuggestions([]);

    try {
      const response = await axios.get(
        `https://api.edamam.com/auto-complete?app_id=190a734c&app_key=9115f8a7aefa3d9acc780dc40f6f3908&q=${query}&limit=3`
      );

      const suggestions = response.data.slice(0, 3);
      setSuggestions(suggestions);
    } catch (error) {
      console.error('Error while fetching autocomplete suggestions:', error);
    }
  };

  const handleSearch = async () => {
    if (searchRequete.trim() === '') {
      setError('Please enter a food to search');
      return;
    }

    try {
      const response = await fetch(
        `https://api.edamam.com/api/food-database/v2/parser?app_id=190a734c&app_key=9115f8a7aefa3d9acc780dc40f6f3908&ingr=${searchRequete}&nutrition-type=cooking`
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
    setSearchRequete('');
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
    setSearchRequete(suggestion);
    setSuggestions([]);

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
      <View style={styles.searchInputContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search for a food"
          value={searchRequete}
          onChangeText={handleInputChange}
        />
        <TouchableOpacity
          style={styles.searchButton}
          onPress={handleSearch}
        >
          <MaterialIcons name="search" size={24} color="black" />
        </TouchableOpacity>
      </View>

      <FlatList
        data={suggestions}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.suggestionItem}
            onPress={() => handleSuggestionSelection(item)}
          >
            <Text>{item}</Text>
          </TouchableOpacity>
        )}
        style={styles.suggestionList}
      />

      {error && <Text>{error}</Text>}
      {searchResults && (
        <View style={styles.resultContainer}>
          <Text style={styles.label}>Food :</Text>
          {searchResults.label && (
            <Text style={styles.resultText}>{searchResults.label}</Text>
          )}

          <Text style={styles.label}>Number of Calories :</Text>
          {searchResults.nutrients.ENERC_KCAL && (
            <Text style={styles.resultText}>
              {Math.round(searchResults.nutrients.ENERC_KCAL)} calories
            </Text>
          )}

          <Text style={styles.label}>Number of Proteins :</Text>
          {searchResults.nutrients.PROCNT && (
            <Text style={styles.resultText}>
              {Math.round(searchResults.nutrients.PROCNT)} proteins
            </Text>
          )}

          <Text style={styles.label}>Number of FAT :</Text>
          {searchResults.nutrients.FAT && (
            <Text style={styles.resultText}>
              {Math.round(searchResults.nutrients.FAT)} Fat
            </Text>
          )}

          {searchResults.image && (
            <Image
              source={{ uri: searchResults.image }}
              style={styles.resultImage}
            />
          )}

          <Button
            title="Add to Meal Plan"
            onPress={handleAddToMealPlan}
            style={styles.button}
            color="#4287f5"
          />

          {showPicker && (
            <Modal visible={showPicker} animationType="slide">
              <View style={styles.modalContainer}>
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
                <Button
                  style={styles.confirmButton}
                  title="Confirm"
                  onPress={handleConfirm}
                />
              </View>
            </Modal>
          )}
        </View>
      )}
    </View>
  );
};

export default FoodDatabase;
