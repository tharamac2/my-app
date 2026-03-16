import { Colors } from '@/constants/Colors';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
    Dimensions,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import api from '@/services/api';

const serifFont = Platform.select({
    ios: 'Georgia',
    android: 'serif',
    default: 'serif',
});

const Logo = () => (
    <View style={styles.logoContainer}>
        <View style={styles.logoIcon}>
            <MaterialCommunityIcons name="heart-multiple-outline" size={80} color="#1A1A1A" />
        </View>
        <Text style={styles.logoTextMain}>Ratan</Text>
        <Text style={styles.logoTextSub}>matrimony</Text>
    </View>
);

export default function ResetPasswordScreen() {
    const router = useRouter();
    const { email, otp } = useLocalSearchParams();
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [passwordError, setPasswordError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const validatePassword = (text: string) => /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&_])[A-Za-z\d@$!%*?&_]{8,}$/.test(text);

    const handleSavePassword = async () => {
        if (!newPassword || !validatePassword(newPassword)) {
            setPasswordError('Password must be at least 8 chars with uppercase, lowercase, number, and special char');
            return;
        }
        if (newPassword !== confirmPassword) {
            setPasswordError('Passwords do not match');
            return;
        }
        setPasswordError('');
        
        try {
            setIsLoading(true);
            // In a real flow, you would pass email, otp, and newPassword to the backend API here
            // await api.post('/auth/reset-password', { email, otp, newPassword });
            setTimeout(() => {
                router.replace('/login' as any);
            }, 1000);
        } catch (err: any) {
            setPasswordError(err.message || 'Failed to reset password');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
            <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
                <ScrollView contentContainerStyle={styles.scrollContent} bounces={false}>
                    <View style={styles.header}>
                        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
                            <Ionicons name="chevron-back" size={28} color="#FDBE01" />
                        </TouchableOpacity>
                        <Logo />
                    </View>

                    <View style={styles.card}>
                        <Text style={styles.cardHeaderTitle}>New Password</Text>

                        <View style={[styles.inputContainer, passwordError ? styles.inputError : null, { marginBottom: 30 }]}>
                            <TextInput
                                style={styles.pillInputNoIcon}
                                placeholder="Enter new password"
                                placeholderTextColor="#999"
                                value={newPassword}
                                onChangeText={(val) => { setNewPassword(val); setPasswordError(''); }}
                                secureTextEntry={!showNewPassword}
                            />
                            <TouchableOpacity onPress={() => setShowNewPassword(!showNewPassword)} style={styles.inputRightIcon}>
                                <Ionicons name={showNewPassword ? "eye-outline" : "eye-off-outline"} size={24} color="#1A1A1A" />
                            </TouchableOpacity>
                        </View>

                        <View style={[styles.inputContainer, passwordError ? styles.inputError : null, { marginBottom: 30 }]}>
                            <TextInput
                                style={styles.pillInputNoIcon}
                                placeholder="Confirm password"
                                placeholderTextColor="#999"
                                value={confirmPassword}
                                onChangeText={(val) => { setConfirmPassword(val); setPasswordError(''); }}
                                secureTextEntry={!showConfirmPassword}
                            />
                            <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)} style={styles.inputRightIcon}>
                                <Ionicons name={showConfirmPassword ? "eye-outline" : "eye-off-outline"} size={24} color="#1A1A1A" />
                            </TouchableOpacity>
                        </View>

                        {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}

                        <TouchableOpacity style={styles.primaryButton} onPress={handleSavePassword} disabled={isLoading}>
                            <Text style={styles.primaryButtonText}>{isLoading ? 'Saving...' : 'Save Password'}</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#FFFFFF' },
    scrollContent: { flexGrow: 1 },
    header: { height: 320, backgroundColor: '#FFFFFF', justifyContent: 'center', alignItems: 'center' },
    backButton: { position: 'absolute', top: 60, left: 20, zIndex: 10 },
    logoContainer: { alignItems: 'center' },
    logoIcon: { marginBottom: 10 },
    logoTextMain: { fontSize: 38, fontFamily: serifFont, fontWeight: 'bold', color: '#1A1A1A', lineHeight: 42 },
    logoTextSub: { fontSize: 32, fontFamily: serifFont, fontWeight: 'bold', color: '#1A1A1A', marginTop: -5 },
    card: { flex: 1, backgroundColor: Colors.light.brandYellow, borderTopLeftRadius: 60, borderTopRightRadius: 60, paddingHorizontal: 30, paddingTop: 50, minHeight: 500 },
    cardHeaderTitle: { fontSize: 38, fontFamily: serifFont, fontWeight: 'bold', color: '#1A1A1A', textAlign: 'center', marginBottom: 40 },
    inputContainer: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFFFFF', borderRadius: 30, height: 60, paddingHorizontal: 25 },
    inputRightIcon: { marginLeft: 10 },
    pillInputNoIcon: { flex: 1, fontSize: 18, fontFamily: serifFont, color: '#1A1A1A', textAlign: 'left' },
    primaryButton: { backgroundColor: '#FFFFFF', borderRadius: 30, height: 60, justifyContent: 'center', alignItems: 'center', marginTop: 10 },
    primaryButtonText: { fontSize: 26, fontFamily: serifFont, fontWeight: 'bold', color: '#1A1A1A' },
    errorText: { color: '#EF4444', fontSize: 12, marginLeft: 20, marginTop: -15, marginBottom: 15, fontFamily: serifFont, textAlign: 'center' },
    inputError: { borderColor: '#EF4444', borderWidth: 1 },
});
