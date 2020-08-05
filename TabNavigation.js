import React from 'react';
import { StyleSheet, Text, View, TextInput, KeyboardAvoidingView, TouchableOpacity, Alert } from 'react-native';
import firebase from 'firebase';
import 'firebase/auth';
import db from './config';
import RequestScreen from './screens/RequestScreen';
import PendingRequestsScreen from './screens/PendingRequestsScreen';
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';

export const tabNavigator = createBottomTabNavigator({
    RequestScreen : {screen : RequestScreen, navigationOptions : {
      title : 'Request a book',
      tabBarLabel : 'Request a book'
    }},
    PendingRequestsScreen : {screen : PendingRequestsScreen, navigationOptions : {
      title : 'See your requests',
      tabBarLabel : 'See your requests'
    }}
});

const TabNavigation = createAppContainer(tabNavigator);

export default TabNavigation;