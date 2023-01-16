import { StyleSheet, View, TextInput, Text } from "react-native";
import React, { useRef, useState } from "react";
import getLoggedInUser from "../utils/UserUtils";

const OTP_INPUT_BOX_COUNT = 6;
const IS_NUMBER_PATTERN = /^\d+$/;

export default function LoginScreen() {
    const [isLoginInvalid, setLoginInvalid] = useState(false);

    const numberRefs = [];
    const otpInputs = [];

    const inputs = [];
    for (let i = 0; i < OTP_INPUT_BOX_COUNT; i++) {
        numberRefs[i] = useRef();
        otpInputs[i] = null;
        inputs[i] = (
            <TextInput
                key={i}
                keyboardType="numeric"
                selectTextOnFocus={true}
                numeric
                ref={numberRefs[i]}
                maxLength={1}
                style={styles.otpInputBox}
                onChangeText={(number) => otpInputChangeListener(i, number)}
            />
        );
    }

    function otpInputChangeListener(index, number) {
        setLoginInvalid(false);

        let hasNext = index !== numberRefs.length - 1;
        let hasPrev = index !== 0;

        switch (true) {
            case IS_NUMBER_PATTERN.test(number) === true: {
                if (hasNext) {
                    numberRefs[index + 1].current.focus();
                }
                break;
            }
            case number.length === 0: {
                if (hasPrev) {
                    numberRefs[index - 1].current.focus();
                }
                break;
            }
            default: {
                number = null;
            }
        }
        
        otpInputs[index] = (number && number.length === 1) ? number : null;
        checkEnteredOTP();
    }

    function checkEnteredOTP() {
        let otpValue = "";
        otpInputs.forEach((digit) => {
            if (digit !== null) {
                otpValue = otpValue + digit;
            } 
        });
        
        if (otpValue.length === OTP_INPUT_BOX_COUNT) {
            const loggedInUser = getLoggedInUser(otpValue);
            if (loggedInUser) {
                setLoginInvalid(false);
                alert(loggedInUser.firstName + " logged in");
            } else {
                setLoginInvalid(true);
            }
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Enter login PIN</Text>
            <View style={styles.otpBoxesContainer}>
                {inputs}
            </View>
            { (isLoginInvalid)? <Text style={styles.error}>Invalid PIN</Text>: null }
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        marginHorizontal: 10
    },
    title: {
        fontSize: 20
    },
    otpBoxesContainer: {
        flexDirection: "row",
        alignItems: "space-around"
    },
    otpInputBox: {
        borderColor: "grey",
        borderWidth: 1.5,
        borderRadius: 15,
        flex: 1,
        height: 50,
        margin: 5,
        width: 50,
        textAlign: "center"
    },
    error: {
        color: "red"
    }
});