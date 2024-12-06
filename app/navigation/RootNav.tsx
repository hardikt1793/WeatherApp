import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {Details, Home, Settings} from '@screens/index';
import {NavigationContainer} from '@react-navigation/native';
import {StatusBar} from 'react-native';
const RootNav = () => {
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <StatusBar
        backgroundColor={'transparent'}
        translucent={true}
        barStyle={'light-content'}
      />
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen
          name="Details"
          component={Details}
          options={{animation: 'slide_from_right'}}
        />
        <Stack.Screen
          name="Settings"
          component={Settings}
          options={{animation: 'slide_from_right'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNav;
