import { useState } from "react";
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useTaskManager } from "../service/useTaskManager";

export default function Invoices({ navigation }) {
    const [{ orders }] = useTaskManager();
    const [invoiceOrders] = useState(orders);

    const navigationToInvoiceDetail = (id) => {
        navigation.navigate("InvoiceDetail", {
            id: id
        });
    }

    const Order = ({order}) => {
        return (
            <TouchableOpacity onPress={() => { navigationToInvoiceDetail(order.orderId) } } >
                <View style={styles.listItem}>
                    <Text style={styles.orderItemText}>Order Id: <Text style={styles.orderItemValue}>{order.orderId}</Text></Text>
                    <Text style={styles.orderItemText}>Invoice no: <Text style={styles.orderItemValue}>{order.codes.IN_CODE}</Text></Text>
                </View>
            </TouchableOpacity>
        );
    }

    return (
        (invoiceOrders.length > 0)?
        <FlatList
            data={invoiceOrders}
            style={styles.orderList}
            renderItem={({ item }) => <Order order={item} />}
            keyExtractor={order => order.orderId}
        /> : <Text style={styles.noTasks}>NO INVOICES HERE</Text>
    );
}

const styles = StyleSheet.create({
    orderList: {
        marginHorizontal: 20
    },
    noTasks: {
        color: "grey",
        alignSelf: "center",
        marginTop: 30
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
});