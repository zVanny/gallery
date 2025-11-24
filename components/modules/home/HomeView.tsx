import { router } from "expo-router";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';

export function HomeView() {
    return (
        <LinearGradient
            colors={['#c7d7ff', '#e6ccff']} 
            style={styles.bg}
        >
        <View style={styles.container}>

            <Text style={styles.title}>Bienvenido</Text>

            <TouchableOpacity
                style={styles.button}
                onPress={() => router.push('/account')}>
                <Text style={styles.buttonText}>Cuenta de Usuario</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.button}
                onPress={() => router.push('/gallery')}>
                <Text style={styles.buttonText}>Galería</Text>
            </TouchableOpacity>

        </View>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    bg: {
        flex: 1,
    },
    container: {
        flex: 1,
        padding: 90,
        alignItems: 'center',
        justifyContent: 'center',
    },

    title: {
        fontSize: 28,
        fontWeight: '700',
        color: '#2b2d42',
        marginBottom: 50,
    },

    button: {
        backgroundColor: '#ffffffdd',
        paddingVertical: 14,
        paddingHorizontal: 30,
        borderRadius: 14,
        marginBottom: 20,
        width: 210,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#e4e4e4',
        shadowColor: "#000",
        shadowOpacity: 0.12,
        shadowOffset: { width: 0, height: 3 },
        shadowRadius: 6,
    },

    buttonText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
    }
});
