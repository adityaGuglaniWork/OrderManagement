import { useState } from "react";
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { TASK_PACKING, TASK_STATUS_COMPLETED } from "../../constants";
import { useTaskManager } from "../service/useTaskManager";

export default function PackingTask({navigation, taskId}) {
    const [data, { fetchDetailedTask, packingTaskCompleteHander }] = useTaskManager();
    const [productStateMap, setProductStateMap] = useState(new Map());

    const [task, order] = fetchDetailedTask(taskId, TASK_PACKING);
    const productCount = order.products.length;
    
    const completeTask = () => {
        task.productStateMapping = productStateMap;
        task.status = TASK_STATUS_COMPLETED;
        packingTaskCompleteHander(task);
        navigation.goBack();
    }

    useEffect(() => {
        setupHeader(order.orderId);
    }, []);

    function setupHeader(orderId) {
        if (orderId) {
            navigation.setOptions({
                title: "Order [...." + orderId.substr(orderId.length - 8) + "]"
            });
        }
    }

    const productsLeft = productCount - productStateMap.size;
    return (
        <View style={styles.container}>
            <Text style={styles.productLeft}>Products Left: { productsLeft } / { productCount}</Text>
        <FlatList
                style={styles.productList}
                data={order.products}
                ItemSeparatorComponent={(props) => {
                    return (<View style={{ height: 20 }} />);
                }}
                renderItem={({ item }) => {
                    return (<ProductListItem
                        status={(productStateMap.has(item.productId))?productStateMap.get(item.productId):null}
                        product={item}
                        productStateUpdate={(productId, status) => { setProductStateMap(new Map(productStateMap.set(productId, status))) }} />)
                }} /> 
            <TouchableOpacity style={[styles.submit, (productsLeft === 0) ? styles.green : styles.lightgrey]} disabled={(productsLeft !== 0)} onPress={completeTask}>
            <Text>SUBMIT</Text>
        </TouchableOpacity>
        </View>);
}

function ProductListItem({ product, productStateUpdate, status }) {

    const bgClass = (status === null) ? styles.white : (status) ? styles.green : styles.orange;

    return (
        <View style={[styles.productContainer, bgClass]}>
            <Image style={styles.productImage} source={{ uri: product.image }} />
            <View style={styles.productInfo}>
                <Text style={styles.productItemValue}>{product.name}</Text>
                <Text style={styles.productItemValue}>${product.price}</Text>
            </View>

            <View style={styles.productActionView}>
            {
                (status == null) ?
                    
                        <>
                            <TouchableOpacity style={[styles.productAction, styles.orange]} onPress={() => { productStateUpdate(product.productId, false); }}>
                            <Text>Mark as Missing</Text>
                        </TouchableOpacity>
                        
                        <TouchableOpacity style={[styles.productAction, styles.green]} onPress={() => { productStateUpdate(product.productId, true); }}>
                            <Text>Picked</Text>
                        </TouchableOpacity>
                        </>
                    : null
                }
                 </View>
        </View>
    );
}

const styles = StyleSheet.create({
    submit: {
        padding: 10,
        borderRadius: 50,
        alignItems: "center",
        marginBottom: 10
    },
    productLeft: {
        color: "black",
        alignSelf: "flex-end"
    },
    container: {
        marginHorizontal: 20,
        flex: 1,
    },
    productList: {
        marginTop: 20,
    },
    productContainer: {
        flex: 1,
        flexDirection: "row",
        borderColor: "darkgrey",
        borderRadius: 15,
        borderWidth: 2,
        padding: 10
    },
    productImage: {
        flex: 1,
        width: 80,
        aspectRatio: 1 / 1,
        
    },
    productInfo: {
        padding: 10,
        flex: 2
    },
    white: {
        backgroundColor: "white"
    },
    orange: {
        backgroundColor: "orange"
    },
    green: {
        backgroundColor: "green"
    },
    lightgrey: {
        backgroundColor: "lightgrey"
    },
    productItemLabel: {
        color: "black",
        fontWeight: "bold",
        fontSize: 20,
        flex: 1
    },
    productItemValue: {
        fontWeight: "normal",
        color: "black",
        fontSize: 15
    },
    productActionView: {
        flex: 2,
    },
    productAction: {
        backgroundColor: "black",
        margin: 3,
        borderRadius: 10,
        padding: 5
    }
});