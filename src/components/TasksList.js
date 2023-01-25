import { useContext, useEffect, useState } from "react";
import { Alert, FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { AuthContext } from "../../App";
import { TASK_PACKING, TASK_STATUS_STARTED } from "../../constants";
import { useTaskManager } from "../service/useTaskManager";

export default function TasksList({ route, navigation }) {
    const { params } = route;
    const { loggedInUser } = useContext(AuthContext);
    const [tasks, setTasks] = useState([]);
    const [{ orders, packingTasks, deliveryTasks }, { searchOrderHandler }] = useTaskManager();

    useEffect(() => {
        const taskList = (params.type === TASK_PACKING) ? packingTasks : deliveryTasks
        setTasks([...taskList]);
    }, []);

    const Task = ({ task }) => {
        const order = searchOrderHandler(task.orderId);
        const totalPrice = order.products.reduce((total, product) => total = total + Number(product.price), 0);

        const navigateToDetail = () => {
            navigation.navigate("TaskDetail", {
                taskId: task.taskId,
                taskType: task.type
            });
        }

        const startOrResumeTask = () => {
            let message;
            if (task.workerId) {
                message = "Task already has a worker, do you want to restart?"
            } else {
                message = "Do you want to start the task?";
            }

            Alert.alert("Task", message, [
                {
                    text: "Start",
                    onPress: () => {
                        task.workerId = loggedInUser.id;
                        task.status = TASK_STATUS_STARTED;
                        navigateToDetail();
                    }
                },
                {
                    text: "Close"
                }
            ])
        }

        return (
            <TouchableOpacity onPress={() => {startOrResumeTask()}}>
                <View style={styles.listItem}>
                    <Text style={styles.orderItemText}>Packing Code: <Text style={styles.orderItemValue}>Code value</Text></Text>
                    <Text style={styles.orderItemText}>Invoice no: <Text style={styles.orderItemValue}>Code value</Text></Text>
                    <Text style={styles.orderItemText}>Address: <Text style={styles.orderItemValue}>{order.user.address}</Text></Text>
                    <Text style={styles.orderItemText}>Items Qty: <Text style={styles.orderItemValue}>{order.products.length}</Text></Text>
                    <Text style={styles.orderItemText}>Total Price: <Text style={styles.orderItemValue}>${totalPrice}</Text></Text>
                </View>
            </TouchableOpacity>
        );
    };

    return (
        (tasks.length > 0)?
        <FlatList
            data={tasks}
            style={styles.orderList}
            renderItem={({ item }) => <Task task={item} />}
            keyExtractor={order => order.orderId}
        /> : <Text style={styles.noTasks}>NO TASKS HERE</Text>
    );
}

const styles = StyleSheet.create({
    orderList: {
        marginHorizontal: 20
    },
    listItem: {
        marginTop: 20,
        padding: 10,
        backgroundColor: "lightgrey",
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "darkgrey"
    },
    orderItemText: {
        color: "black",
        fontWeight: "bold"
    },
    orderItemValue: {
        fontWeight: "normal"
    },
    noTasks: {
        color: "grey",
        alignSelf: "center",
        marginTop: 30
    }
});
