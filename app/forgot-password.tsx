import { Colors } from '@/constants/Colors';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { Link, useRouter } from 'expo-router';
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

type ForgotStep = 'forgot' | 'verify' | 'new_password';

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

export default function ForgotPasswordScreen() {
    const router = useRouter();
    const [step, setStep] = useState<ForgotStep>('forgot');
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState(['', '', '', '']);
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const otpFields = useRef<Array<TextInput | null>>([]);

    const validatePassword = (text: string) => /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&_])[A-Za-z\d@$!%*?&_]{8,}$/.test(text);

    const handleSavePassword = () => {
        if (!newPassword || !validatePassword(newPassword)) {
            setPasswordError('Password must be at least 8 chars with 1 uppercase, 1 lowercase, 1 number, and 1 special char');
            return;
        }
        if (newPassword !== confirmPassword) {
            setPasswordError('Passwords do not match');
            return;
        }
        setPasswordError('');
        router.replace('/login');
    };

    const handleBack = () => {
        if (step === 'forgot') router.back();
        else if (step === 'verify') setStep('forgot');
        else if (step === 'new_password') setStep('verify');
    };

    const handleOtpChange = (value: string, index: number) => {
        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);
        if (value.length === 1 && index < 3) {
            otpFields.current[index + 1]?.focus();
        }
    };

    const renderHeader = () => (
        <View style={styles.header}>
            <TouchableOpacity style={styles.backButton} onPress={handleBack}>
                <Ionicons name="chevron-back" size={28} color="#FDBE01" />
            </TouchableOpacity>
            <Logo />
        </View>
    );

    const renderStepForgot = () => (
        <View style={styles.card}>
            <Text style={styles.cardHeaderTitle}>Forgot password</Text>

            <View style={styles.inputContainer}>
                <Ionicons name="mail-outline" size={24} color="#1A1A1A" style={styles.inputIcon} />
                <TextInput
                    style={styles.pillInput}
                    placeholder="Enter your email"
                    placeholderTextColor="#999"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                />
            </View>

            <TouchableOpacity style={styles.primaryButton} onPress={() => setStep('verify')}>
                <Text style={styles.primaryButtonText}>Confirm</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.primaryButton, { marginTop: 25 }]} onPress={() => router.back()}>
                <Text style={styles.primaryButtonText}>Cancel</Text>
            </TouchableOpacity>

            <View style={styles.footerRow}>
                <Text style={styles.footerLabel}>Don&apos;t have an account?</Text>
                <Link href="/register" style={styles.actionButtonTextSmall}>
                    Signup
                </Link>
            </View>
        </View>
    );

    const renderStepVerify = () => (
        <View style={styles.card}>
            <Text style={styles.cardHeaderTitle}>Verification</Text>
            <Text style={styles.cardHeaderSubtitle}>Enter Verification Code</Text>

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
                <Text style={styles.resendLabel}>if you didn&apos;t received a code . </Text>
                <TouchableOpacity>
                    <Text style={styles.resendActionText}>Resend</Text>
                </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.primaryButton} onPress={() => setStep('new_password')}>
                <Text style={styles.primaryButtonText}>Continue</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.primaryButton, { marginTop: 25 }]} onPress={() => setStep('forgot')}>
                <Text style={styles.primaryButtonText}>Cancel</Text>
            </TouchableOpacity>
        </View>
    );

    const renderStepNewPassword = () => (
        <View style={styles.card}>
            <Text style={styles.cardHeaderTitle}>New Password</Text>

            <View style={[styles.inputContainer, passwordError ? styles.inputError : null, { marginBottom: 30 }]}>
                <TextInput
                    style={styles.pillInputNoIcon}
                    placeholder="Enter new password"
                    placeholderTextColor="#999"
                    value={newPassword}
                    onChangeText={(val) => { setNewPassword(val); setPasswordError(''); }}
                    secureTextEntry
                />
                <Ionicons name="eye-off-outline" size={20} color="#1A1A1A" style={styles.inputRightIcon} />
            </View>

            <View style={[styles.inputContainer, passwordError ? styles.inputError : null, { marginBottom: 30 }]}>
                <TextInput
                    style={styles.pillInputNoIcon}
                    placeholder="Confirm password"
                    placeholderTextColor="#999"
                    value={confirmPassword}
                    onChangeText={(val) => { setConfirmPassword(val); setPasswordError(''); }}
                    secureTextEntry
                />
                <Ionicons name="eye-off-outline" size={20} color="#1A1A1A" style={styles.inputRightIcon} />
            </View>

            {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}

            <TouchableOpacity style={styles.primaryButton} onPress={handleSavePassword}>
                <Text style={styles.primaryButtonText}>Save</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.primaryButton, { marginTop: 25 }]} onPress={() => setStep('verify')}>
                <Text style={styles.primaryButtonText}>Cancel</Text>
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
                {step === 'forgot' && renderStepForgot()}
                {step === 'verify' && renderStepVerify()}
                {step === 'new_password' && renderStepNewPassword()}
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
        zIndex: 10,
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
    cardHeaderTitle: {
        fontSize: 38,
        fontFamily: serifFont,
        fontWeight: 'bold',
        color: '#1A1A1A',
        textAlign: 'center',
        marginBottom: 40,
    },
    cardHeaderSubtitle: {
        fontSize: 24,
        fontFamily: serifFont,
        fontWeight: 'bold',
        color: '#1A1A1A',
        textAlign: 'center',
        marginTop: -30,
        marginBottom: 40,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        borderRadius: 30,
        height: 60,
        paddingHorizontal: 25,
        marginBottom: 80,
    },
    inputIcon: {
        marginRight: 15,
    },
    inputRightIcon: {
        marginLeft: 10,
    },
    pillInput: {
        flex: 1,
        fontSize: 18,
        fontFamily: serifFont,
        color: '#1A1A1A',
    },
    pillInputNoIcon: {
        flex: 1,
        fontSize: 18,
        fontFamily: serifFont,
        color: '#1A1A1A',
        textAlign: 'center',
    },
    primaryButton: {
        backgroundColor: '#FFFFFF',
        borderRadius: 30,
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
    },
    primaryButtonText: {
        fontSize: 26,
        fontFamily: serifFont,
        fontWeight: 'bold',
        color: '#1A1A1A',
    },
    otpRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginBottom: 30,
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
    resendRow: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 40,
    },
    resendLabel: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#1A1A1A',
    },
    resendActionText: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#FFFFFF',
        textDecorationLine: 'underline',
    },
    footerRow: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 'auto',
        marginBottom: 60,
        gap: 10,
    },
    footerLabel: {
        fontSize: 13,
        fontWeight: 'bold',
        color: '#1A1A1A',
    },
    actionButtonSmall: {
        backgroundColor: '#FFFFFF',
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 30,
    },
    actionButtonTextSmall: {
        fontSize: 16,
        fontFamily: serifFont,
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
    errorText: {
        color: '#EF4444',
        fontSize: 12,
        marginLeft: 20,
        marginTop: -15,
        marginBottom: 15,
        fontFamily: serifFont,
        textAlign: 'center',
    },
    inputError: {
        borderColor: '#EF4444',
        borderWidth: 1,
    },
});
