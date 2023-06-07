import React, { useState } from 'react';
import { StyleSheet, View, TextInput, Button, Text } from 'react-native';

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
});

const FoodDatabase = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState(null);
  const [error, setError] = useState(null);

  const handleSearch = async () => {
    try {
      const response = await fetch(
        `https://api.edamam.com/api/food-database/v2/parser?app_id=190a734c&app_key=9115f8a7aefa3d9acc780dc40f6f3908&ingr=${searchQuery}&nutrition-type=cooking`
      );
      const data = await response.json();

      if (data.parsed.length > 0) {
        setSearchResults(data.parsed[0].food);
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
          <Text>Caloric Intake: {searchResults.nutrients.ENERC_KCAL} calories</Text>
        </View>
      )}
    </View>
  );
};

export default FoodDatabase;
