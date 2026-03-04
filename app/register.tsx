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
    View
} from 'react-native';

const { width } = Dimensions.get('window');

type RegisterStep = 'choice' | 'email' | 'phone' | 'google' | 'otp';

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

const GoogleIcon = () => (
    <View style={styles.googleIconContainer}>
        <Ionicons name="logo-google" size={24} color="#EA4335" />
    </View>
);

export default function RegisterScreen() {
    const router = useRouter();
    const [step, setStep] = useState<RegisterStep>('choice');
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState(['', '', '', '']);
    const otpFields = useRef<Array<TextInput | null>>([]);

    const handleBack = () => {
        if (step === 'email' || step === 'phone' || step === 'google') setStep('choice');
        else if (step === 'otp') setStep('email');
        else router.back();
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
            {step !== 'choice' && (
                <TouchableOpacity style={styles.backButton} onPress={handleBack}>
                    <Ionicons name="chevron-back" size={28} color="#FDBE01" />
                </TouchableOpacity>
            )}
            {step !== 'google' ? <Logo /> : (
                <View style={styles.googleHeader}>
                    <Ionicons name="logo-google" size={100} color="#EA4335" />
                    <Text style={styles.googleHeaderText}>Choose an account</Text>
                </View>
            )}
        </View>
    );

    const renderChoice = () => (
        <View style={styles.card}>
            <View style={styles.spacer} />
            <TouchableOpacity style={styles.choiceButton} onPress={() => setStep('email')}>
                <Ionicons name="mail-outline" size={24} color="#1A1A1A" style={styles.choiceIcon} />
                <Text style={styles.choiceButtonText}>Sign Up with Email</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.choiceButton} onPress={() => setStep('phone')}>
                <Ionicons name="phone-portrait-outline" size={24} color="#1A1A1A" style={styles.choiceIcon} />
                <Text style={styles.choiceButtonText}>Sign Up with Phone</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.choiceButton} onPress={() => setStep('google')}>
                <Ionicons name="logo-google" size={24} color="#EA4335" style={styles.choiceIcon} />
                <Text style={styles.choiceButtonText}>Sign Up with Google</Text>
            </TouchableOpacity>

            <View style={styles.footerRow}>
                <Text style={styles.footerLabel}>Already have an account ?</Text>
                <TouchableOpacity
                    style={styles.actionButtonSmall}
                    onPress={() => router.replace('/login' as any)}
                >
                    <Text style={styles.actionButtonTextSmall}>login</Text>
                </TouchableOpacity>
            </View>
        </View>
    );

    const renderEmailInput = () => (
        <View style={styles.card}>
            <View style={styles.topSpacer} />
            <View style={styles.inputPill}>
                <Ionicons name="mail-outline" size={24} color="#1A1A1A" style={styles.pillIcon} />
                <TextInput
                    style={styles.pillInput}
                    placeholder="Enter your Email address"
                    placeholderTextColor="#999"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                />
            </View>

            <TouchableOpacity style={styles.primaryPillButton} onPress={() => setStep('otp')}>
                <Text style={styles.primaryPillButtonText}>Get OTP</Text>
            </TouchableOpacity>

            <View style={styles.footerRow}>
                <Text style={styles.footerLabel}>Already have an account ?</Text>
                <TouchableOpacity
                    style={styles.actionButtonSmall}
                    onPress={() => setStep('choice')}
                >
                    <Text style={styles.actionButtonTextSmall}>Sign up</Text>
                </TouchableOpacity>
            </View>
        </View>
    );

    const renderGoogleAccount = () => (
        <View style={styles.card}>
            <Text style={styles.googleCardHeader}>To Continue to signup</Text>

            <TouchableOpacity style={styles.accountPill}>
                <Ionicons name="mail-outline" size={24} color="#1A1A1A" style={styles.pillIcon} />
                <Text style={styles.accountText}>email@gmail.com</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.accountPill}>
                <Ionicons name="person-circle-outline" size={30} color="#1A1A1A" style={styles.pillIcon} />
                <Text style={styles.accountText}>Use other account</Text>
            </TouchableOpacity>

            <View style={styles.googleFooter}>
                <Text style={styles.footerLabel}>Already have an account ?</Text>
                <TouchableOpacity
                    style={styles.signupActionBtn}
                    onPress={() => router.replace('/login' as any)}
                >
                    <Text style={styles.signupActionText}>Signup</Text>
                </TouchableOpacity>
            </View>
        </View>
    );

    const renderOtpVerify = () => (
        <View style={styles.card}>
            <View style={styles.titleWithIcon}>
                <Text style={styles.stepHeader}>Enter your</Text>
                <MaterialCommunityIcons name="message-text-outline" size={32} color="#1A1A1A" />
            </View>
            <Text style={styles.stepTitle}>OTP Email OTP</Text>

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
                style={[styles.primaryPillButton, { marginTop: 80 }]}
                onPress={() => router.replace('/create-profile' as any)}
            >
                <Text style={styles.primaryPillButtonText}>Verify OTP</Text>
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
                {step === 'choice' && renderChoice()}
                {step === 'email' && renderEmailInput()}
                {step === 'phone' && renderEmailInput()} // Phone uses similar UI in prompt
                {step === 'google' && renderGoogleAccount()}
                {step === 'otp' && renderOtpVerify()}
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
    googleIconContainer: {
        marginBottom: 20,
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
    googleHeader: {
        alignItems: 'center',
        marginTop: 40,
    },
    googleHeaderText: {
        fontSize: 36,
        fontFamily: serifFont,
        fontWeight: 'bold',
        color: '#1A1A1A',
        marginTop: 20,
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
    spacer: {
        height: 30,
    },
    topSpacer: {
        height: 50,
    },
    choiceButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        borderRadius: 30,
        height: 60,
        paddingHorizontal: 25,
        marginBottom: 25,
    },
    choiceIcon: {
        marginRight: 15,
    },
    choiceButtonText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#888',
    },
    footerRow: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 'auto',
        marginBottom: 60,
        gap: 15,
    },
    footerLabel: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#1A1A1A',
    },
    actionButtonSmall: {
        backgroundColor: '#FFFFFF',
        paddingHorizontal: 35,
        paddingVertical: 12,
        borderRadius: 30,
    },
    actionButtonTextSmall: {
        fontSize: 18,
        fontFamily: serifFont,
        fontWeight: 'bold',
        color: '#1A1A1A',
    },
    inputPill: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        borderRadius: 30,
        height: 60,
        paddingHorizontal: 25,
        marginBottom: 60,
    },
    pillIcon: {
        marginRight: 15,
    },
    pillInput: {
        flex: 1,
        fontSize: 18,
        fontFamily: serifFont,
        color: '#1A1A1A',
    },
    primaryPillButton: {
        backgroundColor: '#FFFFFF',
        borderRadius: 30,
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
    },
    primaryPillButtonText: {
        fontSize: 26,
        fontFamily: serifFont,
        fontWeight: 'bold',
        color: '#1A1A1A',
    },
    googleCardHeader: {
        fontSize: 24,
        fontFamily: serifFont,
        fontWeight: 'bold',
        color: '#1A1A1A',
        textAlign: 'center',
        marginBottom: 40,
    },
    accountPill: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        borderRadius: 30,
        height: 60,
        paddingHorizontal: 25,
        marginBottom: 20,
    },
    accountText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#888',
    },
    googleFooter: {
        marginTop: 'auto',
        marginBottom: 60,
        alignItems: 'center',
        gap: 20,
    },
    signupActionBtn: {
        backgroundColor: '#FFFFFF',
        paddingHorizontal: 40,
        paddingVertical: 12,
        borderRadius: 30,
    },
    signupActionText: {
        fontSize: 20,
        fontFamily: serifFont,
        fontWeight: 'bold',
        color: '#1A1A1A',
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
