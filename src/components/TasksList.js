import { FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { TASK_PACKING } from "../../constants";
import { useOrders } from "../service/useOrders";
import { navigation } from 'react-navigation';

export default function TasksList({ route, navigation }) {
    const { params } = route;
    const [{ orders, packingTasks, deliveryTasks }, {searchOrderHandler}] = useOrders();

    const tasks = (params.type === TASK_PACKING) ? packingTasks : deliveryTasks;

    const Task = ({ task }) => {
        const order = searchOrderHandler(task.orderId);
        const totalPrice = order.products.reduce((total, product) => total = total + Number(product.price), 0);
        return (
            <TouchableOpacity onPress={() => { navigation.navigate("TaskDetail") }}>
                <View style={styles.listItem}>
                    <Text style={styles.orderItemText}>Packing Code: <Text style={styles.orderItemValue}>Code value</Text></Text>
                    <Text style={styles.orderItemText}>Invoice no: <Text style={styles.orderItemValue}>Code value</Text></Text>
                    <Text style={styles.orderItemText}>Address: <Text style={styles.orderItemValue}>{order.user.address}</Text></Text>
                    <Text style={styles.orderItemText}>Items Qty: <Text style={styles.orderItemValue}>{order.products.length}</Text></Text>
                    <Text style={styles.orderItemText}>Total Price: <Text style={styles.orderItemValue}>${totalPrice}</Text></Text>
                    <Text style={styles.orderItemText}>Task Status: <Text style={styles.orderItemValue}>{(task.type === TASK_PACKING)? "Packing" : "Delivery"}</Text></Text>
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
