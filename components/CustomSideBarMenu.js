import react from 'react';
import { View, Text } from 'react-native';
import firebase from 'firebase';
import 'firebase/auth';
import db from '../config';
import SettingScreen from '../screens/SettingScreen';
import { createDrawerNavigator } from 'react-navigation-drawer';
import TabNavigation from '../TabNavigation';

const drawerNavigator = createDrawerNavigator();

export default drawerNavigator;