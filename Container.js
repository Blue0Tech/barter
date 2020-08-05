import React from 'react';
import { StyleSheet, Text, View, TextInput, KeyboardAvoidingView, TouchableOpacity, Alert } from 'react-native';
import firebase from 'firebase';
import 'firebase/auth';
import db from './config';
import SignupLoginScreen from './screens/SignupLoginScreen';
import TabNavigation from './TabNavigation';

export default class Container extends React.Component {
    constructor() {
        super();
        this.state = {
            currentUser : {}
        }
    }
    checkLoggedIn=()=>{
        this.setState({
            currentUser : firebase.auth().currentUser
        });
    }
    componentDidMount() {
        this.checkLoggedIn();
    }
    render() {
        if(this.state.currentUser) {
            return (
                <TabNavigation/>
            )
        } else {
            return (
                <View>
                <SignupLoginScreen/>
                <TouchableOpacity onPress={()=>{this.checkLoggedIn()}}
                style={{
                    alignSelf : 'center',
                    borderWidth : 1,
                }}>
                    <Text>Continue</Text>
                </TouchableOpacity>
                </View>
            )
        }
    }
}