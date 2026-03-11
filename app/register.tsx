
import { Colors } from '@/constants/Colors';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { Link, useRouter } from 'expo-router';
import React, { useRef, useState } from 'react';
import {
    Dimensions,
    FlatList,
    KeyboardAvoidingView,
    Modal,
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

type RegisterStep = 'choice' | 'email' | 'phone' | 'otp';

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
    const [mobileNumber, setMobileNumber] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [emailError, setEmailError] = useState('');
    const [mobileError, setMobileError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [otp, setOtp] = useState(['', '', '', '']);
    const [googleModalVisible, setGoogleModalVisible] = useState(false);
    const otpFields = useRef<Array<TextInput | null>>([]);

    const deviceAccounts = [
        { id: '1', name: 'Hacking Tech Tamil', email: 'santhoshsanthosh446@gmail.com', icon: 'account-circle' },
        { id: '2', name: 'Sp.2021 sans', email: 'santhoshsanthosh433@gmail.com', icon: 'account-circle' },
        { id: '3', name: 'Sans edits', email: '2021sans@gmail.com', icon: 'account-circle' },
        { id: '4', name: 'Santhosh.s 2021', email: 'sans202123@gmail.com', icon: 'account-circle' },
        { id: '5', name: 'Santhosh Medifriendbot', email: 'santhoshmedifriendbot@gmail.com', icon: 'account-circle' },
    ];

    const validateEmail = (text: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(text);
    const validateMobile = (text: string) => /^[0-9]{10}$/.test(text);
    const validatePassword = (text: string) => /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&_])[A-Za-z\d@$!%*?&_]{8,}$/.test(text);

    const handleEmailSignup = () => {
        let valid = true;
        if (!email || !validateEmail(email)) {
            setEmailError('Please enter a valid email address');
            valid = false;
        } else {
            setEmailError('');
        }

        if (!password || !validatePassword(password)) {
            setPasswordError('Password must be at least 8 characters with 1 uppercase, 1 lowercase, 1 number, and 1 special character');
            valid = false;
        } else {
            setPasswordError('');
        }

        if (valid) {
            setStep('otp');
        }
    };

    const handleMobileSignup = () => {
        let valid = true;
        if (!mobileNumber || !validateMobile(mobileNumber)) {
            setMobileError('Mobile number must be exactly 10 digits');
            valid = false;
        } else {
            setMobileError('');
        }

        if (!password || !validatePassword(password)) {
            setPasswordError('Password must be at least 8 characters with 1 uppercase, 1 lowercase, 1 number, and 1 special character');
            valid = false;
        } else {
            setPasswordError('');
        }

        if (valid) {
            setStep('otp');
        }
    };

    const handleBack = () => {
        if (step === 'email' || step === 'phone') setStep('choice');
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
            <Logo />
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

            <TouchableOpacity style={styles.choiceButton} onPress={() => setGoogleModalVisible(true)}>
                <Ionicons name="logo-google" size={24} color="#EA4335" style={styles.choiceIcon} />
                <Text style={styles.choiceButtonText}>Sign Up with Google</Text>
            </TouchableOpacity>

            <View style={styles.footerRow}>
                <Text style={styles.footerLabel}>Already have an account ? </Text>
                <Link href="/login" style={styles.actionButtonTextSmall}>
                    Login
                </Link>
            </View>
        </View>
    );

    const renderEmailInput = () => (
        <View style={styles.card}>
            <View style={styles.topSpacer} />
            <View style={[styles.inputPill, emailError ? styles.inputError : null, { marginBottom: 20 }]}>
                <Ionicons name="mail-outline" size={24} color="#1A1A1A" style={styles.pillIcon} />
                <TextInput
                    style={styles.pillInput}
                    placeholder="Enter your Email address"
                    placeholderTextColor="#999"
                    value={email}
                    onChangeText={(val) => { setEmail(val); setEmailError(''); }}
                    keyboardType="email-address"
                    autoCapitalize="none"
                />
            </View>
            {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}

            <View style={[styles.inputPill, passwordError ? styles.inputError : null, { marginBottom: 40 }]}>
                <Ionicons name="lock-closed-outline" size={24} color="#1A1A1A" style={styles.pillIcon} />
                <TextInput
                    style={styles.pillInput}
                    placeholder="Create a password"
                    placeholderTextColor="#999"
                    value={password}
                    onChangeText={(val) => { setPassword(val); setPasswordError(''); }}
                    secureTextEntry={!showPassword}
                />
                <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.inputRightIcon}>
                    <Ionicons name={showPassword ? "eye-outline" : "eye-off-outline"} size={24} color="#1A1A1A" />
                </TouchableOpacity>
            </View>
            {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}

            <TouchableOpacity style={styles.primaryPillButton} onPress={handleEmailSignup}>
                <Text style={styles.primaryPillButtonText}>Get OTP</Text>
            </TouchableOpacity>

            <View style={styles.footerRow}>
                <TouchableOpacity onPress={() => setStep('choice')}>
                    <Text style={styles.actionButtonTextSmall}>Back to options</Text>
                </TouchableOpacity>
            </View>
        </View>
    );

    const renderPhoneInput = () => (
        <View style={styles.card}>
            <View style={styles.topSpacer} />

            <View style={[styles.inputPill, { paddingLeft: 0 }, mobileError ? styles.inputError : null, { marginBottom: 20 }]}>
                <View style={styles.countryCode}>
                    <Text style={styles.countryCodeText}>+ 91</Text>
                </View>
                <TextInput
                    style={[styles.pillInput, { paddingLeft: 10 }]}
                    placeholder="Enter your Mobile number"
                    placeholderTextColor="#999"
                    value={mobileNumber}
                    onChangeText={(val) => { setMobileNumber(val.replace(/[^0-9]/g, '').slice(0, 10)); setMobileError(''); }}
                    keyboardType="phone-pad"
                    maxLength={10}
                />
            </View>
            {mobileError ? <Text style={styles.errorText}>{mobileError}</Text> : null}

            <View style={[styles.inputPill, passwordError ? styles.inputError : null, { marginBottom: 40 }]}>
                <Ionicons name="lock-closed-outline" size={24} color="#1A1A1A" style={styles.pillIcon} />
                <TextInput
                    style={styles.pillInput}
                    placeholder="Create a password"
                    placeholderTextColor="#999"
                    value={password}
                    onChangeText={(val) => { setPassword(val); setPasswordError(''); }}
                    secureTextEntry={!showPassword}
                />
                <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.inputRightIcon}>
                    <Ionicons name={showPassword ? "eye-outline" : "eye-off-outline"} size={24} color="#1A1A1A" />
                </TouchableOpacity>
            </View>
            {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}

            <TouchableOpacity style={styles.primaryPillButton} onPress={handleMobileSignup}>
                <Text style={styles.primaryPillButtonText}>Get OTP</Text>
            </TouchableOpacity>

            <View style={styles.footerRow}>
                <TouchableOpacity onPress={() => setStep('choice')}>
                    <Text style={styles.actionButtonTextSmall}>Back to options</Text>
                </TouchableOpacity>
            </View>
        </View>
    );

    const renderGoogleModal = () => (
        <Modal
            animationType="slide"
            transparent={true}
            visible={googleModalVisible}
            onRequestClose={() => setGoogleModalVisible(false)}
        >
            <TouchableOpacity
                style={styles.modalOverlay}
                activeOpacity={1}
                onPress={() => setGoogleModalVisible(false)}
            >
                <View style={styles.googlePopupContainer}>
                    <View style={styles.googlePopupHeader}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
                            <Ionicons name="logo-google" size={32} color="#EA4335" />
                            <Text style={styles.googlePopupTitle}>Choose an account</Text>
                        </View>
                        <TouchableOpacity onPress={() => setGoogleModalVisible(false)}>
                            <Ionicons name="close" size={28} color="#666" />
                        </TouchableOpacity>
                    </View>

                    <Text style={styles.googlePopupSubtitle}>to continue to Ratan Matrimony</Text>

                    <FlatList
                        data={deviceAccounts}
                        keyExtractor={(item) => item.id}
                        renderItem={({ item }) => (
                            <TouchableOpacity
                                style={styles.googleAccountItem}
                                onPress={() => {
                                    setGoogleModalVisible(false);
                                    router.push('/(tabs)' as any);
                                }}
                            >
                                <View style={styles.accountIconContainer}>
                                    <MaterialCommunityIcons name={item.icon as any} size={28} color="#E8EAED" />
                                </View>
                                <View style={styles.accountTextContainer}>
                                    <Text style={styles.accountNameText}>{item.name}</Text>
                                    <Text style={styles.accountEmailText}>{item.email}</Text>
                                    <Text style={styles.signInWithGoogleText}>Sign in with Google</Text>
                                </View>
                            </TouchableOpacity>
                        )}
                        ItemSeparatorComponent={() => <View style={styles.accountSeparator} />}
                        style={{ marginVertical: 10 }}
                    />

                    <TouchableOpacity
                        style={[styles.googleAccountItem, { marginTop: 10 }]}
                        onPress={() => {
                            setGoogleModalVisible(false);
                            router.push('/(tabs)' as any);
                        }}
                    >
                        <View style={styles.accountIconContainer}>
                            <Ionicons name="person-circle-outline" size={28} color="#E8EAED" />
                        </View>
                        <View style={styles.accountTextContainer}>
                            <Text style={styles.accountNameText}>Use another account</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </TouchableOpacity>
        </Modal>
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
        <SafeAreaView style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
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
                {step === 'phone' && renderPhoneInput()}
                {step === 'otp' && renderOtpVerify()}
            </ScrollView>
            {renderGoogleModal()}
            </KeyboardAvoidingView>
        </SafeAreaView>
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
        paddingHorizontal: 20,
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
        borderRadius: 12,
        height: 52,
        paddingHorizontal: 25,
        marginBottom: 16,
        elevation: 1,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 1,
    },
    choiceIcon: {
        marginRight: 15,
    },
    choiceButtonText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#444',
        fontFamily: serifFont,
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
        fontFamily: serifFont,
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
        borderRadius: 12,
        height: 52,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
    },
    primaryPillButtonText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#1A1A1A',
        fontFamily: serifFont,
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
    inputRightIcon: {
        marginLeft: 10,
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
        fontFamily: serifFont,
    },
    errorText: {
        color: '#EF4444',
        fontSize: 12,
        marginLeft: 20,
        marginTop: -15,
        marginBottom: 15,
        fontFamily: serifFont,
    },
    inputError: {
        borderColor: '#EF4444',
        borderWidth: 1,
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'flex-end',
    },
    googlePopupContainer: {
        backgroundColor: '#202124',
        borderTopLeftRadius: 28,
        borderTopRightRadius: 28,
        paddingHorizontal: 24,
        paddingTop: 16,
        paddingBottom: 40,
        maxHeight: '85%',
    },
    googlePopupHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    googlePopupTitle: {
        fontSize: 24,
        color: '#E8EAED',
        textAlign: 'center',
        fontFamily: serifFont,
        fontWeight: '500',
    },
    googlePopupSubtitle: {
        fontSize: 14,
        color: '#9AA0A6',
        textAlign: 'center',
        marginBottom: 30,
        marginTop: 4,
    },
    googleAccountItem: {
        flexDirection: 'row',
        paddingVertical: 16,
        alignItems: 'center',
    },
    accountIconContainer: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#3C4043',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16,
    },
    accountTextContainer: {
        flex: 1,
    },
    accountNameText: {
        fontSize: 16,
        color: '#E8EAED',
        fontWeight: '500',
    },
    accountEmailText: {
        fontSize: 14,
        color: '#9AA0A6',
    },
    signInWithGoogleText: {
        fontSize: 12,
        color: '#9AA0A6',
        marginTop: 2,
    },
    accountSeparator: {
        height: 1,
        backgroundColor: '#3C4043',
    },
});
