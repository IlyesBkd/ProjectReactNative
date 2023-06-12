import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const MealPlanContext = createContext();

export const MealPlanProvider = ({ children }) => {
  const [mealPlan, setMealPlan] = useState({
    Monday: {
      Breakfast: [],
      Lunch: [],
      Snack: [],
      Dinner: [],
    },
    Tuesday: {
      Breakfast: [],
      Lunch: [],
      Snack: [],
      Dinner: [],
    },
    Wednesday: {
      Breakfast: [],
      Lunch: [],
      Snack: [],
      Dinner: [],
    },
    Thursday: {
      Breakfast: [],
      Lunch: [],
      Snack: [],
      Dinner: [],
    },
    Friday: {
      Breakfast: [],
      Lunch: [],
      Snack: [],
      Dinner: [],
    },
    Saturday: {
      Breakfast: [],
      Lunch: [],
      Snack: [],
      Dinner: [],
    },
    Sunday: {
      Breakfast: [],
      Lunch: [],
      Snack: [],
      Dinner: [],
    },
  });

  const saveMealPlanToStorage = async (plan) => {
    try {
      await AsyncStorage.setItem('@mealPlan', JSON.stringify(plan));
    } catch (error) {
      console.error('Error while saving meal plan to storage:', error);
    }
  };

  const getMealPlanFromStorage = async () => {
    try {
      const storedMealPlan = await AsyncStorage.getItem('@mealPlan');
      if (storedMealPlan !== null) {
        setMealPlan(JSON.parse(storedMealPlan));
      }
    } catch (error) {
      console.error('Error while retrieving meal plan from storage:', error);
    }
  };

  useEffect(() => {
    getMealPlanFromStorage();
  }, []);

  useEffect(() => {
    if (mealPlan !== null) {
      saveMealPlanToStorage(mealPlan);
    }
  }, [mealPlan]);

  return (
    <MealPlanContext.Provider value={{ mealPlan, setMealPlan}}>
      {children}
    </MealPlanContext.Provider>
  );
};
