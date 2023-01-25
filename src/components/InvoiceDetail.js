import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { useTaskManager } from "../service/useTaskManager";

export default function InvoiceDetail({ id }) {
    const [, { searchOrderHandler }] = useTaskManager();
    const [order] = useState(searchOrderHandler(id));

    const generateTotal = () => {
        let total = order.products.reduce((prev, curr) => prev + Number(curr.price), 0);
        console.log(total);
        return total + order.taxInfo.tax + order.taxInfo.delivery;
    }
    const productsView = order.products.map((product) => {
        return (
            <>
                <Text style={styles.label}>{product.name}: <Text style={styles.value}>${product.price}</Text></Text>
            </>
        );
    });

    return (
        <View style={styles.container}>
            {productsView}
            <Text style={[styles.label, styles.size15]}>Delivery: <Text style={styles.value}>${order.taxInfo.delivery}</Text></Text>
            <Text style={[styles.label, styles.size15]}>Tax: <Text style={styles.value}>${order.taxInfo.tax}</Text></Text>
            <Text style={[styles.label, styles.size15]}>Total: <Text style={styles.value}>${generateTotal()}</Text></Text>
        </View>);
}

const styles = StyleSheet.create({
    container: {
        margin: 20
    },
    label: {
        color: "grey",
        fontWeight: "bold",
        fontSize: 20
    },
    value: {
        fontWeight: "normal"
    },
    size15: {
        fontSize: 18
    }
});