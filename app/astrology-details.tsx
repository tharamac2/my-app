import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
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

export default function AstrologyDetailsScreen() {
    const router = useRouter();

    // Astro State
    const [nakshatra, setNakshatra] = useState('Bharani');
    const [rasi, setRasi] = useState('Mesha');
    const [padam, setPadam] = useState('2');
    const [gothram, setGothram] = useState('Siva');
    const [dob, setDob] = useState('14 Aug 1996');
    const [timeOfBirth, setTimeOfBirth] = useState('10:30 AM');
    const [placeOfBirth, setPlaceOfBirth] = useState('Chennai');

    const handleSave = () => {
        // In a real app, this would ping the `/api/matches/compatibility` logic 
        // or update the `user_astrology` database table.
        router.back();
    };

    return (
        <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
                    <Ionicons name="arrow-back" size={24} color="#1A1A1A" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Astrological Details</Text>
                <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                    <Text style={styles.saveButtonText}>Save</Text>
                </TouchableOpacity>
            </View>

            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            >
                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>

                    <View style={styles.infoBanner}>
                        <Ionicons name="sparkles" size={24} color="#FDBE01" />
                        <Text style={styles.infoText}>
                            Providing accurate Vedic astrology details helps our engine calculate the '10 Porutham' compatibility score with your matches.
                        </Text>
                    </View>

                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>BIRTH CHART DETAILS</Text>

                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Nakshatra (Star)</Text>
                            <TextInput
                                style={styles.input}
                                value={nakshatra}
                                onChangeText={setNakshatra}
                                placeholder="e.g. Ashwini, Bharani"
                            />
                        </View>

                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Rasi (Moon Sign)</Text>
                            <TextInput
                                style={styles.input}
                                value={rasi}
                                onChangeText={setRasi}
                                placeholder="e.g. Mesha, Rishabha"
                            />
                        </View>

                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Padam</Text>
                            <TextInput
                                style={styles.input}
                                value={padam}
                                onChangeText={setPadam}
                                keyboardType="numeric"
                                placeholder="1, 2, 3, or 4"
                            />
                        </View>

                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Gothram</Text>
                            <TextInput
                                style={styles.input}
                                value={gothram}
                                onChangeText={setGothram}
                                placeholder="Enter Gothram"
                            />
                        </View>
                    </View>

                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>BIRTH TIME & PLACE</Text>

                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Date of Birth</Text>
                            <TextInput
                                style={styles.input}
                                value={dob}
                                onChangeText={setDob}
                                placeholder="DD MMM YYYY"
                            />
                        </View>

                        <View style={styles.rowInputs}>
                            <View style={[styles.inputGroup, { flex: 1, marginRight: 10 }]}>
                                <Text style={styles.label}>Time of Birth</Text>
                                <TextInput
                                    style={styles.input}
                                    value={timeOfBirth}
                                    onChangeText={setTimeOfBirth}
                                    placeholder="HH:MM AM/PM"
                                />
                            </View>

                            <View style={[styles.inputGroup, { flex: 1 }]}>
                                <Text style={styles.label}>Place of Birth</Text>
                                <TextInput
                                    style={styles.input}
                                    value={placeOfBirth}
                                    onChangeText={setPlaceOfBirth}
                                    placeholder="City"
                                />
                            </View>
                        </View>
                    </View>

                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F5F5',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingVertical: 15,
        backgroundColor: '#FFFFFF',
        borderBottomWidth: 1,
        borderBottomColor: '#EEEEEE',
    },
    backButton: {
        padding: 5,
        marginLeft: -5,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#1A1A1A',
    },
    saveButton: {
        paddingVertical: 6,
        paddingHorizontal: 12,
        backgroundColor: '#FDBE01',
        borderRadius: 16,
    },
    saveButtonText: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#1A1A1A',
    },
    scrollContent: {
        padding: 20,
        paddingBottom: 40,
    },
    infoBanner: {
        flexDirection: 'row',
        backgroundColor: '#1A1A1A', // Dark mode contrast
        padding: 16,
        borderRadius: 12,
        marginBottom: 24,
        alignItems: 'center',
    },
    infoText: {
        flex: 1,
        marginLeft: 12,
        fontSize: 13,
        color: '#EAEAEA',
        lineHeight: 18,
        fontWeight: '500',
    },
    section: {
        marginBottom: 25,
    },
    sectionTitle: {
        fontSize: 12,
        fontWeight: 'bold',
        color: '#888888',
        marginBottom: 12,
        marginLeft: 4,
        letterSpacing: 1,
    },
    inputGroup: {
        backgroundColor: '#FFFFFF',
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderRadius: 12,
        marginBottom: 10,
        borderWidth: 1,
        borderColor: '#EEEEEE',
    },
    rowInputs: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    label: {
        fontSize: 12,
        color: '#666666',
        marginBottom: 6,
        fontWeight: '500',
    },
    input: {
        fontSize: 16,
        color: '#1A1A1A',
        fontWeight: '500',
    },
});
