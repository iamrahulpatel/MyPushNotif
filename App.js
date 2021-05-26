import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Alert, Animated, Image } from 'react-native';
import messaging from '@react-native-firebase/messaging';

const FadeInView = (props) => {
    const fadeAnim = useRef(new Animated.Value(0)).current  // Initial value for opacity: 0

    React.useEffect(() => {
        Animated.timing(
            fadeAnim,
            {
                toValue: 1,
                duration: 10000,
                useNativeDriver: true
            }
        ).start();
    }, [fadeAnim])

    return (
        <Animated.View                 // Special animatable View
            style={{
                ...props.style,
                opacity: fadeAnim,         // Bind opacity to animated value
            }}
        >
            {props.children}
        </Animated.View>
    );
}

const App = () => {
    useEffect(() => {
        //requesting permission
        requestUserPermission();

        //foreground handler
        const unsubscribe = messaging().onMessage(async remoteMessage => {
            Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
        });

        return unsubscribe;
    }, [])

    //firebase push notification
    const requestUserPermission = async () => {
        const authStatus = await messaging().requestPermission();
        const enabled =
            authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
            authStatus === messaging.AuthorizationStatus.PROVISIONAL;

        if (enabled) {
            getFcmToken()
            console.log('Authorization status:', authStatus);
        }
    }

    const getFcmToken = async () => {
        const fcmToken = await messaging().getToken();
        if (fcmToken) {
            console.log("Your Firebase Token is:", fcmToken);
        } else {
            console.log("Failed", "No token received");
        }
    }

    return (
        <View style={styles.mainView}>
            <Image style={styles.img} source={{ uri: "https://www.gstatic.com/devrel-devsite/prod/v702c60b70d68da067f4d656556a48e4ab1cf14be10bb79e46f353f3fdfe8505d/firebase/images/touchicon-180.png" }} />
            <Text style={styles.txt}>    React Native {"\n"}Push Notification</Text>

        </View>
    );
}

const styles = StyleSheet.create({
    mainView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f9cb2b90"
    },
    img: {
        height: 100,
        width: 100,
    },
    txt: {
        fontSize: 40,
        color: "#000",
        fontFamily: "Arial",
        textShadowColor: 'rgba(0, 0, 0, 0.75)',
        textShadowOffset: { width: -1, height: 1 },
        textShadowRadius: 10
    }
})

export default App;