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

  const saveMealPlanningToStorage = async (plan) => {
    try {
      await AsyncStorage.setItem('@mealPlanning', JSON.stringify(plan));
    } catch (error) {
      console.error('Error while saving meal planning to storage:', error);
    }
  };

  const getMealPlanningFromStorage = async () => {
    try {
      const storageMealPlan = await AsyncStorage.getItem('@mealPlanning');
      if (storageMealPlan !== null) {
        setMealPlan(JSON.parse(storageMealPlan));
      }
    } catch (error) {
      console.error('Error while finding meal planning from storage:', error);
    }
  };

  useEffect(() => {
    getMealPlanningFromStorage();
  }, []);

  useEffect(() => {
    if (mealPlan !== null) {
        saveMealPlanningToStorage(mealPlan);
    }
  }, [mealPlan]);

  return (
    <MealPlanContext.Provider value={{ mealPlan, setMealPlan }}>
      {children}
    </MealPlanContext.Provider>
  );
};
