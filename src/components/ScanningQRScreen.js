import React from 'react';
import { Alert, Text, View } from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import { TASK_DELIVERY, TASK_PACKING } from '../../constants';
import { useTaskManager } from '../service/useTaskManager';

export default function ScanningQRScreen({ navigation }) {
    const [, { doesTaskExist, fetchOrderByInvoice }] = useTaskManager();

    const showNotSupportedDialog = () => {
        Alert.alert("Scanned Code", "Code not supported in the app");
    }

    const handleScan = (type, id) => {
        const navigateToDetail = (taskType, taskId) => {
            const hasTask = doesTaskExist(taskId, taskType);
            if (hasTask) {
                navigation.navigate("TaskDetail", {
                    taskId: taskId,
                    taskType: taskType
                });
            } else {
                Alert.alert("Scanned Code", "Task Doesnt exists");
            }
        }
    
        switch (type) {
            case "DELIVERY_TASK": {
                navigateToDetail(TASK_DELIVERY, id);
                break;
            }
            case "PACKING_TASK": {
                navigateToDetail(TASK_PACKING, id)
                break;
            }   
            case "INVOICE": {
                const order = fetchOrderByInvoice(id);
                if (!order) {
                    Alert.alert("Scanned Code", "Order Doesnt exists");
                } else {
                    navigation.navigate("InvoiceDetail", { id: order.orderId });
                }
                break;
            }
                
            default: {
                Alert.alert("Scanned Code", "Data insufficient");
            }
        }
    }

    onSuccess = (e) => {
        try {
            const data = JSON.parse(e.data);
            const appData = JSON.parse(data);
            if (appData.type && appData.id) {
                handleScan(appData.type, appData.id);
            } else {
                showNotSupportedDialog();
            }
        } catch (e) {
            console.log(e);
            showNotSupportedDialog();
        }
    }
    
    return (
        <View style={styles.scrollViewStyle}>
            <QRCodeScanner
                reactivate={true}
                showMarker={true}
                onRead={onSuccess}
                topContent={
                    <Text style={styles.centerText}>
                        Please move your camera {"\n"} over the QR Code
                    </Text>
                }
            />
        </View>
    );
}

const styles = {
    scrollViewStyle: {
        flex: 1,
        justifyContent: 'flex-start',
        backgroundColor: 'maroon'
    },
    centerText: {
        flex: 1,
        textAlign: 'center',
        fontSize: 10,
        margin: 32,
        color: 'white',
    }
}