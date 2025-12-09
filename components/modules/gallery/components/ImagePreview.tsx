// components/modules/gallery/components/ImagePreview.tsx

import { supabase } from "@/lib/supabase";
import { Ionicons } from "@expo/vector-icons";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";

type Props = {
    uri: string;
    onCancel: () => void;
    newPhoto: () => void;
    onSave: (uri: string) => void;
};

export function ImagePreview({ uri, onCancel, newPhoto, onSave }: Props) {

    const uploadImage = async (uri: string) => {
        try {
            const fileData = await fetch(uri).then(res => res.arrayBuffer());

            const fileName = `public/photo-${Date.now()}.jpg`;

            const { error: uploadError } = await supabase.storage
                .from("gallery")
                .upload(fileName, fileData, {
                    contentType: "image/jpeg"
                });

            if (uploadError) {
                console.error("Error al subir imagen:", uploadError.message);
                return;
            }

            const { data } = supabase.storage
                .from("gallery")
                .getPublicUrl(fileName);

            onSave(data.publicUrl);

        } catch (err) {
            console.error("Error en uploadImage:", err);
        }
    };

    return (
        <View style={styles.container}>
            <Image style={styles.photo} source={{ uri }} />

            <View style={styles.buttons}>
                <TouchableOpacity onPress={onCancel}>
                    <Ionicons name="close" size={32} color="white" />
                </TouchableOpacity>

                <TouchableOpacity onPress={() => uploadImage(uri)}>
                    <Ionicons name="save-outline" size={32} color="white" />
                </TouchableOpacity>

                <TouchableOpacity onPress={newPhoto}>
                    <Ionicons name="camera-outline" size={32} color="white" />
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        backgroundColor: "black",
    },
    photo: {
        height: "100%",
        resizeMode: "contain",
    },
    buttons: {
        flexDirection: "row",
        position: "absolute",
        bottom: 30,
        left: 0,
        right: 0,
        justifyContent: "space-around",
    }
});