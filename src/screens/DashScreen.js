import React, {Component, useState} from "react"
import {ActivityIndicator, Switch} from "react-native"
import {Container, Content, Title, Input, Button, View, Label, Text, Card, Toast} from "native-base"
import {useMutation, useQuery} from "@apollo/client"
import {MY_ACCESS, MANAGE_DOOR} from "../utils/queries"


const DashScreen = (props) => {

    const [state, updateState] = useState({doors: []})
    const {data: myAccessData, loading: accessLoading}= useQuery(MY_ACCESS, {
        onCompleted: (resp) =>{
            updateState({
                doors: resp.my_access.doors
            })
        }
    })
    const [manageDoorMutation, {data, loading} ] = useMutation(MANAGE_DOOR)

    const manageDoor = async(door_id, status, index) => {
        try {
            let response = await manageDoorMutation({
                variables: {
                    door_id: door_id,
                    door_status: status ? "UNLOCK": "LOCK"
                }
            })

            if(response){
                console.log(response)
                let doors = [...state.doors]
                doors[index] = response.data.manageDoor
                updateState({
                    ...state,
                    doors: doors
                })
    
                Toast.show({
                    text: status? "Unlocked": "Locked"
                })
            }

        } catch (error) {
            Toast.show({
                text: error.message
            })
        }
    }
    
    return (
        <Container>
            <Content padder>
                {
                    !accessLoading?
                    <>
                        <View style={{height: 100}}></View>
                        <View style={{height: 100}}>
                            <Title style={{fontSize: 20}}>Hello, {myAccessData.my_access.me.first_name} {myAccessData.my_access.me.last_name}</Title>
                        </View>
                        <View style={{justifyContent: "center", display: "flex"}}>
                            <Text style={{textAlign: "center"}}>Toggle to lock or unlock</Text>
                        </View>
                        <View style={{height: 100}}></View>
                        <Title style={{textAlign: "left"}}>Doors</Title>
                        {
                            state.doors.map((door, index) => {
                                let status = door.status == "UNLOCKED"? false : true
                                return <Card key={index}>
                                        <View View style={{flex: 2, flexDirection: "row"}}>
                                            <View style={{marginTop: 10, marginBottom: 10, flex: 2, marginLeft: 10}}>
                                                <Text style={{ fontWeight: "700", marginTop: 5}}>
                                                    {door.name}
                                                </Text>
                                            </View>
                                            <View style={{marginTop: 10, marginBottom: 10, flex: 1, marginLeft: 10, flexDirection: "row"}}>
                                                <Text style={{marginRight: 10, marginTop: 5}}> {
                                                    status? "Locked": "Unlocked"
                                                }</Text> 
                                                <Switch 
                                                    ios_backgroundColor="#3e3e3e"
                                                    onValueChange={() => manageDoor(door.id, status, index)}
                                                    value={status}
                                                />
                                            </View>

                                        </View>
                                    </Card>
                            })
                        }
                    </>
                    : <ActivityIndicator />
                }
            </Content>
        </Container>
    )
}

export default DashScreen