import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import BMRResult from './BMRResult.js';

const styles = StyleSheet.create({
});

const CalculatingBMR = (age, gender, height, weight, activityLevel, healthGoal) => {
  let BMR;
  if (gender === 'masculin') {
    BMR = 88.362 + 13.397 * weight + 4.799 * height - 5.677 * age;
  } else if (gender === 'féminin') {
    BMR = 447.593 + 9.247 * weight + 3.098 * height - 4.33 * age;
  } else {
    BMR = null;
  }
  
  switch (activityLevel) {
    case 'sedentary':
      BMR *= 1.2;
      break;
    case 'light exercise':
      BMR *= 1.375;
      break;
    case 'moderate exercise':
      BMR *= 1.55;
      break;
    case 'exercice intense':
      BMR *= 1.725;
      break;
    case 'Extra active':
      BMR *= 1.9;
      break;
    default:
      BMR = null;
  }

  switch (healthGoal) {
    case 'weight loss':
      BMR -= 500;
      break;
    case 'weight gain':
      BMR += 500;
      break;
    default:
      break;
  }

  return BMR;
};

const HealthGoalsForm = () => {
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [activityLevel, setActivityLevel] = useState('');
  const [healthGoal, setHealthGoal] = useState('');
  const [bmrCalculated, setBmrCalculated] = useState(null);

  const handleAgeChange = (text) => {
    setAge(text);
  };

  const handleGenderChange = (value) => {
    setGender(value);
  };

  const handleHeightChange = (text) => {
    setHeight(text);
  };

  const handleWeightChange = (text) => {
    setWeight(text);
  };

  const handleActivityLevelChange = (value) => {
    setActivityLevel(value);
  };

  const handleHealthGoalChange = (value) => {
    setHealthGoal(value);
  };

  const handleSubmit = () => {
    const bmrCalculated = CalculatingBMR(age, gender, height, weight, activityLevel, healthGoal);
    setBmrCalculated(bmrCalculated);

    setAge('');
    setGender('');
    setHeight('');
    setWeight('');
    setActivityLevel('');
    setHealthGoal('');
  };


  const isFormValid = () => {
    return (
      age !== '' &&
      gender !== '' &&
      height !== '' &&
      weight !== '' &&
      activityLevel !== '' &&
      healthGoal !== ''
    );
  };

  return (
    <View>
      <View>
        <Text>Age</Text>
        <TextInput value={age} onChangeText={handleAgeChange} />
      </View>

      <View>
        <Text>Gender</Text>
        <Picker selectedValue={gender} onValueChange={handleGenderChange}>
          <Picker.Item label="Masculin" value="masculin" />
          <Picker.Item label="Féminin" value="féminin" />
        </Picker>
      </View>

      <View>
        <Text>Height (in cm)</Text>
        <TextInput value={height} onChangeText={handleHeightChange} keyboardType="numeric" />
      </View>

      <View>
        <Text>Weight (in kg)</Text>
        <TextInput value={weight} onChangeText={handleWeightChange} keyboardType="numeric" />
      </View>

      <View>
        <Text>Activity level</Text>
        <Picker selectedValue={activityLevel} onValueChange={handleActivityLevelChange}>
          <Picker.Item label="Sedentary" value="sedentary" />
          <Picker.Item label="Light exercise" value="light exercise" />
          <Picker.Item label="Moderate exercise" value="moderate exercise" />
          <Picker.Item label="Heavy exercise" value="exercice intense" />
          <Picker.Item label="Extra active" value="Extra active" />
        </Picker>
      </View>

      <View>
        <Text>Health goal</Text>
        <Picker selectedValue={healthGoal} onValueChange={handleHealthGoalChange}>
          <Picker.Item label="Weight loss" value="weight loss" />
          <Picker.Item label="Weight maintenance" value="weight maintenance" />
          <Picker.Item label="Weight gain" value="weight gain" />
        </Picker>
      </View>

      <Button title="Submit" onPress={handleSubmit} disabled={!isFormValid} />

      {/* Affichez la valeur de BMR en utilisant le composant BMRResult */}
      <BMRResult bmr={bmrCalculated} />
    </View>
  );
};

export default HealthGoalsForm;
