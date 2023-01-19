import { useEffect, useState } from "react";
import { StyleSheet, Text, Touchable, TouchableOpacity, View } from "react-native";
import { useOrders } from "../service/useOrders";

const ORDER_COUNT = 10;

const NOT_STARTED = "not_started";
const ONGOING = "ongoin";
const COMPLETED = "completed"

export default function SplashScreen({onLoadingComplete}) {
    const [seeding, setSeeding] = useState(true);
    const [data, { seedOrdersHandler }] = useOrders();

    useEffect(() => {
        console.log("seeding first time");
        seedOrdersHandler(10);
    }, []);

    useEffect(() => {
        if (data.orders.length == ORDER_COUNT) {
            onLoadingComplete();
        }
    }, [data]);
  
    return (
        <View style={styles.container}>
            <Text style={styles.appName}>Order Management</Text>
            <Text style={styles.loadingText}>Seeding orders....</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    },
    appName: {
        color: "black",
        fontSize: 30
    },
    loadingText: {
        color: "grey"
    },
    seedCta: {
        backgroundColor: "maroon",
        padding: 10,
        marginTop: 10,
        borderRadius: 10
    }
});