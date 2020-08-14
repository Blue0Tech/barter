import React from 'react';
import { StyleSheet, Text, View, TextInput, KeyboardAvoidingView, TouchableOpacity, Alert } from 'react-native';
import firebase from 'firebase';
import 'firebase/auth';
import db from './config';
import SignupLoginScreen from './screens/SignupLoginScreen';
import TabNavigation from './TabNavigation';
import { createSwitchNavigator, createAppContainer } from 'react-navigation';
import { createDrawerNavigator } from 'react-navigation-drawer';
import CustomSideBarMenu from './components/CustomSideBarMenu';
import SettingScreen from './screens/SettingScreen';

const drawerNavigator = createDrawerNavigator({
    TabNavigation : {
        screen : TabNavigation
    },
    SettingScreen : {
        screen : SettingScreen
    }
},
{
    contentComponent : CustomSideBarMenu,
    initialRouteName : 'TabNavigation'
}
);

const switchNavigator = createSwitchNavigator({
    SignupLogin : {screen : SignupLoginScreen},
    MainUI : {screen : drawerNavigator}
});

const AppContainer = createAppContainer(switchNavigator);

export default AppContainer;