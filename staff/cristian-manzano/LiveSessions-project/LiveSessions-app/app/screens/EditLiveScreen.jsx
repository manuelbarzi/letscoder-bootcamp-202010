import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from "expo-image-picker";

import { Alert, Button, View, StyleSheet, Image, TextInput, Dimensions, ScrollView, Text, Linking, TouchableOpacity, KeyboardAvoidingView, SafeAreaView } from 'react-native';


export default function PetitionScreen({ onModifyLive, onGoToProfile, live }) {
    const [title, setTitle] = useState(live.title)
    const [liveDate, setLiveDate] = useState(live.liveDate)
    const [duration, setDuration] = useState(live.duration)
    const [description, setDescription] = useState(live.description)
    const [payment, setPayment] = useState(live.payment)
    const liveId = live._id

    const [imageUri, setImageUri] = useState();
    
    const requestPermission = async () => {
        const { granted } = await ImagePicker.requestCameraPermissionsAsync();
        if (!granted) alert("You need to enable permission to access the library");
    };
    useEffect(() => {
        requestPermission();
    }, []);

    const selectImage = async () => {
        const result = await ImagePicker.launchImageLibraryAsync();
        if (!result.cancelled) setImageUri({ localUri: result.uri });
        else console.log("Error reading image");
    };

    return (
        <SafeAreaView>
            <KeyboardAvoidingView
                behavior={Platform.OS == "ios" && "android" ? "padding" : "height"}
            >
                <ScrollView>

                    <TouchableOpacity onPress={onGoToProfile}>
                        <Image style={styles.logo} source={require('../assets/promoter-role-image.png')} />
                    </TouchableOpacity>

                    <View style={styles.LivePetitionContainer}>
                        <View style={styles.imagecontainer}>

                            <Image
                                source={
                                    imageUri
                                        ? { uri: imageUri.localUri }
                                        : require("../assets/default-profile-image.png")
                                }
                                style={{ width: 150, height: 150 }}
                            />
                            <Button
                            /* style={styles.imageUpload} */ title="select image"
                                onPress={selectImage}
                            />
                        </View>
                        <TextInput
                            placeholder=' Title'
                            style={styles.livesInputs}
                            placeholderTextColor="#343a40"
                            onChangeText={title => setTitle(title)}
                            defaultValue={(live.title ? ' ' + live.title : '')}
                        >
                        </TextInput>

                        <TextInput
                            placeholder=' Date'
                            style={styles.livesInputs}
                            placeholderTextColor="#343a40"
                            onChangeText={liveDate => setLiveDate(liveDate)}
                            defaultValue={(live.liveDate ? ' ' + live.liveDate : '')}
                        >
                        </TextInput>

                        <TextInput
                            placeholder=' Duration'
                            style={styles.livesInputs}
                            placeholderTextColor="#343a40"
                            onChangeText={duration => setDuration(duration)}

                            defaultValue={(live.duration ? ' ' + live.duration : '')}
                        >
                        </TextInput>

                        <TextInput
                            placeholder=' Description'
                            style={styles.livesInputs}
                            placeholderTextColor="#343a40"
                            onChangeText={description => setDescription(description)}

                            defaultValue={(live.description ? ' ' + live.description : '')}
                        >
                        </TextInput>

                        <TextInput
                            placeholder=' Payment'
                            style={styles.livesInputs}
                            placeholderTextColor="#343a40"
                            onChangeText={payment => setPayment(payment)}

                            defaultValue={(live.payment ? ' ' + live.payment : '')}
                        >
                        </TextInput>

                        <TouchableOpacity style={styles.submitPetitionButton}
                            onPress={() => { onModifyLive({ imageUri, liveId, title, liveDate, duration, payment, description }) }}>
                            <Text style={styles.buttonText}>Save!</Text>
                        </TouchableOpacity>

                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({

    LivePetitionContainer: {
        justifyContent: "space-evenly",
        // marginTop: "-15%",
        height: Dimensions.get("window").height,
        width: Dimensions.get("window").width,
    },

    livesInputs: {
        marginLeft: "5%",
        width: "50%",
        height: "5%",
        borderWidth: 1,
        borderColor: "#343a40",
        color: "#343a40"
    },

    submitPetitionButton: {
        alignSelf: "center",
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 1,
        backgroundColor: "gray",
        width: "30%",
        height: "5%"
    }

})

