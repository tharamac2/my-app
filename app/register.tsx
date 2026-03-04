import { FormInput } from '@/components/ui/FormInput';
import { PrimaryButton } from '@/components/ui/PrimaryButton';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function RegisterScreen() {
    const router = useRouter();
    const theme = useColorScheme() ?? 'light';
    const colors = Colors[theme];

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const handleRegister = () => {
        setLoading(true);
        // Simulate API call
        setTimeout(() => {
            setLoading(false);
            // For a real app, this might go to a multi-step profile creation
            router.replace('/create-profile');
        }, 1500);
    };

    return (
        <KeyboardAvoidingView
            style={[styles.container, { backgroundColor: colors.background }]}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            <ScrollView contentContainerStyle={styles.scrollContent}>
                <View style={styles.header}>
                    <Text style={[styles.title, { color: colors.primary }]}>Create Account</Text>
                    <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
                        Join us to find your perfect partner.
                    </Text>
                </View>

                <View style={styles.form}>
                    <FormInput
                        label="Full Name"
                        placeholder="Enter your full name"
                        value={name}
                        onChangeText={setName}
                    />
                    <FormInput
                        label="Email Address"
                        placeholder="Enter your email"
                        keyboardType="email-address"
                        autoCapitalize="none"
                        value={email}
                        onChangeText={setEmail}
                    />
                    <FormInput
                        label="Password"
                        placeholder="Create a password"
                        secureTextEntry
                        value={password}
                        onChangeText={setPassword}
                    />

                    <PrimaryButton
                        title="Register"
                        onPress={handleRegister}
                        loading={loading}
                        style={styles.registerButton}
                    />
                </View>

                <View style={styles.footer}>
                    <Text style={[styles.footerText, { color: colors.textSecondary }]}>Already have an account? </Text>
                    <TouchableOpacity onPress={() => router.replace('/login')}>
                        <Text style={[styles.loginText, { color: colors.secondary }]}>Login</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollContent: {
        flexGrow: 1,
        padding: 24,
        justifyContent: 'center',
    },
    header: {
        marginBottom: 40,
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 16,
        lineHeight: 24,
    },
    form: {
        marginBottom: 32,
    },
    registerButton: {
        marginTop: 24,
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 'auto',
    },
    footerText: {
        fontSize: 16,
    },
    loginText: {
        fontSize: 16,
        fontWeight: 'bold',
    },
});
