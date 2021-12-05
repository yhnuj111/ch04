/* eslint-disable react-native/no-inline-styles */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from './home';
import DetailScreen from './detail';



const Stack = createNativeStackNavigator();

export default class App extends Component {
  render() {
    return (
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Root">
            <Stack.Screen name="Root" component={HomeScreen} options={{ title: '首页', headerShown: false }} />
            <Stack.Screen name="Details" component={DetailScreen} options={{ title: '详情', headerShown: false }} />
          </Stack.Navigator>
        </NavigationContainer>
    );
  }
}
