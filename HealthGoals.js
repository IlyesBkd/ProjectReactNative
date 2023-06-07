import React, { useState } from 'react';
import { Text, View, TextInput, Button } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const HealthGoalsForm = () => {
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [activityLevel, setActivityLevel] = useState('');
  const [healthGoal, setHealthGoal] = useState('');

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
    //TRAITEMENT APRES SOUMETTRE
    setAge('');
    setGender('');
    setHeight('');
    setWeight('');
    setActivityLevel('');
    setHealthGoal('');
  };

  const isFormValid =
    age !== '' &&
    gender !== '' &&
    height !== '' &&
    weight !== '' &&
    activityLevel !== '' &&
    healthGoal !== '';

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
        <Text>Height</Text>
        <TextInput value={height} onChangeText={handleHeightChange} keyboardType="numeric" />
      </View>

      <View>
        <Text>Weight</Text>
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
    </View>
  );
};

export default HealthGoalsForm;
