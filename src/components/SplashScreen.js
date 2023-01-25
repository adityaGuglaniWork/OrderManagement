import { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { useTaskManager } from "../service/useTaskManager";

const ORDER_COUNT = 4;

export default function SplashScreen({onLoadingComplete}) {
    const [data, { seedOrdersHandler }] = useTaskManager();

    useEffect(() => {
        seedOrdersHandler(ORDER_COUNT);
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