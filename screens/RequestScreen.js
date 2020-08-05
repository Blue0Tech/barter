import React from 'react';
import { StyleSheet, Text, View, TextInput, KeyboardAvoidingView, TouchableOpacity, Alert } from 'react-native';
import firebase from 'firebase';
import db from '../config';

export default class RequestScreen extends React.Component {
    constructor() {
        super();
        this.state={
            item : "",
            donor : ""
        }
    }
    sendRequest=async()=>{
        //
    }
    render() {
        return (
            <KeyboardAvoidingView style={{alignItems : 'center', marginTop : 30}}>
                <Text>{firebase.auth().currentUser ? firebase.auth().currentUser.email : "Not logged in"}</Text>
                <TextInput style={styles.textBox}
                placeholder={"Item"}
                onChangeText={
                    (text) => {
                        this.setState({
                            item : text
                        });
                    }
                }
                value={this.state.item}/>
                <TouchableOpacity style={styles.submitButton}
                onPress={()=>{this.sendRequest(this.state.item)}}>
                    <Text>Request</Text>
                </TouchableOpacity>
            </KeyboardAvoidingView>
        )
    }
}

const styles = StyleSheet.create({
    textBox: {
        width: 300,
        height: 40,
        borderWidth: 1.5,
        fontSize: 20,
        margin:10,
        paddingLeft:10
    },
    submitButton : {
        height : 30,
        width : 90,
        borderWidth : 1,
        margin : 20,
        justifyContent : 'center'
    }
});