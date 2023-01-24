import { Alert, Linking, StyleSheet, Text } from "react-native";
import Geolocation from '@react-native-community/geolocation';
import { useEffect, useState } from "react";

export default function DeliveryTask({ taskId, navigation }) {
    const [locationSubscriptionId, setLocationSubscriptionId] = useState(null);
    const [position, setPosition] = useState(null);

    useEffect(() => {
        requestAuthorization();
    }, []);

    const setLocationWatcher = () => {
        try {
            const watchID = Geolocation.watchPosition(
                (position) => {
                    const coords = position.coords;
                    setPosition({
                        lat: coords.latitude,
                        long: coords.longitude
                    });
                },
                (error) => Alert.alert('WatmchPosition Error', JSON.stringify(error)),
                {
                    enableHighAccuracy: true,
                    distanceFilter: 1,
                    interval: 10,
                    fastestInterval: 10
                }
            );
            setLocationSubscriptionId(watchID);
        } catch (error) {
            console.log(error);
            Alert.alert('WatcihPosition Error', JSON.stringify(error));
          }
    };

    const requestAuthorization = () => {
        Geolocation.requestAuthorization(
            () => {
                if (locationSubscriptionId !== null) {
                    Geolocation.clearWatch(locationSubscriptionId);
                }

                setLocationWatcher();
            }, 
            () => {
                Alert.alert("Location Permission", "Permission not granted", [
                    {
                        text: "Go To Settings",
                        onPress: () => {
                            Linking.openSettings();
                        }
                    },
                    {
                        text: "Close"
                    }
                ])
            }
        );
    }

    return (
        <>
            <Text style={styles.location}>Location</Text>
            <Text style={styles.locationValue}>{(position === null)? ("Fetching.....") : (`Lat: ${position.lat} Long: ${position.long}`)}</Text>
        </>
    );
}

const styles = StyleSheet.create({
    location: {
        color: "black",
        fontSize: 25
    },
    locationValue: {
        color: "darkgrey",
        fontSize: 15
    }
});