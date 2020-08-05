import React from 'react';
import { StyleSheet, Text, View, TextInput, KeyboardAvoidingView, TouchableOpacity, Alert, FlatList, Button, Dimensions } from 'react-native';
import firebase from 'firebase';
import db from '../config';

export default class PendingRequestsScreen extends React.Component {
    constructor() {
        super();
        this.state = {
            data : [],
            isRefreshing : false
        }
    }
    componentDidMount() {
        var data=[];
        console.log("in here");
        db.collection('items').get().then((items)=>{
            items.forEach((item)=>{
                data.push(item.data());
            });
        });
        this.setState({
            data : data
        });
    }
    updateData=async()=>{
        var data=[];
        await db.collection('items').get().then((items)=>{
            items.forEach((item)=>{
                data.push(item.data());
            });
        });
        this.setState({
            data : data,
            isRefreshing : false
        });
    }
    render() {
        const ViewStyle = {
            width : Dimensions.get('window').width,
            alignContent : 'center',
            alignItems : 'center',
            backgroundColor : '#00ffff',
            borderColor : '#000000',
            borderBottomWidth: StyleSheet.hairlineWidth,
            borderTopWidth : 1,
            margin : 10
        };
        return (
            <View style={{alignItems : 'center', marginTop : 30}}>
                <Text>{firebase.auth().currentUser ? firebase.auth().currentUser.email : "Not logged in"}</Text>
                <TouchableOpacity onPress={()=>{console.log(this.state.data)}}><Text>Log data</Text></TouchableOpacity>
                <FlatList
                    data={this.state.data}
                    initialNumToRender={1}
                    keyExtractor={(item, index)=> index.toString()}
                    refreshing={this.state.isRefreshing}
                    onRefresh={()=>{
                        this.setState({isRefreshing : true});
                        this.updateData();
                    }}
                    renderItem={(item, index)=>{
                        console.log("rendering");
                        <View key={index} style={ViewStyle}>
                            <Text>{item.item}</Text>
                        </View>
                    }}
                />
            </View>
        )
    }
}