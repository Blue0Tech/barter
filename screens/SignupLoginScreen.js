import React from 'react';
import { StyleSheet, Text, View, TextInput, KeyboardAvoidingView, TouchableOpacity, Alert, Modal, ScrollView } from 'react-native';
import firebase from 'firebase';
import db from '../config';

export default class SignupLoginScreen extends React.Component {
    constructor() {
        super();
        this.state = {
            email : '',
            password : '',
            isModalVisible : false,
            firstName : '',
            lastName : '',
            contactNumber : '',
            address : '',
            confirmPassword : ''
        }
    }
    login=(email,password)=>{
        firebase.auth().signInWithEmailAndPassword(email,password).then((response)=>{
            Alert.alert("Successfully logged in!");
            console.log("Successfully logged in!");
            this.changeScreen();
        }).catch((e)=>{
            Alert.alert("Error","Failed to log in: "+e.message);
            console.error("Failed to log in: "+e.message);
        });
    }
    changeScreen=()=>{
        this.props.navigation.navigate('MainUI');
    }
    signup=(email,password,confirmPassword,firstName,lastName,contactNumber,address)=>{
        if(password==confirmPassword) {
            firebase.auth().createUserWithEmailAndPassword(email,password).then((response)=>{
                db.collection('users').doc(firebase.auth().currentUser.uid).set({
                    firstName : firstName,
                    lastName : lastName,
                    email : email,
                    contactNumber : contactNumber,
                    address : address
                })
                Alert.alert("Successfully signed up!");
                console.log("Successfully signed up!");
            }).catch((e)=>{
                Alert.alert("Error","Failed to sign up: "+e.message);
                console.error("Failed to sign up: "+e.message);
            });
        } else {
            Alert.alert("Passwords do not match.");
            console.error("Passwords do not match.");
        }
    }
    showModal=()=>{
        return (
            <Modal visible={this.state.isModalVisible} animationType={'slide'}>
                <View>
                    <ScrollView style={{width : '100%'}}>
                        <KeyboardAvoidingView>
                            <Text style={styles.modalTitle}>Registeration</Text>
                            <TextInput
                            style={styles.formTextInput}
                                placeholder={"First name"}
                                value={this.state.firstName}
                                maxLength={15}
                                onChangeText={
                                    (text)=>{
                                        this.setState({
                                            firstName : text
                                        });
                                    }
                                }
                            />
                            <TextInput
                                style={styles.formTextInput}
                                placeholder={"Last name"}
                                value={this.state.lastName}
                                maxLength={15}
                                onChangeText={
                                    (text)=>{
                                        this.setState({
                                            lastName : text
                                        });
                                    }
                                }
                            />
                            <TextInput
                                style={styles.formTextInput}
                                placeholder={"Email address"}
                                value={this.state.email}
                                keyboardType={"email-address"}
                                onChangeText={
                                    (text)=>{
                                        this.setState({
                                            email : text
                                        });
                                    }
                                }
                            />
                            <TextInput
                                style={styles.formTextInput}
                                placeholder={"Contact number"}
                                value={this.state.contactNumber}
                                maxLength={14}
                                keyboardType={"numeric"}
                                onChangeText={
                                    (text)=>{
                                        this.setState({
                                            contactNumber : text
                                        });
                                    }
                                }
                            />
                            <TextInput
                            style={styles.formTextInputMultiline}
                                placeholder={"Address"}
                                value={this.state.address}
                                multiline={true}
                                onChangeText={
                                    (text)=>{
                                        this.setState({
                                            address : text
                                        });
                                    }
                                }
                            />
                            <TextInput
                                style={styles.formTextInput}
                                placeholder={"Password"}
                                value={this.state.password}
                                secureTextEntry={true}
                                onChangeText={
                                    (text)=>{
                                        this.setState({
                                            password : text
                                        });
                                    }
                                }
                            />
                            <TextInput
                                style={styles.formTextInput}
                                placeholder={"Confirm password"}
                                value={this.state.confirmPassword}
                                secureTextEntry={true}
                                onChangeText={
                                    (text)=>{
                                        this.setState({
                                            confirmPassword : text
                                        });
                                    }
                                }
                            />
                            <View style={{alignSelf : 'center'}}>
                                <TouchableOpacity
                                style={styles.registerButton}
                                    onPress={()=>{
                                        this.signup(this.state.email,this.state.password,this.state.confirmPassword,this.state.firstName,this.state.lastName,this.state.contactNumber,this.state.address);
                                    }}
                                >
                                    <Text style={styles.registerButtonText}>Register</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={{alignSelf : 'center'}}>
                            <TouchableOpacity
                            style={styles.cancelButton}
                                    onPress={()=>{this.setState({
                                        isModalVisible : false
                                    })}
                                }
                                >
                                    <Text style={{color : '#ff5722'}}>Cancel</Text>
                                </TouchableOpacity>
                            </View>
                        </KeyboardAvoidingView>
                    </ScrollView>
                </View>
            </Modal>
        )
    }
    render() {
        return (
            <KeyboardAvoidingView style={{alignItems : 'center', marginTop : 25}}>
                <View>
                    {this.showModal()}
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
                onPress={async()=>{
                    await this.setState({isModalVisible : true});
                    this.showModal();
                }}>
                    <Text>Sign up</Text>
                </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        marginTop : 30
    },
    content:{
        marginTop : 30,
        backgroundColor:'#F8BE85',
        alignItems: 'center',
        justifyContent: 'center'
    },
    profileContainer:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
    },
    title :{
        fontSize:30,
        marginTop : 30,
        fontWeight:'300',
        color : '#ff3d00'
    },
    loginBox:{
        width: 300,
        height: 40,
        borderBottomWidth: 1.5,
        borderColor : '#ff8a65',
        fontSize: 20,
        margin:10,
        paddingLeft:10
    },
    KeyboardAvoidingView:{
        // flex:1,
        justifyContent:'center',
        alignItems:'center'
    },
    modalTitle :{
        justifyContent:'center',
        alignSelf:'center',
        fontSize:30,
        color:'#ff5722',
        margin:50
    },
    modalContainer:{
        flex:1,
        borderRadius:20,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:"#ffff",
        marginRight:30,
        marginLeft : 30,
        marginTop:80,
        marginBottom:80,
    },
    formTextInput:{
        width:"75%",
        height:35,
        alignSelf:'center',
        borderColor:'#ffab91',
        borderRadius:10,
        borderWidth:1,
        marginTop:20,
        padding:10
    },
    formTextInputMultiline:{
        width:"75%",
        minHeight : 35,
        alignSelf:'center',
        borderColor:'#ffab91',
        borderRadius:10,
        borderWidth:1,
        marginTop:20,
        padding:10
    },
    registerButton:{
        width:200,
        height:40,
        alignItems:'center',
        justifyContent:'center',
        borderWidth:1,
        borderRadius:10,
        marginTop:30
    },
    registerButtonText:{
        color:'#ff5722',
        fontSize:15,
        fontWeight:'bold'
    },
    cancelButton:{
        width:200,
        height:30,
        justifyContent:'center',
        alignItems:'center',
        marginTop:5,
    },
    button:{
        width:300,
        height:50,
        justifyContent:'center',
        alignItems:'center',
        borderRadius:25,
        backgroundColor:"#ff9800",
        shadowColor: "#000",
        shadowOffset: {
        width: 0,
        height: 8,
        },
        shadowOpacity: 0.30,
        shadowRadius: 10.32,
        elevation: 16,
        padding: 10
    },
    buttonText:{
        color:'#ffff',
        fontWeight:'200',
        fontSize:20
    }
});