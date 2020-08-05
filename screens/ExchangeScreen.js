import React from 'react';
import { StyleSheet, Text, View, TextInput, KeyboardAvoidingView, TouchableOpacity, Alert } from 'react-native';
import firebase from 'firebase';
import db from '../config';

export default class RequestScreen extends React.Component {
    constructor() {
        super();
        this.state={
            item : "",
            desc : ""
        }
    }
    putUpForOffer=async(item,desc)=>{
        db.collection('items').add({
            item : item,
            desc : desc,
            donorEmail : firebase.auth().currentUser.email
        }).then(()=>{
            Alert.alert("Item put up for offer.");
        }).catch((e)=>{
            Alert.alert("Error",e.message);
        });
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
                <TextInput style={styles.textBoxMultiLine}
                placeholder={"Description"}
                onChangeText={
                    (text) => {
                        this.setState({
                            desc : text
                        });
                    }
                }
                
                value={this.state.desc}
                multiline/>
                <TouchableOpacity style={styles.submitButton}
                onPress={()=>{this.putUpForOffer(this.state.item,this.state.desc)}}>
                    <Text>Put up for offer</Text>
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
        width : 150,
        borderWidth : 1,
        margin : 20,
        justifyContent : 'center',
        alignItems : 'center'
    },
    textBoxMultiLine: {
        width: 300,
        minHeight: 40,
        borderWidth: 1.5,
        fontSize: 20,
        margin:10,
        paddingLeft:10
    },
});