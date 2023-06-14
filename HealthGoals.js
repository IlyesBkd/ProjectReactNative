import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, ScrollView, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import BMRResult from './BMRResult.js';
import { MaterialIcons, MaterialCommunityIcons, FontAwesome5, Ionicons } from '@expo/vector-icons';

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
  const [gender, setGender] = useState('masculin');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [activityLevel, setActivityLevel] = useState('moderate exercise');
  const [healthGoal, setHealthGoal] = useState('weight maintenance');
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
    if (!age){
      Alert.alert("Error", "You must enter your age !");
      return;
    }
    if (!height){
      Alert.alert("Error", "You must enter your height (in cm) !");
      return;
    }
    if (!weight){
      Alert.alert("Error", "You must enter your weight (in kg) !");
      return;
    }

    const bmrCalculated = CalculatingBMR(age, gender, height, weight, activityLevel, healthGoal);
    setBmrCalculated(bmrCalculated);
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.inputContainer}>
          <View style={styles.labelContainer}>
            <FontAwesome5 name="birthday-cake" size={24} color="black" />
            <Text style={styles.label}>Age</Text>
          </View>
          <TextInput style={styles.input} value={age} onChangeText={handleAgeChange} />
        </View>

        <View style={styles.inputContainer}>
          <View style={styles.labelContainer}>
            <MaterialCommunityIcons name="gender-male-female" size={24} color="black" />
            <Text style={styles.label}>Gender</Text>
          </View>
          <Picker
            style={styles.pickerContainer}
            selectedValue={gender}
            onValueChange={handleGenderChange}>
            <Picker.Item label="Masculin" value="masculin" />
            <Picker.Item label="Féminin" value="féminin" />
          </Picker>
        </View>

        <View style={styles.inputContainer}>
          <View style={styles.labelContainer}>
            <MaterialCommunityIcons name="human-male-height" size={24} color="black" />
            <Text style={styles.label}>Height (in cm)</Text>
          </View>
          <TextInput
            style={styles.input}
            value={height}
            onChangeText={handleHeightChange}
            keyboardType="numeric"
          />
        </View>

        <View style={styles.inputContainer}>
          <View style={styles.labelContainer}>
            <FontAwesome5 name="weight" size={24} color="black" />
            <Text style={styles.label}>Weight (in kg)</Text>
          </View>
          <TextInput
            style={styles.input}
            value={weight}
            onChangeText={handleWeightChange}
            keyboardType="numeric"
          />
        </View>

        <View style={styles.inputContainer}>
          <View style={styles.labelContainer}>
            <MaterialIcons name="fitness-center" size={24} color="black" />
            <Text style={styles.label}>Activity Level</Text>
          </View>
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
          <View style={styles.labelContainer}>
            <Ionicons name="fitness-sharp" size={24} color="black" />
            <Text style={styles.label}>Health Goal</Text>
          </View>
          <Picker
            style={styles.pickerContainer}
            selectedValue={healthGoal}
            onValueChange={handleHealthGoalChange}>
            <Picker.Item label="Weight loss" value="weight loss" />
            <Picker.Item label="Weight maintenance" value="weight maintenance" />
            <Picker.Item label="Weight gain" value="weight gain" />
          </Picker>
        </View>

        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={handleSubmit}
          disabled={!age || !gender || !height || !weight || !activityLevel || !healthGoal}
        >
          <MaterialIcons name="calculate" size={24} color="black" />
          <Text style={styles.buttonText}>Calculate</Text>
        </TouchableOpacity>

        <BMRResult bmr={bmrCalculated} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F5F5F5',
    marginTop: 20,
  },
  inputContainer: {
    marginBottom: 7,
  },
  labelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  label: {
    fontSize: 16,
    marginLeft: 8,
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
    marginBottom: 8,
    width: 200,
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2196F3',
    borderRadius: 5,
    width: 200,
    height: 40,
    marginBottom: 20,
  },
  buttonText: {
    color: 'black',
    fontSize: 16,
    marginLeft: 8,
  },
});

export default HealthGoalsForm;
