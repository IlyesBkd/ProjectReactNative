import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Animated, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import TabNavigator from './TabNavigator.js';
import { MealPlanProvider } from './MealPlanningContext.js';

export default function App() {
  const [splashAnimation, setSplashAnimation] = useState(new Animated.Value(1));
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const animationDuration = 5000; // Durée de l'animation


    Animated.timing(splashAnimation, {
      toValue: 0,
      duration: animationDuration,
      useNativeDriver: true,
    }).start(() => {
      setShowSplash(false);
    });
  }, []);

  return (
    <MealPlanProvider>
      <NavigationContainer>
        {showSplash ? (
          <View style={styles.container}>
            <Animated.Image
              source={require('./assets/NUTRIPLANNER.png')}
              style={[styles.logo, { opacity: splashAnimation }]}
            />
          </View>
        ) : (
          <TabNavigator />
        )}
      </NavigationContainer>
    </MealPlanProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 400,
    height: 400,
  },
});
