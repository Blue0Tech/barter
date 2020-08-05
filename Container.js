import React from 'react';
import { StyleSheet, Text, View, TextInput, KeyboardAvoidingView, TouchableOpacity, Alert } from 'react-native';
import firebase from 'firebase';
import 'firebase/auth';
import db from './config';
import SignupLoginScreen from './screens/SignupLoginScreen';
import TabNavigation from './TabNavigation';
import { createSwitchNavigator, createAppContainer } from 'react-navigation';

const switchNavigator = createSwitchNavigator({
    SignupLogin : {screen : SignupLoginScreen},
    MainUI : {screen : TabNavigation}
});

const AppContainer = createAppContainer(switchNavigator);

export default AppContainer;