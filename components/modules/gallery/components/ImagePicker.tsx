//ImagePicker.tsx
/*
menu en un modal con :
-añadir imagen
camara
galeria
cancelar

cuando se tenga una imagen seleccionada o tomada
-mostrar el preview

cuando se seleccione Camara:
-mostrar la camara

cuando se seleccione Galeria :
-mostrar la galeria
*/

import { Ionicons } from '@expo/vector-icons';
import * as ExpoImagePicker from 'expo-image-picker';
import { useState } from "react";
import { Alert, Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import CameraComponent from './CameraComponent';
import { ImagePreview } from './ImagePreview';

type Props = {
    onPhotoSelected: (uri: string) => void;
}

export function ImagePicker(
    { onPhotoSelected }: Props
) {
    const [modalOpen, setModalOpen] = useState(false);
    //estado para la imagen seleccionada o tomada
    const [image, setImage] = useState<string | null>(null);
    //estado para la camara 
    const [cameraOpen, setCameraOpen] = useState(false);

    //abrir galeria de imagenes
    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ExpoImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images', 'videos'],
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        console.log(result);

        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    };

    const onNewPhoto = () => {
        setImage(null);
        setCameraOpen(true);
    }

    const onSavePhoto = (uri: string) => {
        //ToDo : enviar el componente padre
        onPhotoSelected(uri);

        Alert.alert('Foto guardada');
        setModalOpen(false);
        setImage(null);
    }

    const onPicturedTaked = (uri: string) => {
        setImage(uri);
        setCameraOpen(false);
    }

    //menu de opciones
    const renderMenu = (
        <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
                <Text style={styles.title}>Origen de Imagen</Text>
                <View style={styles.buttons}>
                    <TouchableOpacity
                    onPress={() => setCameraOpen(true)}
                    >
                        <Text style={styles.button}>Cámara</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={pickImage}
                    >
                        <Text style={styles.button}>Galería</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => setModalOpen(false)}
                    >
                        <Text style={styles.cancelButton}>Cancelar</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );

    return (
        <>
            <TouchableOpacity
                onPress={() => setModalOpen(true)}
            >
                <Ionicons
                    name="camera-outline"
                    size={32}
                    color="green"
                />
            </TouchableOpacity>
            <Modal
                visible={modalOpen
                }
                transparent
                animationType='slide'
            >

                {/* Si no hay imagen seleccionada, ni camara abierta, mostrar menu */}
                {!image && !cameraOpen ? renderMenu : null}

                {cameraOpen ? (
                    <CameraComponent
                    onCancel={() => setCameraOpen(false)}
                    onPicturedTaked={onPicturedTaked}
                    />
                ) : null}

                {image ? (
                    <ImagePreview
                        uri={image}
                        onCancel={() => setImage(null)}
                        newPhoto={onNewPhoto}
                        onSave={onSavePhoto}
                    />
                ) : null}
            </Modal>
        </>
    );
}

const styles = StyleSheet.create({

    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.15)'
    },
    modalContent: {
        backgroundColor: '#f0f0f0',
        width: '70%',
        padding: 20,
        borderRadius: 16,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 20,
    },
    title: {
        fontWeight: 700,
        fontSize: 20,
    },
    buttons: {
        display: 'flex',
        flexDirection: 'column',
        gap: 16,
    },
    button: {
        fontWeight: 600,
        fontSize: 22,
        color: 'darkblue',
    },
    cancelButton: {
        fontWeight: 600,
        fontSize: 18,
        color: 'red',
    }


});