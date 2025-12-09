// GalleryView.tsx
//vista para la galeria 

import { supabase } from "@/lib/supabase";
import { useEffect, useState } from "react";
import { FlatList, Image, StyleSheet, TouchableOpacity, View } from "react-native";
import { ImageDelete } from "../gallery/components/ImageDelete";
import { ImagePicker } from "../gallery/components/ImagePicker";

export function GalleryView() {

    const [images, setImages] = useState<string[]>([]);
    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    useEffect(() => {
        async function loadImages() {
            const { data, error } = await supabase.storage
                .from("gallery")
                .list("public"); 

            if (error) {
                console.error("Error al listar imágenes:", error.message);
                return;
            }

            const urls = data.map(file => {
                const { data } = supabase.storage
                    .from("gallery")
                    .getPublicUrl(`public/${file.name}`);

                return data.publicUrl;
            });

            setImages(urls);
        }

        loadImages();
    }, []);

    const addPhoto = (uri: string) => {
        setImages([uri, ...images]);
    };

    const deleteImage = async (url: string) => {
        try {
            const path = url.split("/").slice(-2).join("/");

            const { error } = await supabase.storage
                .from("gallery")
                .remove([path]);

            if (error) {
                console.error("Error al eliminar imagen:", error.message);
                return;
            }

            setImages(images.filter(img => img !== url));
            setSelectedImage(null);
        } catch (err) {
            console.error("Error:", err);
        }
    };

    return (
        <View style={style.container}>
            <ImagePicker onPhotoSelected={addPhoto} />

            <FlatList
                data={images}
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => setSelectedImage(item)}>
                        <Image source={{ uri: item }} style={style.image} />
                    </TouchableOpacity>
                )}
                keyExtractor={(item, index) => item ?? index.toString()}
            />

            <ImageDelete
                imageUrl={selectedImage}
                onCancel={() => setSelectedImage(null)}
                onDelete={deleteImage}
            />
        </View>
    );
}

const style = StyleSheet.create({
    container: {
        paddingTop: 60,
        paddingHorizontal: 16,
        flex: 1,
        backgroundColor: "#f0f0f0"
    },
    image: {
        width: "100%",
        height: 200,
        marginVertical: 8,
        borderRadius: 8
    }
});