import { Alert, Linking, StyleSheet, Text, View } from "react-native";
import Geolocation from '@react-native-community/geolocation';
import { useEffect, useState } from "react";
import { useTaskManager } from "../service/useTaskManager";
import { TASK_DELIVERY } from "../../constants";

export default function DeliveryTask({ taskId, navigation }) {
    const [locationSubscriptionId, setLocationSubscriptionId] = useState(null);
    const [data, { fetchDetailedTask }] = useTaskManager();
    const [position, setPosition] = useState(null);
    const [task, setTask] = useState(null);

    useEffect(() => {
        requestAuthorization();

        const [task, order] = fetchDetailedTask(taskId, TASK_DELIVERY);
        setTask(task);

        setupHeader(order.orderId);
    }, []);

    function setupHeader(orderId) {
        if (orderId) {
            navigation.setOptions({
                title: "Order [...." + orderId.substr(orderId.length - 8) + "]"
            });
        }
    }

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
        <View style={styles.container}>
            <Text style={styles.header}>Delivery Code</Text>
            <Text style={styles.value}>{(task !== null)? task.taskId: null}</Text>
            <Text style={styles.header}>Location</Text>
            <Text style={styles.value}>{(position === null)? ("Fetching.....") : (`Lat: ${position.lat} Long: ${position.long}`)}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        margin: 20
    },
    header: {
        marginTop: 20,
        color: "black",
        fontSize: 25
    },
    value: {
        color: "grey",
        fontSize: 20
    }
});