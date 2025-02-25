import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';


export default function ForgotPassword() {


    return (
        <View style={styles.container}>
            {/* Logo Container */}
            <View style={styles.logoContainer}>
                <Image source={require('../../../assets/images/logo-field.png')} style={styles.logo} />
            </View>

            <Text style={styles.title}>Forgot Password</Text>
            <Text style={styles.subtitle}>Enter your email to reset your password</Text>

            <TextInput
                placeholder="Enter your email"
                style={styles.input}
                keyboardType="email-address"
            />

            <TouchableOpacity style={styles.button}
            >
                <Text style={styles.buttonText}>Submit</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
        paddingTop: '25%',
        backgroundColor: '#f9f9f9',
    },
    logoContainer: {
        alignItems: 'center',
        marginBottom: 30,
    },
    logo: {
        width: 100,
        height: 100,
        resizeMode: 'contain',
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 10,
    },
    subtitle: {
        fontSize: 16,
        textAlign: 'center',
        color: '#777',
        marginBottom: 20,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 30,
        paddingHorizontal: 15,
        paddingVertical: 12,
        fontSize: 16,
        backgroundColor: '#fff',
        marginBottom: 20,
    },
    button: {
        backgroundColor: '#0A96CC',
        paddingVertical: 12,
        borderRadius: 30,
        alignItems: 'center',
        marginHorizontal: 4,
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: '600',
    },
});
