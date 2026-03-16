import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function PartnerPreferencesScreen() {
    const router = useRouter();

    // Dummy State for Preferences
    const [ageRange, setAgeRange] = useState('');
    const [heightRange, setHeightRange] = useState('');
    const [maritalStatus, setMaritalStatus] = useState('');
    const [religion, setReligion] = useState('');
    const [caste, setCaste] = useState('');
    const [education, setEducation] = useState('');
    const [profession, setProfession] = useState('');
    const [location, setLocation] = useState('');

    const handleSave = () => {
        // Implement save logic here
        router.back();
    };

    const OptionRow = ({ label, value }: { label: string, value: string }) => (
        <TouchableOpacity style={styles.optionRow}>
            <View style={{ flex: 1 }}>
                <Text style={styles.optionLabel}>{label}</Text>
                <Text style={styles.optionValue}>{value}</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#CCCCCC" />
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
                    <Ionicons name="arrow-back" size={24} color="#1A1A1A" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Partner Preferences</Text>
                <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                    <Text style={styles.saveButtonText}>Save</Text>
                </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>

                <View style={styles.infoBanner}>
                    <Ionicons name="information-circle" size={24} color="#134377" />
                    <Text style={styles.infoText}>
                        Profiles that match these preferences will be prioritized in your Discover and Matches views.
                    </Text>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>BASIC DETAILS</Text>
                    <View style={styles.optionsCard}>
                        <OptionRow label="Age Range" value={ageRange} />
                        <OptionRow label="Height Range" value={heightRange} />
                        <OptionRow label="Marital Status" value={maritalStatus} />
                    </View>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>RELIGIOUS BACKGROUND</Text>
                    <View style={styles.optionsCard}>
                        <OptionRow label="Religion" value={religion} />
                        <OptionRow label="Caste" value={caste} />
                        <OptionRow label="Mother Tongue" value="Tamil, Malayalam" />
                    </View>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>EDUCATION & CAREER</Text>
                    <View style={styles.optionsCard}>
                        <OptionRow label="Education" value={education} />
                        <OptionRow label="Profession" value={profession} />
                    </View>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>LOCATION</Text>
                    <View style={styles.optionsCard}>
                        <OptionRow label="City / State" value={location} />
                        <OptionRow label="Country" value="India" />
                    </View>
                </View>

            </ScrollView>
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
        backgroundColor: 'rgba(19, 67, 119, 0.1)', // Light blue tint based on header
        padding: 16,
        borderRadius: 12,
        marginBottom: 24,
        alignItems: 'center',
    },
    infoText: {
        flex: 1,
        marginLeft: 12,
        fontSize: 13,
        color: '#134377',
        lineHeight: 18,
        fontWeight: '500',
    },
    section: {
        marginBottom: 24,
    },
    sectionTitle: {
        fontSize: 12,
        fontWeight: 'bold',
        color: '#888888',
        marginBottom: 10,
        marginLeft: 4,
        letterSpacing: 1,
    },
    optionsCard: {
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: '#EEEEEE',
    },
    optionRow: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#F0F0F0',
    },
    optionLabel: {
        fontSize: 12,
        color: '#888888',
        marginBottom: 4,
        fontWeight: '600',
    },
    optionValue: {
        fontSize: 16,
        color: '#1A1A1A',
        fontWeight: '500',
    },
});
