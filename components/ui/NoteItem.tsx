import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Note } from "../modules/notes/domain/note.interface";

type Props = {
    note: Note,
    onEdit: (note: Note) => void,
    onDelete: (note: Note) => void,
}

export function NoteItem({ note, onEdit, onDelete }: Props) {
    return (
        <View style={styles.noteItemContainer}>
            <Text style={styles.noteTitle}>{note.title}</Text>
            <Text style={styles.noteDescription}>{note.description}</Text>
            <Text style={styles.noteDate}>{note.date.toString()}</Text>

            <View style={styles.buttonsContainer}>
                <TouchableOpacity
                    style={[styles.bttn, styles.bttnEdit]}
                    onPress={() => onEdit(note)}
                >
                    <Text style={styles.bttnText}>Editar</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.bttn, styles.bttnDelete]}
                    onPress={() => onDelete(note)}
                >
                    <Text style={styles.bttnText}>Eliminar</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
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
    buttonsContainer: {
        flexDirection: "row",
        marginTop: 12,
    },
    bttn: {
        flex: 1,
        paddingVertical: 10,
        borderRadius: 10,
        alignItems: "center",
        marginHorizontal: 6,
    },
    bttnEdit: {
        backgroundColor: "#4C6EF5",
    },
    bttnDelete: {
        backgroundColor: "#E03131",
    },
    bttnText: {
        color: "#FFFFFF",
        fontWeight: "600",
        fontSize: 14,
    },
});
