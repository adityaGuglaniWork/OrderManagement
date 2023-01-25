import React, { Component, Fragment } from 'react';
import { Alert, Text, View } from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import { Dimensions } from 'react-native';
const deviceWidth = Dimensions.get('screen').width;
const deviceHeight = Dimensions.get('screen').height;

class Scan extends Component {
    onSuccess = (e) => {
        const showNotSupportedDialog = () => {
            Alert.alert("Scanned Code", "Code not supported in the app");
        }

        try {
            const data = JSON.parse(e.data);
            const appData = JSON.parse(data);
            console.log(`TYPE: ${appData.type} ID: ${appData.id}`);
            if (appData.type && appData.id) {

            } else {
                showNotSupportedDialog();
            }
        } catch (e) {
            showNotSupportedDialog();
        }
    }
    render() {
        return (
            <View style={styles.scrollViewStyle}>
                <Fragment>
                        <QRCodeScanner 
                            reactivate={true}
                            showMarker={true}
                            onRead={this.onSuccess}
                            topContent={
                                <Text style={styles.centerText}>
                                   Please move your camera {"\n"} over the QR Code
                                </Text>
                            }
                        />
                </Fragment>
            </View>
        );
    }
}
export default Scan;

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