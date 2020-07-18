import React from 'react';
import { StyleSheet, Text, View, TextInput, KeyboardAvoidingView, TouchableOpacity, Alert } from 'react-native';
import firebase from 'firebase';
import db from '../config';

export default class SignupLoginScreen extends React.Component {
    constructor() {
        super();
        this.state = {
            email : '',
            password : ''
        }
    }
    login=(email,password)=>{
        firebase.auth().signInWithEmailAndPassword(email,password).then((response)=>{
            Alert.alert("Successfully logged in!");
            console.log("Successfully logged in!");
        }).catch((e)=>{
            Alert.alert("Failed to log in: "+e.message);
            console.error("Failed to log in: "+e.message);
        });
    }
    signup=(email,password)=>{
        firebase.auth().createUserWithEmailAndPassword(email,password).then((response)=>{
            Alert.alert("Successfully signed up!");
            console.log("Successfully signed up!");
        }).catch((e)=>{
            Alert.alert("Failed to sign up: "+e.message);
            console.error("Failed to sign up: "+e.message);
        });
    }
    render() {
        return (
            <KeyboardAvoidingView style={{alignItems : 'center', marginTop : 10}}>
                <View>
                    <TextInput style={styles.loginBox}
                    placeholder={"abc@example.com"}
                    keyboardType={"email-address"}
                    onChangeText={
                        (text) => {
                            this.setState({
                                email : text
                            });
                        }
                    }
                    value={this.state.email}/>
                    <TextInput style={styles.loginBox}
                    placeholder={"Enter password"}
                    secureTextEntry={true}
                    onChangeText={
                        (text) => {
                            this.setState({
                                password : text
                            });
                        }
                    }
                    value={this.state.password}/>
                </View>
                <View>
                <TouchableOpacity style={{height : 30, width : 90, borderWidth : 1, margin : 20, justifyContent : 'center'}}
                onPress={()=>{this.login(this.state.email,this.state.password)}}>
                    <Text>Log in</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{height : 30, width : 90, borderWidth : 1, margin : 20, justifyContent : 'center'}}
                onPress={()=>{this.signup(this.state.email,this.state.password)}}>
                    <Text>Sign up</Text>
                </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        )
    }
}

const styles = StyleSheet.create({
    loginBox: {
        width: 300,
        height: 40,
        borderWidth: 1.5,
        fontSize: 20,
        margin:10,
        paddingLeft:10
    }
});