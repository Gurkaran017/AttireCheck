import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StyleSheet, ActivityIndicator, View } from 'react-native';
import WelcomeScreen from './src/screens/pages/Splash';
import { storage } from './storage';
import Icon from 'react-native-vector-icons/Ionicons'; // optional for icons

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// Screens
const PostureHome = require('./src/screens/pages/Homepage').default;
const YogaHome = require('./src/screens/pages/YogaHomepage').default;
const AttireHome = require('./src/screens/pages/AttireHomepage').default;
const GroomingHome = require('./src/screens/pages/GroomingHomepage').default;
const BackgroundHome = require('./src/screens/pages/BackgroundHomepage').default;
const PostureMonitoring = require('./src/screens/MonitoringScreen').default;
const YogaMonitoring = require('./src/screens/YogaMonitoring').default;

// Tab Navigator Component
const BottomTabs = () => (
  <Tab.Navigator
    screenOptions={{
      headerShown: false,
      tabBarActiveTintColor: '#14B8A6',
      tabBarLabelStyle: { fontSize: 14, fontWeight: '600' },
    }}
  >
    <Tab.Screen
      name="Posture"
      component={PostureHome}
      options={{
        tabBarIcon: ({ color, size }) => (
          <Icon name="body-outline" color={color} size={size} />
        ),
      }}
    />
    <Tab.Screen
      name="Attire"
      component={AttireHome}
      options={{
        tabBarIcon: ({ color, size }) => (
          <Icon name="shirt-outline" color={color} size={size} />
        ),
      }}
    />
    <Tab.Screen
      name="Yoga"
      component={YogaHome}
      options={{
        tabBarIcon: ({ color, size }) => (
          <Icon name="fitness-outline" color={color} size={size} />
        ),
      }}
    />
    <Tab.Screen
      name="Groom"
      component={GroomingHome}
      options={{
        tabBarIcon: ({ color, size }) => (
          <Icon name="sparkles-outline" color={color} size={size} />
        ),
      }}
    />
    <Tab.Screen
      name="inspect"
      component={BackgroundHome}
      options={{
        tabBarIcon: ({ color, size }) => (
          <Icon name="shield-checkmark-outline" color={color} size={size} />
        ),
      }}
    />
  </Tab.Navigator>
);

const App = () => {
  const [firstTimeUser, setFirstTimeUser] = useState(null);

  useEffect(() => {
    const storedValue = storage.getString('firstTimeUser');
    setFirstTimeUser(storedValue !== 'false');
  }, []);

  const onCompleteOnboarding = () => {
    storage.set('firstTimeUser', 'false');
    setFirstTimeUser(false);
  };

  if (firstTimeUser === null) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Welcome">
        <Stack.Screen
          name="Welcome"
          children={(props) => (
            <WelcomeScreen {...props} onComplete={onCompleteOnboarding} />
          )}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="MainTabs"
          component={BottomTabs}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="PostureMonitoring"
          component={PostureMonitoring}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="YogaMonitoring"
          component={YogaMonitoring}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

const styles = StyleSheet.create({});
