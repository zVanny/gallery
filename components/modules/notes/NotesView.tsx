import { NoteItem } from "@/components/ui/NoteItem";
import { NoteModal } from "@/components/ui/NoteModal";
import { useEffect, useState } from "react";
import { Alert, FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Note } from "./domain/note.interface";
import { deleteNote, getNotes, saveNote } from "./infraestructure/dataSource";

export function NotasView() {

    const [notes, setNotes] = useState<Note[]>([]);

    const [selected, setSelected] = useState<Note | null>(null);

    const onNewNote = () => {
        setSelected({
            id: 0,
            title: '',
            description: '',
            date: new Date(),
        });
    }
    //recibir nota desde el modal
    const onNoteChanged = (note: Note) => {
        //mandar a guardar
        saveNote(note)
            .then((result) => {//procesar el resultado
                //hacer algo en el resultado
                if (result) {

                    if (!note.id) {
                        setNotes([
                            ...notes,
                            result,
                        ]);
                    } else {
                        //reemplazar el elemento actualizado
                        setNotes([
                            ...notes.map((item) => item.id === result.id ? result : item)
                        ]);
                    }
                    //mandar a cerrar el modal
                    setSelected(null);
                }
            })//then

    }
    const onDeleteNote = (note: Note) => {
        Alert.alert(
            "Eliminar nota",
            "¿Estás seguro que deseas eliminar esta nota?",
            [
                { text: "Cancelar", style: "cancel" },
                {
                    text: "Eliminar",
                    style: "default",
                    onPress: () => {
                        deleteNote(note).then((result) => {
                            if (result) {
                                // Filtrar la nota eliminada
                                setNotes(notes.filter(item => item.id !== note.id));
                            }
                        });
                    }
                }
            ]
        );
    };
    

    const onCancelModal = () => {
        setSelected(null);
    }

    useEffect(() => {
        getNotes()
            .then((results) => {
                setNotes(results);
            })
            .catch(() => {
                Alert.alert("No se pudo conectar al servidor :c ");
            });
    }, []);

    return (
        <View style={styles.container}>

            <FlatList
                style={styles.list}
                data={notes}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <NoteItem
                     note={item}
                     onEdit={setSelected}
                     onDelete={onDeleteNote}
                     />
                )}
            />

            <TouchableOpacity
                style={styles.addButton}
                onPress={onNewNote}
            >
                <Text style={styles.addButtonText}>Agregar Nueva Nota</Text>
            </TouchableOpacity>

            <NoteModal
                note={selected}
                onSaved={onNoteChanged}
                onCancel={onCancelModal}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: "#EBECFF", // morado pastel
    },
    list: {
        flex: 1,
    },
    noteItemContainer: {
        backgroundColor: "#FFFFFF",
        padding: 14,
        borderRadius: 12,
        marginBottom: 12,
        elevation: 4,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowRadius: 4,
        shadowOffset: { width: 0, height: 2 },
    },
    noteTitle: {
        fontSize: 17,
        fontWeight: "700",
        color: "#3A3A7A",
        marginBottom: 4,
    },
    noteDescription: {
        fontSize: 14,
        color: "#555",
        marginBottom: 6,
    },
    noteDate: {
        fontSize: 12,
        color: "#8C8C8C",
        textAlign: "right",
    },
    addButton: {
        backgroundColor: "#6B63FF",
        paddingVertical: 15,
        borderRadius: 30,
        alignItems: "center",
        marginTop: 10,
        elevation: 5,
    },
    addButtonText: {
        color: "#fff",
        fontWeight: "bold",
        fontSize: 16,
    },
});
