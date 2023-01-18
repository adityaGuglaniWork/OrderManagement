import { useContext } from "react";
import { Alert, Image, Linking, StyleSheet, Text, TouchableOpacity } from "react-native";
import { AuthContext } from "../../App";
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { check, PERMISSIONS } from "react-native-permissions";

export default function ProfileScreen() {
  const { loggedInUser, onLogout, saveUserInfo } = useContext(AuthContext);

  function requestMediaPermissionAndProceed() {
    const permission = Platform.OS === 'ios' ? PERMISSIONS.IOS.PHOTO_LIBRARY : PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE;
    check(permission).then((status) => { 
      switch (status) {
        case "granted": {
          openGalleryAndSelectImage();
        }
        case "denied": {
          request(permission).then(() => { openGalleryAndSelectImage() });
        }
        default: {
          showGoToSettingsDialog();
        }
      }
    });
  }

  function showGoToSettingsDialog() {
    Alert.alert("Access Denied", "Library access permission denied", [{
      text: "Go to settings", 
      onPress: () => { Linking.openSettings() }
    }  ], {cancelable: true});
  }

  function openGalleryAndSelectImage() {
    const imageOptions = {
      title: 'Select Image',
      customButtons: [
        {
          name: 'customOptionKey',
          title: 'Choose Photo from Custom Option'
        },
      ],
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };

  launchImageLibrary(imageOptions, (response) => {
    if (response.didCancel) {
        /* User Cancel */
      } else if (response.error) {
      alert("Error selecting picture");
    } else {
      const updatedUser = Object.assign({}, loggedInUser);
      updatedUser.profilePicture = response.assets[0].uri;
      saveUserInfo(updatedUser);
      }
    });
  }

    return (
      <>
        <TouchableOpacity onPress={() => { requestMediaPermissionAndProceed() }} >
          {(loggedInUser.profilePicture) ? 
             <Image style={ styles.profilePicture } source={{ uri: loggedInUser.profilePicture }} /> : 
             <Image style={ styles.profilePicture } source={require('../assets/images/sample_user.png')} />
          }
        </TouchableOpacity>
        <Text style={ styles.profileName }>{ loggedInUser.firstName + " " + loggedInUser.lastName}</Text>
            <TouchableOpacity onPress={onLogout} style={styles.tasksContainer}>
                <Text style={styles.tasks}>
                    LOGOUT
                </Text>
            </TouchableOpacity>
        </>
    );
}

const styles = StyleSheet.create({
    tasksContainer: {
        backgroundColor: "maroon",
        padding: 10,
        margin: 5,
        borderRadius: 5,
        alignSelf: "center"
    },
    tasks: {
        color: "white"
  },
  profilePicture: {
    marginTop: 100,
    alignSelf: "center",
    backgroundColor: "red",
    height: 200,
    width: 200,
    borderRadius: 200 / 2
  },
  profileName: {
    color: "black",
    alignSelf: "center",
    marginVertical: 20,
    fontSize: 20
  }
});