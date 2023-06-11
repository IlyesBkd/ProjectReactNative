import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Créez le contexte MealPlanContext
export const MealPlanContext = createContext();

// Créez le fournisseur du contexte MealPlanContext
export const MealPlanProvider = ({ children }) => {
  const [mealPlan, setMealPlan] = useState({});

  useEffect(() => {
    // Récupérer le plan de repas au chargement de l'application
    getSavedMealPlan();
  }, []);

  const saveMealPlan = async (mealPlan) => {
    try {
      const jsonMealPlan = JSON.stringify(mealPlan);
      await AsyncStorage.setItem('mealPlan', jsonMealPlan);
      console.log('Plan de repas sauvegardé avec succès');
    } catch (error) {
      console.log('Erreur lors de la sauvegarde du plan de repas', error);
    }
  };

  const getMealPlan = async () => {
    try {
      const jsonMealPlan = await AsyncStorage.getItem('mealPlan');
      if (jsonMealPlan !== null) {
        const mealPlan = JSON.parse(jsonMealPlan);
        console.log('Plan de repas récupéré avec succès');
        return mealPlan;
      } else {
        console.log('Aucun plan de repas trouvé');
        return null;
      }
    } catch (error) {
      console.log('Erreur lors de la récupération du plan de repas', error);
      return null;
    }
  };

  const getSavedMealPlan = async () => {
    const savedMealPlan = await getMealPlan();
    if (savedMealPlan) {
      setMealPlan(savedMealPlan);
    }
  };

  return (
    <MealPlanContext.Provider value={{ mealPlan, setMealPlan }}>
      {children}
    </MealPlanContext.Provider>
  );
};

