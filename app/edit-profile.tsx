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
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function EditProfileScreen() {
    const router = useRouter();

    // Form State
    const [name, setName] = useState('');
    const [bio, setBio] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [location, setLocation] = useState('');
    const [profession, setProfession] = useState('');
    const [education, setEducation] = useState('');

    useEffect(() => {
        api.get('/profile/me').then((res: any) => {
            const d = res.data;
            setName(d.full_name || '');
            setBio(d.bio || '');
            setPhone(d.phone || '');
            setEmail(d.email || '');
            setLocation(d.location || '');
            setProfession(d.details?.profession || '');
            setEducation(d.details?.education || '');
        }).catch((err: any) => console.log(err));
    }, []);

    const handleSave = () => {
        // Implement save logic here
        router.back();
    };

    return (
        <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
                    <Ionicons name="arrow-back" size={24} color="#1A1A1A" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Edit Profile</Text>
                <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                    <Text style={styles.saveButtonText}>Save</Text>
                </TouchableOpacity>
            </View>

            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            >
                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>

                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>BASIC DETAILS</Text>

                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Full Name</Text>
                            <TextInput
                                style={styles.input}
                                value={name}
                                onChangeText={setName}
                                placeholder="Enter your name"
                            />
                        </View>

                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Mobile Number</Text>
                            <TextInput
                                style={styles.input}
                                value={phone}
                                onChangeText={setPhone}
                                keyboardType="phone-pad"
                                placeholder="Enter your mobile number"
                            />
                        </View>

                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Email Address</Text>
                            <TextInput
                                style={styles.input}
                                value={email}
                                onChangeText={setEmail}
                                keyboardType="email-address"
                                autoCapitalize="none"
                                placeholder="Enter your email"
                            />
                        </View>

                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Current Location</Text>
                            <TextInput
                                style={styles.input}
                                value={location}
                                onChangeText={setLocation}
                                placeholder="City, State"
                            />
                        </View>
                    </View>

                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>PROFESSION & EDUCATION</Text>

                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Profession</Text>
                            <TextInput
                                style={styles.input}
                                value={profession}
                                onChangeText={setProfession}
                                placeholder="e.g. Software Engineer"
                            />
                        </View>

                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Highest Education</Text>
                            <TextInput
                                style={styles.input}
                                value={education}
                                onChangeText={setEducation}
                                placeholder="e.g. B.Tech"
                            />
                        </View>
                    </View>

                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>ABOUT ME</Text>

                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Bio</Text>
                            <TextInput
                                style={[styles.input, styles.textArea]}
                                value={bio}
                                onChangeText={setBio}
                                placeholder="Tell us a bit about yourself..."
                                multiline
                                numberOfLines={4}
                                textAlignVertical="top"
                            />
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
    textArea: {
        minHeight: 100,
    },
});
