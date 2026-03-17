import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Colors } from '@/constants/Colors';

const serifFont = Platform.select({
    ios: 'Georgia',
    android: 'serif',
    default: 'serif',
});

// A simple reusable pill component for single selection filtering
const FilterPill = ({ label, selected, onPress }: { label: string, selected: boolean, onPress: () => void }) => (
    <TouchableOpacity 
        style={[styles.pill, selected && styles.pillSelected]} 
        onPress={onPress}
    >
        <Text style={[styles.pillText, selected && styles.pillTextSelected]}>{label}</Text>
    </TouchableOpacity>
);

export default function SearchScreen() {
    const router = useRouter();
    const [ageRange, setAgeRange] = useState('20-30');
    const [religion, setReligion] = useState('');
    const [maritalStatus, setMaritalStatus] = useState('Never Married');
    const [isLoading, setIsLoading] = useState(false);

    const handleSearch = () => {
        setIsLoading(true);
        // Dispatch to Redux or context here
        setTimeout(() => {
            setIsLoading(false);
            router.push('/(tabs)/all-matches' as any);
        }, 1000);
    };

    return (
        <SafeAreaView style={styles.container} edges={['right', 'left', 'bottom']}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                    <Ionicons name="close" size={28} color="#1A1A1A" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Advanced Search</Text>
                <TouchableOpacity onPress={() => { setAgeRange('18-25'); setReligion(''); setMaritalStatus(''); }}>
                    <Text style={styles.resetText}>Reset</Text>
                </TouchableOpacity>
            </View>

            <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Age Range</Text>
                    <View style={styles.pillContainer}>
                        {['18-25', '26-30', '31-35', '36-40', '40+'].map(age => (
                            <FilterPill 
                                key={age} 
                                label={age} 
                                selected={ageRange === age} 
                                onPress={() => setAgeRange(age)} 
                            />
                        ))}
                    </View>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Marital Status</Text>
                    <View style={styles.pillContainer}>
                        {['Never Married', 'Divorced', 'Widowed', 'Awaiting Divorce'].map(status => (
                            <FilterPill 
                                key={status} 
                                label={status} 
                                selected={maritalStatus === status} 
                                onPress={() => setMaritalStatus(status)} 
                            />
                        ))}
                    </View>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Religion</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="e.g. Hindu, Muslim, Christian"
                        placeholderTextColor="#999"
                        value={religion}
                        onChangeText={setReligion}
                    />
                </View>

                {/* Additional filters can be added here such as Location, Education, etc. */}
            </ScrollView>

            <View style={styles.footer}>
                <TouchableOpacity 
                    style={[styles.searchButton, isLoading && { opacity: 0.7 }]} 
                    onPress={handleSearch}
                    disabled={isLoading}
                >
                    <Text style={styles.searchButtonText}>
                        {isLoading ? 'Searching...' : 'Show Results'}
                    </Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#FFFFFF' },
    header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, paddingTop: 10, paddingBottom: 20, borderBottomWidth: 1, borderBottomColor: '#F0F0F0' },
    backButton: { },
    headerTitle: { fontSize: 20, fontFamily: serifFont, fontWeight: 'bold', color: '#1A1A1A' },
    resetText: { fontSize: 16, color: Colors.light.tint, fontWeight: 'bold' },
    scrollContainer: { padding: 20, paddingBottom: 100 },
    section: { marginBottom: 30 },
    sectionTitle: { fontSize: 18, fontFamily: serifFont, fontWeight: 'bold', color: '#1A1A1A', marginBottom: 15 },
    pillContainer: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
    pill: { paddingHorizontal: 20, paddingVertical: 10, borderRadius: 20, backgroundColor: '#F5F7FA', borderWidth: 1, borderColor: '#E5E7EB' },
    pillSelected: { backgroundColor: Colors.light.brandYellow, borderColor: Colors.light.brandYellow },
    pillText: { fontSize: 14, color: '#666', fontWeight: '500' },
    pillTextSelected: { color: '#000', fontWeight: 'bold' },
    input: { backgroundColor: '#F5F7FA', borderRadius: 12, paddingHorizontal: 16, height: 50, fontSize: 16, color: '#1A1A1A', borderWidth: 1, borderColor: '#E5E7EB' },
    footer: { padding: 20, borderTopWidth: 1, borderTopColor: '#F0F0F0', backgroundColor: '#FFFFFF' },
    searchButton: { backgroundColor: Colors.light.brandYellow, borderRadius: 30, height: 56, justifyContent: 'center', alignItems: 'center' },
    searchButtonText: { fontSize: 18, fontFamily: serifFont, fontWeight: 'bold', color: '#1A1A1A' }
});
