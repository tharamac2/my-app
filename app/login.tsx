import { Colors } from '@/constants/Colors';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
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

const { width } = Dimensions.get('window');

type LoginStep = 'email' | 'mobile' | 'otp';

const serifFont = Platform.select({
    ios: 'Georgia',
    android: 'serif',
    default: 'serif',
});

// Simple Logo Component that mimics "Ratan Matrimony"
const Logo = () => (
    <View style={styles.logoContainer}>
        <View style={styles.logoIcon}>
            <MaterialCommunityIcons name="heart-multiple-outline" size={80} color="#1A1A1A" />
        </View>
        <Text style={styles.logoTextMain}>Ratan</Text>
        <Text style={styles.logoTextSub}>matrimony</Text>
    </View>
);

export default function LoginScreen() {
    const router = useRouter();
    const [step, setStep] = useState<LoginStep>('email');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [mobileNumber, setMobileNumber] = useState('');
    const [otp, setOtp] = useState(['', '', '', '']);
    const otpFields = useRef<Array<TextInput | null>>([]);

    const handleBack = () => {
        if (step === 'otp') setStep('mobile');
        else if (step === 'mobile') setStep('email');
        else router.back();
    };

    const handleOtpChange = (value: string, index: number) => {
        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

        // Auto focus next field
        if (value.length === 1 && index < 3) {
            otpFields.current[index + 1]?.focus();
        }
    };

    const renderHeader = () => (
        <View style={styles.header}>
            {(step === 'mobile' || step === 'otp') && (
                <TouchableOpacity style={styles.backButton} onPress={handleBack}>
                    <Ionicons name="chevron-back" size={28} color="#FDBE01" />
                </TouchableOpacity>
            )}
            <Logo />
        </View>
    );

    const renderEmailLogin = () => (
        <View style={styles.card}>
            <Text style={styles.cardTitle}>login</Text>

            <View style={styles.inputContainer}>
                <Ionicons name="mail-outline" size={20} color="#1A1A1A" style={styles.inputIcon} />
                <TextInput
                    style={styles.input}
                    placeholder="Enter your email address"
                    placeholderTextColor="#666"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                />
            </View>

            <View style={styles.inputContainer}>
                <Ionicons name="lock-closed-outline" size={20} color="#1A1A1A" style={styles.inputIcon} />
                <TextInput
                    style={styles.input}
                    placeholder="Password"
                    placeholderTextColor="#666"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                />
                <Ionicons name="eye-off-outline" size={20} color="#1A1A1A" style={styles.inputRightIcon} />
            </View>

            <View style={styles.linksRow}>
                <TouchableOpacity onPress={() => setStep('mobile')}>
                    <Text style={styles.linkTextBold}>Login with OTP</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => router.push('/forgot-password' as any)}>
                    <Text style={styles.linkTextBold}>Forgot Password?</Text>
                </TouchableOpacity>
            </View>

            <TouchableOpacity
                style={styles.primaryButton}
                onPress={() => router.replace('/(tabs)' as any)}
            >
                <Text style={styles.primaryButtonText}>login</Text>
            </TouchableOpacity>

            <View style={styles.footer}>
                <Text style={styles.footerText}>Don't have an account?</Text>
                <TouchableOpacity
                    style={styles.signupButtonSmall}
                    onPress={() => router.push('/register' as any)}
                >
                    <Text style={[styles.linkTextBold, { fontSize: 16 }]}>Signup</Text>
                </TouchableOpacity>
            </View>
        </View>
    );

    const renderMobileLogin = () => (
        <View style={styles.card}>
            <View style={styles.titleWithIcon}>
                <Text style={styles.stepHeader}>Enter your</Text>
                <Ionicons name="phone-portrait-outline" size={32} color="#1A1A1A" />
            </View>
            <Text style={styles.stepTitle}>Mobile number</Text>

            <View style={[styles.inputContainer, { paddingLeft: 0 }]}>
                <View style={styles.countryCode}>
                    <Text style={styles.countryCodeText}>+ 91</Text>
                </View>
                <TextInput
                    style={[styles.input, { paddingLeft: 10 }]}
                    placeholder="Enter your Mobile number"
                    placeholderTextColor="#666"
                    value={mobileNumber}
                    onChangeText={setMobileNumber}
                    keyboardType="phone-pad"
                />
            </View>

            <TouchableOpacity
                style={[styles.primaryButton, { marginTop: 60 }]}
                onPress={() => setStep('otp')}
            >
                <Text style={styles.primaryButtonText}>Get OTP</Text>
            </TouchableOpacity>

            <View style={styles.footerButtons}>
                <TouchableOpacity style={styles.footerActionBtn} onPress={() => setStep('email')}>
                    <Text style={styles.footerActionText}>login</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.footerActionBtn} onPress={() => router.push('/register' as any)}>
                    <Text style={styles.footerActionText}>Signup</Text>
                </TouchableOpacity>
            </View>
        </View>
    );

    const renderOtpVerification = () => (
        <View style={styles.card}>
            <View style={styles.titleWithIcon}>
                <Text style={styles.stepHeader}>Enter your</Text>
                <MaterialCommunityIcons name="message-text-outline" size={32} color="#1A1A1A" />
            </View>
            <Text style={styles.stepTitle}>OTP number</Text>

            <View style={styles.otpRow}>
                {[0, 1, 2, 3].map((index) => (
                    <TextInput
                        key={index}
                        ref={(ref) => {
                            otpFields.current[index] = ref;
                        }}
                        style={styles.otpInput}
                        maxLength={1}
                        keyboardType="number-pad"
                        value={otp[index]}
                        onChangeText={(val) => handleOtpChange(val, index)}
                    />
                ))}
            </View>

            <TouchableOpacity
                style={[styles.primaryButton, { marginTop: 80 }]}
                onPress={() => router.replace('/(tabs)' as any)}
            >
                <Text style={styles.primaryButtonText}>Verify OTP</Text>
            </TouchableOpacity>
        </View>
    );

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            <ScrollView
                contentContainerStyle={styles.scrollContent}
                bounces={false}
                showsVerticalScrollIndicator={false}
            >
                {renderHeader()}
                {step === 'email' && renderEmailLogin()}
                {step === 'mobile' && renderMobileLogin()}
                {step === 'otp' && renderOtpVerification()}
            </ScrollView>
            <View style={styles.homeIndicator} />
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    scrollContent: {
        flexGrow: 1,
    },
    header: {
        height: 320,
        backgroundColor: '#FFFFFF',
        justifyContent: 'center',
        alignItems: 'center',
    },
    backButton: {
        position: 'absolute',
        top: 60,
        left: 20,
    },
    logoContainer: {
        alignItems: 'center',
    },
    logoIcon: {
        marginBottom: 10,
    },
    logoTextMain: {
        fontSize: 38,
        fontFamily: serifFont,
        fontWeight: 'bold',
        color: '#1A1A1A',
        lineHeight: 42,
    },
    logoTextSub: {
        fontSize: 32,
        fontFamily: serifFont,
        fontWeight: 'bold',
        color: '#1A1A1A',
        marginTop: -5,
    },
    card: {
        flex: 1,
        backgroundColor: Colors.light.brandYellow,
        borderTopLeftRadius: 60,
        borderTopRightRadius: 60,
        paddingHorizontal: 30,
        paddingTop: 50,
        minHeight: 500,
    },
    cardTitle: {
        fontSize: 36,
        fontFamily: serifFont,
        fontWeight: 'bold',
        color: '#1A1A1A',
        textAlign: 'center',
        marginBottom: 40,
    },
    titleWithIcon: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
    },
    stepHeader: {
        fontSize: 24,
        fontFamily: serifFont,
        fontWeight: 'bold',
        color: '#1A1A1A',
    },
    stepTitle: {
        fontSize: 34,
        fontFamily: serifFont,
        fontWeight: 'bold',
        color: '#1A1A1A',
        marginBottom: 40,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        borderRadius: 30,
        paddingHorizontal: 20,
        height: 55,
        marginBottom: 20,
    },
    inputIcon: {
        marginRight: 10,
    },
    inputRightIcon: {
        marginLeft: 10,
    },
    input: {
        flex: 1,
        fontSize: 18,
        color: '#1A1A1A',
        fontFamily: serifFont,
    },
    countryCode: {
        paddingHorizontal: 20,
        borderRightWidth: 1,
        borderRightColor: '#E0E0E0',
        height: '100%',
        justifyContent: 'center',
    },
    countryCodeText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#1A1A1A',
    },
    linksRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 5,
        marginTop: 5,
        marginBottom: 40,
    },
    linkTextBold: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#1A1A1A',
    },
    primaryButton: {
        backgroundColor: '#FFFFFF',
        borderRadius: 30,
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 30,
    },
    primaryButtonText: {
        fontSize: 28,
        fontFamily: serifFont,
        fontWeight: 'bold',
        color: '#1A1A1A',
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 10,
        marginTop: 'auto',
        marginBottom: 40,
    },
    footerText: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#1A1A1A',
    },
    signupButtonSmall: {
        backgroundColor: '#FFFFFF',
        paddingHorizontal: 25,
        paddingVertical: 10,
        borderRadius: 25,
    },
    footerButtons: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        gap: 15,
        marginTop: 'auto',
        marginBottom: 40,
    },
    footerActionBtn: {
        backgroundColor: '#FFFFFF',
        paddingHorizontal: 25,
        paddingVertical: 10,
        borderRadius: 25,
        minWidth: 100,
        alignItems: 'center',
    },
    footerActionText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#1A1A1A',
    },
    otpRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
    otpInput: {
        backgroundColor: '#FFFFFF',
        width: width * 0.18,
        height: 70,
        borderRadius: 15,
        textAlign: 'center',
        fontSize: 24,
        fontWeight: 'bold',
        color: '#1A1A1A',
    },
    homeIndicator: {
        position: 'absolute',
        bottom: 8,
        width: 140,
        height: 5,
        backgroundColor: '#1A1A1A',
        borderRadius: 10,
        alignSelf: 'center',
    },
});
