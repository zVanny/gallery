// CameraComponent.tsx

import { Ionicons } from '@expo/vector-icons';
import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import { useRef, useState } from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

type Props = {
    onCancel: () => void;
    onPicturedTaked: (uri: string) => void;
}

export default function CameraComponent(
    { onCancel, onPicturedTaked }: Props
) {
    const [facing, setFacing] = useState<CameraType>('back');
    const [permission, requestPermission] = useCameraPermissions();

    //referencia para el componente de camara
    const cameraRef = useRef<CameraView>(null);

    if (!permission) {
        // Camera permissions are still loading.
        return <View />;
    }

    if (!permission.granted) {
        // Camera permissions are not granted yet.
        return (
            <View style={styles.container}>
                <Text style={styles.message}>We need your permission to show the camera</Text>
                <Button onPress={requestPermission} title="grant permission" />
            </View>
        );
    }

    function toggleCameraFacing() {
        setFacing(current => (current === 'back' ? 'front' : 'back'));
    }

    const takePicture = async () => {
        //acceder al componente de camara y tomar foto
        const photo = await cameraRef.current?.takePictureAsync();
        //si se tomo foto, retornar a la ruta del archivo
        if(photo){
            onPicturedTaked(photo.uri);
        }
    };

    return (
        <View style={styles.container}>
            <CameraView
                ref={cameraRef}
                style={styles.camera}
                facing={facing}
            />
            <View
                style={styles.buttons}
            >
                <TouchableOpacity
                    onPress={onCancel}
                >
                    <Ionicons
                        name="close"
                        size={32}
                        color="red"
                    />
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={takePicture}
                >
                    <Ionicons
                        name="camera"
                        size={25}
                        color="white"
                    />
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={toggleCameraFacing}
                >
                    <Ionicons
                        name="camera-reverse-outline"
                        size={32}
                        color="white"
                    />
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    message: {
        textAlign: 'center',
        paddingBottom: 10,
    },
    camera: {
        flex: 1,
    },
    buttons: {
        position: 'absolute',
        bottom: 48,
        left: 0,
        right: 0,
        flexDirection: 'row',
        backgroundColor: 'transparent',
        alignItems: 'center',
        justifyContent: 'space-around',
    }
});
