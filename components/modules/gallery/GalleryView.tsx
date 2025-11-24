//GalleryView.tsx
//vista para la gallery



import { useState } from "react";
import { FlatList, Image, StyleSheet, View } from "react-native";
import { ImagePicker } from "./components/ImagePicker";


export function GalleryView() {
    //estado para la coleccion de imagenes
    const [images, setImages] = useState<string[]>([]);


    //funcion para agregar nueva imagen a la coleccion
    const addPhoto = (uri: string) => {
        //armar nuevo arreglo, donde la nueva foto va al inicio 
        //y tomar todas las imagenes acruales en images
        setImages([uri, ...images])
    }
    return (
        <View
            style={styles.container}
        >
            <ImagePicker
                onPhotoSelected={addPhoto}
            />

            {/* mostrar las fotos con Flatlist*/}

            <FlatList
                data={images}
                keyExtractor={(item, index) => index.toString()}
                numColumns={3} //3 fotos por fila
                contentContainerStyle={styles.gallery}
                renderItem={({ item }) => (
                    <Image source={{ uri: item }} style={styles.image} />
        )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 60,
        paddingHorizontal: 16,
    },
    gallery: {
        marginTop: 20,
        justifyContent: "center",
    },
    image: {
        width: 100,
        height: 100,
        borderRadius: 10,
        margin: 5,
    }
})