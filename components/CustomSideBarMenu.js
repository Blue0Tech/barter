import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import firebase from 'firebase';
import 'firebase/auth';
import db from '../config';
import { DrawerItems } from 'react-navigation-drawer';

export default class CustomSideBarMenu extends React.Component {
    signOut=()=>{
        firebase.auth().signOut();
        this.props.navigation.navigate('SignupLogin');
    }
    render() {
        return (
            <View style={{marginTop : 30}}>
                <DrawerItems {...this.props}/>
                <TouchableOpacity onPress={this.signOut()}>
                    <Text>Log out</Text>
                </TouchableOpacity>
            </View>
        )
    }
}