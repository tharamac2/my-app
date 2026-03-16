import { Colors } from '@/constants/Colors';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { Link, useLocalSearchParams, useRouter } from 'expo-router';
import React, { useRef, useState } from 'react';
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

const { width } = Dimensions.get('window');

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

export default function OtpVerificationScreen() {
    const router = useRouter();
    const { email, type, phone } = useLocalSearchParams();
    const [otp, setOtp] = useState(['', '', '', '']);
    const otpFields = useRef<Array<TextInput | null>>([]);

    const handleBack = () => {
        router.back();
    };

    const handleOtpChange = (value: string, index: number) => {
        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);
        if (value.length === 1 && index < 3) {
            otpFields.current[index + 1]?.focus();
        }
    };

    const handleVerify = () => {
        const otpString = otp.join('');
        if (otpString.length !== 4) return;
        
        if (type === 'reset') {
            router.push({ pathname: '/(auth)/reset-password', params: { email, otp: otpString } } as any);
        } else if (type === 'login') {
            // Call API to login with OTP
            router.replace('/(tabs)');
        }
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
            <KeyboardAvoidingView
                style={styles.container}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            >
                <ScrollView contentContainerStyle={styles.scrollContent} bounces={false}>
                    <View style={styles.header}>
                        <TouchableOpacity style={styles.backButton} onPress={handleBack}>
                            <Ionicons name="chevron-back" size={28} color="#FDBE01" />
                        </TouchableOpacity>
                        <Logo />
                    </View>

                    <View style={styles.card}>
                        <Text style={styles.cardHeaderTitle}>Verification</Text>
                        <Text style={styles.cardHeaderSubtitle}>
                            Enter code sent to {email || phone}
                        </Text>

                        <View style={styles.otpRow}>
                            {[0, 1, 2, 3].map((index) => (
                                <TextInput
                                    key={index}
                                    ref={(ref) => { otpFields.current[index] = ref; }}
                                    style={styles.otpInput}
                                    maxLength={1}
                                    keyboardType="number-pad"
                                    value={otp[index]}
                                    onChangeText={(val) => handleOtpChange(val, index)}
                                />
                            ))}
                        </View>

                        <View style={styles.resendRow}>
                            <Text style={styles.resendLabel}>Didn't receive a code? </Text>
                            <TouchableOpacity>
                                <Text style={styles.resendActionText}>Resend</Text>
                            </TouchableOpacity>
                        </View>

                        <TouchableOpacity style={styles.primaryButton} onPress={handleVerify}>
                            <Text style={styles.primaryButtonText}>Verify</Text>
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
    cardHeaderTitle: { fontSize: 38, fontFamily: serifFont, fontWeight: 'bold', color: '#1A1A1A', textAlign: 'center', marginBottom: 20 },
    cardHeaderSubtitle: { fontSize: 16, fontFamily: serifFont, color: '#1A1A1A', textAlign: 'center', marginBottom: 40 },
    primaryButton: { backgroundColor: '#FFFFFF', borderRadius: 30, height: 60, justifyContent: 'center', alignItems: 'center' },
    primaryButtonText: { fontSize: 26, fontFamily: serifFont, fontWeight: 'bold', color: '#1A1A1A' },
    otpRow: { flexDirection: 'row', justifyContent: 'space-between', width: '100%', marginBottom: 30 },
    otpInput: { backgroundColor: '#FFFFFF', width: width * 0.18, height: 70, borderRadius: 15, textAlign: 'center', fontSize: 24, fontWeight: 'bold', color: '#1A1A1A' },
    resendRow: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginBottom: 40 },
    resendLabel: { fontSize: 14, fontWeight: 'bold', color: '#1A1A1A' },
    resendActionText: { fontSize: 14, fontWeight: 'bold', color: '#FFFFFF', textDecorationLine: 'underline' },
});
