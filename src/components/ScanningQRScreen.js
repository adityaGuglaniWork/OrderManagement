import { Text } from "react-native";

export default function ScanningQRScreen() {
    const cameraPermission = Camera.getCameraPermissionStatus();
    console.log(cameraPermission);
    return (
        <>
            <Text>aosidnasoin</Text>
        </>
    );
}