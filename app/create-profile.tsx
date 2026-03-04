import { FormInput } from '@/components/ui/FormInput';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { PrimaryButton } from '@/components/ui/PrimaryButton';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function CreateProfileScreen() {
    const router = useRouter();
    const theme = useColorScheme() ?? 'light';
    const colors = Colors[theme];

    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(false);

    // Form State
    const [dob, setDob] = useState('');
    const [gender, setGender] = useState('');
    const [religion, setReligion] = useState('');
    const [height, setHeight] = useState('');
    const [profession, setProfession] = useState('');

    const handleNext = () => {
        if (step < 3) {
            setStep(step + 1);
        } else {
            setLoading(true);
            setTimeout(() => {
                setLoading(false);
                router.replace('/(tabs)');
            }, 1500);
        }
    };

    const renderStepIndicator = () => (
        <View style={styles.stepIndicator}>
            {[1, 2, 3].map((s) => (
                <View
                    key={s}
                    style={[
                        styles.stepDot,
                        { backgroundColor: s <= step ? colors.primary : colors.border },
                        s === step && styles.activeStepDot
                    ]}
                />
            ))}
        </View>
    );

    return (
        <KeyboardAvoidingView
            style={[styles.container, { backgroundColor: colors.background }]}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            <ScrollView contentContainerStyle={styles.scrollContent}>
                <View style={styles.header}>
                    <Text style={[styles.title, { color: colors.primary }]}>Complete Profile</Text>
                    <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
                        {step === 1 && "Start with the basics. This helps us find the right matches."}
                        {step === 2 && "Tell us about your background and profession."}
                        {step === 3 && "Add a great photo to stand out!"}
                    </Text>
                </View>

                {renderStepIndicator()}

                <View style={styles.form}>
                    {step === 1 && (
                        <>
                            <FormInput label="Date of Birth" placeholder="DD/MM/YYYY" value={dob} onChangeText={setDob} />
                            <FormInput label="Gender" placeholder="Male / Female / Other" value={gender} onChangeText={setGender} />
                            <FormInput label="Height" placeholder="e.g. 5'8&quot;" value={height} onChangeText={setHeight} />
                        </>
                    )}

                    {step === 2 && (
                        <>
                            <FormInput label="Religion / Community" placeholder="Enter your religion" value={religion} onChangeText={setReligion} />
                            <FormInput label="Profession" placeholder="What do you do?" value={profession} onChangeText={setProfession} />
                        </>
                    )}

                    {step === 3 && (
                        <View style={styles.photoUploadContainer}>
                            <TouchableOpacity style={[styles.photoUploadBox, { borderColor: colors.border, backgroundColor: colors.surface }]}>
                                <IconSymbol name="camera.fill" size={40} color={colors.textSecondary} />
                                <Text style={[styles.photoUploadText, { color: colors.textSecondary }]}>Tap to upload photo</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                </View>

                <View style={styles.footer}>
                    {step > 1 && (
                        <PrimaryButton
                            title="Back"
                            type="outline"
                            onPress={() => setStep(step - 1)}
                            style={styles.halfButton}
                        />
                    )}
                    <PrimaryButton
                        title={step === 3 ? "Complete" : "Next"}
                        onPress={handleNext}
                        loading={loading}
                        style={step > 1 ? styles.halfButton : styles.fullButton}
                    />
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1 },
    scrollContent: { flexGrow: 1, padding: 24, justifyContent: 'center' },
    header: { marginBottom: 24 },
    title: { fontSize: 32, fontWeight: 'bold', marginBottom: 8 },
    subtitle: { fontSize: 16, lineHeight: 24 },
    stepIndicator: { flexDirection: 'row', justifyContent: 'center', marginBottom: 32, gap: 8 },
    stepDot: { width: 12, height: 12, borderRadius: 6 },
    activeStepDot: { width: 24 },
    form: { marginBottom: 32, minHeight: 250 },
    photoUploadContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    photoUploadBox: { width: 200, height: 200, borderRadius: 100, borderWidth: 2, borderStyle: 'dashed', justifyContent: 'center', alignItems: 'center' },
    photoUploadText: { marginTop: 12, fontSize: 14 },
    footer: { flexDirection: 'row', justifyContent: 'space-between', gap: 16, marginTop: 'auto' },
    halfButton: { flex: 1 },
    fullButton: { width: '100%' },
});
