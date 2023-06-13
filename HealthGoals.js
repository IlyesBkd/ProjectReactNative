import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, Animated } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import BMRResult from './BMRResult.js';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F5F5F5',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  inputContainer: {
    marginBottom: 5,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
  input: {
    width: 200,
    height: 40,
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  pickerContainer: {
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 20,
    width: 200,
  },
  button: {
    width: 150,
    height: 40,
    backgroundColor: '#FF6F61',
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
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
  const buttonAnimation = useState(new Animated.Value(0))[0];

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

    // Animation du bouton
    Animated.sequence([
      Animated.timing(buttonAnimation, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(buttonAnimation, {
        toValue: 0,
        duration: 200,
        delay: 1500,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const FormValid = () =>
    age !== '' &&
    gender !== '' &&
    height !== '' &&
    weight !== '' &&
    activityLevel !== '' &&
    healthGoal !== '';

  const buttonScale = buttonAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 1.2],
  });

  const buttonStyle = {
    transform: [{ scale: buttonScale }],
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>❤️ Health Goals ❤️</Text>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Age</Text>
        <TextInput style={styles.input} value={age} onChangeText={handleAgeChange} />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Gender</Text>
        <Picker
          style={styles.pickerContainer}
          selectedValue={gender}
          onValueChange={handleGenderChange}>
          <Picker.Item label="Masculin" value="masculin" />
          <Picker.Item label="Féminin" value="féminin" />
        </Picker>
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Height (in cm)</Text>
        <TextInput
          style={styles.input}
          value={height}
          onChangeText={handleHeightChange}
          keyboardType="numeric"
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Weight (in kg)</Text>
        <TextInput
          style={styles.input}
          value={weight}
          onChangeText={handleWeightChange}
          keyboardType="numeric"
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Activity Level</Text>
        <Picker
          style={styles.pickerContainer}
          selectedValue={activityLevel}
          onValueChange={handleActivityLevelChange}>
          <Picker.Item label="Sedentary" value="sedentary" />
          <Picker.Item label="Light exercise" value="light exercise" />
          <Picker.Item label="Moderate exercise" value="moderate exercise" />
          <Picker.Item label="Heavy exercise" value="exercice intense" />
          <Picker.Item label="Extra active" value="Extra active" />
        </Picker>
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Health Goal</Text>
        <Picker
          style={styles.pickerContainer}
          selectedValue={healthGoal}
          onValueChange={handleHealthGoalChange}>
          <Picker.Item label="Weight loss" value="weight loss" />
          <Picker.Item label="Weight maintenance" value="weight maintenance" />
          <Picker.Item label="Weight gain" value="weight gain" />
        </Picker>
      </View>

      <Animated.View style={[styles.button, buttonStyle]}>
        <Button title="Calculate" onPress={handleSubmit} disabled={!FormValid} color="#FF6F61" />
      </Animated.View>

      <BMRResult bmr={bmrCalculated} />
    </View>
  );
};

export default HealthGoalsForm;
