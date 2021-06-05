import React, {Component, useState, useEffect} from "react"
import {Container, Content, Title, Input, Button, View, Label, Text, Toast} from "native-base"
import {useMutation, useQuery} from "@apollo/client"
import {LOGIN} from "../utils/queries"
import AsyncStorage from "@react-native-community/async-storage"


const WelcomeScreen = ({navigation}) => {

    const [loginMutation, {data, loading} ] = useMutation(LOGIN)
    const [state, updateState] = useState({email: null})
    
    const login = async () => {
        try {
            let resp = await loginMutation({
                variables: {
                    ...state
                }
            })
            if(resp){
                console.log(resp)
                // set the AsyncStorage
                await AsyncStorage.setItem("uat", resp.data.login.token)
                Toast.show({
                    text: "Logged in successfully",
                    buttonText: "Okay"
                })

                navigation.navigate("Dash")
            }
        } catch (error) {
            console.log(error)
            Toast.show({
                text: error.message,
                buttonText: 'Okay'
            })
        }
    }
    return ( 
        <Container style={{backgroundColor: "purple"}}>
            <Content padder>
                <View style={{height: 100}}></View>
                <View style={{height: 100}}>
                    <Title style={{color: "yellow", fontSize: 40}}>Sugar Living</Title>
                </View>
                <View style={{flex: 1, padding: 10}}>
                    <Label style={{color: "#fff"}}>
                        Email
                    </Label>
                    <Input placeholder="Enter your email" value={state.email} style={{backgroundColor: "#dedede", marginTop: 10}} onChangeText={(text)=> updateState({email: text})}>
                    </Input>
                </View>
                <View style={{flex: 1, padding: 10}}>
                    <Button style={{width: "100%", backgroundColor: "yellow", justifyContent: "center"}} onPress={() => login()}>
                        <Text style={{textAlign: "center", color: "#202020"}}>Login</Text>
                    </Button>
                </View>
            </Content>
        </Container>
    )
}

export default WelcomeScreen