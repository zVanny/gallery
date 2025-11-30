import { useEffect, useState } from "react";
import { Modal, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { Note } from "../modules/notes/domain/note.interface";

type Props = {
    note: Note | null;
    onSaved: (note: Note) => void;
    onCancel: () => void;
}

export function NoteModal(
    {
        note,
        onSaved,
        onCancel
    }: Props
) {
    //estados para los TextInput
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    //funcion para mandar a guardar
    const saveNote = () => {
        if (!note) return; //nada que guardar
        //mandar a guardar la nota, incluyendo el titulo y descripcion
        onSaved({
            ...note,
            title,
            description,
        })
    }

    //observar los cambios en la propiedad: note
    useEffect(() => {
        //poner en los estados la info de la nota
        //si no hay nota poner ' '
        setTitle(note?.title ?? '');
        setDescription(note?.description ?? '')
    }, [note]);

    if (!note)
        return null;

    return (
        <Modal visible={!!note} transparent animationType="slide">
            <View style={styles.modal1}>
                <View style={styles.modalContent}>
                    <Text style={styles.modalTitle}>
                        {note.id ? "Editar nota" : "Nueva nota"}
                    </Text>

                    <TextInput
                        style={styles.show}
                        placeholder="Título"
                        onChangeText={setTitle}
                        value={title}
                    />

                    <TextInput
                        style={styles.areaText}
                        placeholder="Descripción"
                        multiline
                        numberOfLines={5}
                        onChangeText={setDescription}
                        value={description}
                    />

                    <View style={styles.modalButtonsRow}>
                        <TouchableOpacity style={[styles.modalButton, styles.guardarButton]}
                            onPress={saveNote}
                        >
                            <Text style={styles.modalButtonText}>Guardar</Text>

                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[styles.modalButton, styles.cancelarButton]}
                            onPress={onCancel}
                        >
                            <Text style={styles.modalButtonText}>Cancelar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    modal1: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.4)",
        justifyContent: "center",
        padding: 16,
    },
    modalContent: {
        backgroundColor: "#fff",
        borderRadius: 12,
        padding: 16,
        elevation: 8,
        shadowColor: "#000",
        shadowOpacity: 0.15,
        shadowRadius: 8,
        shadowOffset: { width: 0, height: 4 },
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 12,
        textAlign: "center",
        color: "#3A3A7A",
    },
    show: {
        borderWidth: 1,
        borderColor: "#A9A9C9",
        borderRadius: 8,
        paddingHorizontal: 10,
        paddingVertical: 8,
        backgroundColor: "#fff",
        marginBottom: 10,
    },
    areaText: {
        borderWidth: 1,
        borderColor: "#A9A9C9",
        borderRadius: 8,
        paddingHorizontal: 10,
        paddingVertical: 8,
        minHeight: 100,
        textAlignVertical: "top",
        backgroundColor: "#fff",
    },
    modalButtonsRow: {
        flexDirection: "row",
        justifyContent: "flex-end",
        gap: 8,
        marginTop: 12,
    },
    modalButton: {
        paddingHorizontal: 16,
        paddingVertical: 10,
        borderRadius: 8,
    },
    cancelarButton: {
        backgroundColor: "#ccc",
    },
    guardarButton: {
        backgroundColor: "#6B63FF",
    },
    modalButtonText: {
        color: "#fff",
        fontWeight: "600",
    },
});
