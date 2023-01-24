import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { TASK_DELIVERY, TASK_PACKING } from "../../constants";

export default function SelectTasks({ navigation }) {
    function showTask(taskType) {
        navigation.navigate("TasksList", { type: taskType });
    }

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.tasksContainer} onPress={() => { showTask(TASK_PACKING) }}>
                <Text style={styles.tasks}>PACKING</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.tasksContainer} onPress={() => { showTask(TASK_DELIVERY) }}>
                <Text style={styles.tasks}>DELIVERY</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.tasksContainer} onPress={() => { navigation.navigate("ScanningQRScreen") }}>
                <Text style={styles.tasks}>SCAN QR</Text>
            </TouchableOpacity>
        </View>);
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100%"

    },
    tasksContainer: {
        backgroundColor: "maroon",
        padding: 10,
        margin: 5,
        borderRadius: 5
    },
    tasks: {
        color: "white"
    }
});