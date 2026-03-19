import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState, useEffect } from 'react';
import api from '../services/api';
import {
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Modal,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const AGE_RANGES = ["18 - 22", "22 - 26", "26 - 30", "30 - 35", "35 - 40", "40+"];
const HEIGHT_RANGES = ["4'0'' - 5'0''", "5'0'' - 5'4''", "5'4'' - 5'8''", "5'8'' - 6'0''", "6'0''+"];
const MARITAL_STATUSES = ["Never Married", "Divorced", "Widowed", "Awaiting Divorce", "Any"];
const RELIGIONS = ["Hindu", "Muslim", "Christian", "Sikh", "Jain", "Buddhist", "Any"];
const CASTES = ["Brahmin", "Kshatriya", "Vaisya", "Shudra", "Any"];
const EDUCATIONS = ["High School", "Bachelors Degree", "Masters Degree", "Doctorate", "Any"];
const PROFESSIONS = ["Software Engineer", "Doctor", "Teacher", "Business", "Government Service", "Other", "Any"];
const LOCATIONS = ["Delhi", "Mumbai", "Bangalore", "Chennai", "Hyderabad", "Kolkata", "Pune", "Any Local", "Anywhere"];

export default function PartnerPreferencesScreen() {
    const router = useRouter();

    const [ageRange, setAgeRange] = useState('');
    const [heightRange, setHeightRange] = useState('');
    const [maritalStatus, setMaritalStatus] = useState('');
    const [religion, setReligion] = useState('');
    const [caste, setCaste] = useState('');
    const [education, setEducation] = useState('');
    const [profession, setProfession] = useState('');
    const [location, setLocation] = useState('');

    // Picker State
    const [pickerVisible, setPickerVisible] = useState(false);
    const [currentPickerOptions, setCurrentPickerOptions] = useState<string[]>([]);
    const [currentPickerValue, setCurrentPickerValue] = useState<string>('');
    const [currentPickerOnSelect, setCurrentPickerOnSelect] = useState<(val: string) => void>(() => () => {});
    const [currentPickerTitle, setCurrentPickerTitle] = useState('');

    useEffect(() => {
        api.get('/profile/me').then((res: any) => {
            const prefs = res.data.preferences || {};
            setAgeRange(prefs.age_range || '');
            setHeightRange(prefs.height_range || '');
            setMaritalStatus(prefs.marital_status || '');
            setReligion(prefs.religion || '');
            setCaste(prefs.caste || '');
            setEducation(prefs.education || '');
            setProfession(prefs.profession || '');
            setLocation(prefs.location || '');
        }).catch((err: any) => console.log(err));
    }, []);

    const handleSave = async () => {
        try {
            await api.put('/profile/me/preferences', {
                age_range: ageRange,
                height_range: heightRange,
                marital_status: maritalStatus,
                religion: religion,
                caste: caste,
                education: education,
                profession: profession,
                location: location
            });
            router.back();
        } catch (error) {
            console.error("Failed to update preferences", error);
            alert("Could not save preferences. Please try again.");
        }
    };

    const openPicker = (title: string, options: string[], value: string, onSelect: (val: string) => void) => {
        setCurrentPickerTitle(title);
        setCurrentPickerOptions(options);
        setCurrentPickerValue(value);
        setCurrentPickerOnSelect(() => onSelect);
        setPickerVisible(true);
    };

    const DropdownInput = ({ label, value, options, onSelect }: any) => (
        <View style={styles.inputGroup}>
            <Text style={styles.label}>{label}</Text>
            <TouchableOpacity 
                style={styles.dropdownButton}
                onPress={() => openPicker(label, options, value, onSelect)}
            >
                <Text style={[styles.input, !value && { color: '#999' }]}>
                    {value || `Select ${label}`}
                </Text>
                <Ionicons name="chevron-down" size={20} color="#666" />
            </TouchableOpacity>
        </View>
    );

    const renderPickerModal = () => (
        <Modal visible={pickerVisible} transparent animationType="fade">
            <TouchableOpacity style={styles.modalOverlay} activeOpacity={1} onPress={() => setPickerVisible(false)}>
                <View style={styles.modalContent} onStartShouldSetResponder={() => true}>
                    <View style={styles.modalHeader}>
                        <Text style={styles.modalTitle}>{currentPickerTitle}</Text>
                        <TouchableOpacity onPress={() => setPickerVisible(false)}>
                            <Ionicons name="close" size={24} color="#1A1A1A" />
                        </TouchableOpacity>
                    </View>
                    <ScrollView showsVerticalScrollIndicator={false} style={styles.modalScroll}>
                        {currentPickerOptions.map((opt, idx) => (
                            <TouchableOpacity 
                                key={idx} 
                                style={[styles.modalOption, currentPickerValue === opt && styles.modalOptionSelected]}
                                onPress={() => {
                                    currentPickerOnSelect(opt);
                                    setPickerVisible(false);
                                }}
                            >
                                <Text style={[styles.modalOptionText, currentPickerValue === opt && styles.modalOptionTextSelected]}>
                                    {opt}
                                </Text>
                                {currentPickerValue === opt && (
                                    <Ionicons name="checkmark-circle" size={20} color="#FDBE01" />
                                )}
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                </View>
            </TouchableOpacity>
        </Modal>
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

            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            >
                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>

                    <View style={styles.infoBanner}>
                        <Ionicons name="information-circle" size={24} color="#134377" />
                        <Text style={styles.infoText}>
                            Profiles that match these preferences will be prioritized in your Discover and Matches views.
                        </Text>
                    </View>

                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>BASIC DETAILS</Text>
                        <DropdownInput label="Age Range" value={ageRange} options={AGE_RANGES} onSelect={setAgeRange} />
                        <DropdownInput label="Height Range" value={heightRange} options={HEIGHT_RANGES} onSelect={setHeightRange} />
                        <DropdownInput label="Marital Status" value={maritalStatus} options={MARITAL_STATUSES} onSelect={setMaritalStatus} />
                    </View>

                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>RELIGIOUS BACKGROUND</Text>
                        <DropdownInput label="Religion" value={religion} options={RELIGIONS} onSelect={setReligion} />
                        <DropdownInput label="Caste" value={caste} options={CASTES} onSelect={setCaste} />
                    </View>

                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>EDUCATION & CAREER</Text>
                        <DropdownInput label="Education" value={education} options={EDUCATIONS} onSelect={setEducation} />
                        <DropdownInput label="Profession" value={profession} options={PROFESSIONS} onSelect={setProfession} />
                    </View>

                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>LOCATION</Text>
                        <DropdownInput label="City / State" value={location} options={LOCATIONS} onSelect={setLocation} />
                    </View>

                </ScrollView>
            </KeyboardAvoidingView>

            {renderPickerModal()}
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
        backgroundColor: 'rgba(19, 67, 119, 0.1)',
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
    inputGroup: {
        backgroundColor: '#FFFFFF',
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderRadius: 12,
        marginBottom: 10,
        borderWidth: 1,
        borderColor: '#EEEEEE',
    },
    label: {
        fontSize: 12,
        color: '#666666',
        marginBottom: 6,
        fontWeight: '500',
    },
    dropdownButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 4,
    },
    input: {
        fontSize: 16,
        color: '#1A1A1A',
        fontWeight: '500',
        flex: 1,
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'flex-end',
    },
    modalContent: {
        backgroundColor: '#FFFFFF',
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        maxHeight: '60%',
        paddingBottom: Platform.OS === 'ios' ? 40 : 20,
        ...Platform.select({
            ios: {
                shadowColor: '#000',
                shadowOffset: { width: 0, height: -2 },
                shadowOpacity: 0.1,
                shadowRadius: 10,
            },
            android: {
                elevation: 10,
            }
        })
    },
    modalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#EEEEEE',
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#1A1A1A',
    },
    modalScroll: {
        paddingHorizontal: 20,
        paddingTop: 10,
    },
    modalOption: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#F5F5F5',
    },
    modalOptionSelected: {
        backgroundColor: 'rgba(253, 190, 1, 0.05)', // Super light yellow tint
        borderRadius: 8,
        paddingHorizontal: 12,
        marginHorizontal: -12,
        borderBottomWidth: 0,
    },
    modalOptionText: {
        fontSize: 16,
        color: '#1A1A1A',
        fontWeight: '500',
    },
    modalOptionTextSelected: {
        color: '#FDBE01',
        fontWeight: 'bold',
    },
});
