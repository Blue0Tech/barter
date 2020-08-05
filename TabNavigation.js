import React from 'react';
import { StyleSheet, Text, View, TextInput, KeyboardAvoidingView, TouchableOpacity, Alert } from 'react-native';
import firebase from 'firebase';
import 'firebase/auth';
import db from './config';
import ExchangeScreen from './screens/ExchangeScreen';
import HomeScreen from './screens/HomeScreen';
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';

const tabNavigator = createBottomTabNavigator({
    HomeScreen : {screen : HomeScreen, navigationOptions : {
      title : 'Home',
      tabBarLabel : 'Home'
    }},
    ExchangeScreen : {screen : ExchangeScreen, navigationOptions : {
      title : 'Exchange',
      tabBarLabel : 'Exchange'
    }}
});

const TabNavigation = createAppContainer(tabNavigator);

export default TabNavigation;