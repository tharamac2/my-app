import React from 'react';
import { View, Text, StyleSheet, Switch, TouchableOpacity, ScrollView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import useAuthStore from '@/store/authStore';

const serifFont = Platform.select({
    ios: 'Georgia',
    android: 'serif',
    default: 'serif',
});

export default function SettingsScreen() {
    const router = useRouter();
    const logout = useAuthStore((state: any) => state.logout);
    const [pushEnabled, setPushEnabled] = React.useState(true);
    const [emailEnabled, setEmailEnabled] = React.useState(true);

    const handleLogout = () => {
        logout();
        router.replace('/login' as any);
    };

    return (
        <SafeAreaView style={styles.container} edges={['right', 'left', 'bottom']}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Notifications</Text>
                    
                    <View style={styles.row}>
                        <View style={styles.rowLeft}>
                            <Ionicons name="notifications-outline" size={24} color="#1A1A1A" />
                            <Text style={styles.rowText}>Push Notifications</Text>
                        </View>
                        <Switch 
                            value={pushEnabled} 
                            onValueChange={setPushEnabled}
                            trackColor={{ false: '#d3d3d3', true: '#FDBE01' }}
                        />
                    </View>

                    <View style={styles.separator} />

                    <View style={styles.row}>
                        <View style={styles.rowLeft}>
                            <Ionicons name="mail-outline" size={24} color="#1A1A1A" />
                            <Text style={styles.rowText}>Email Alerts</Text>
                        </View>
                        <Switch 
                            value={emailEnabled} 
                            onValueChange={setEmailEnabled}
                            trackColor={{ false: '#d3d3d3', true: '#FDBE01' }}
                        />
                    </View>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Account</Text>
                    
                    <TouchableOpacity style={styles.row}>
                        <View style={styles.rowLeft}>
                            <Ionicons name="lock-closed-outline" size={24} color="#1A1A1A" />
                            <Text style={styles.rowText}>Privacy Policy</Text>
                        </View>
                        <Ionicons name="chevron-forward" size={20} color="#999" />
                    </TouchableOpacity>

                    <View style={styles.separator} />

                    <TouchableOpacity style={styles.row}>
                        <View style={styles.rowLeft}>
                            <Ionicons name="document-text-outline" size={24} color="#1A1A1A" />
                            <Text style={styles.rowText}>Terms of Service</Text>
                        </View>
                        <Ionicons name="chevron-forward" size={20} color="#999" />
                    </TouchableOpacity>

                    <View style={styles.separator} />

                    <TouchableOpacity style={styles.row} onPress={handleLogout}>
                        <View style={styles.rowLeft}>
                            <Ionicons name="log-out-outline" size={24} color="#EF4444" />
                            <Text style={[styles.rowText, { color: '#EF4444' }]}>Log Out</Text>
                        </View>
                    </TouchableOpacity>
                </View>

            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F7FA',
    },
    scrollContainer: {
        padding: 20,
        paddingBottom: 100,
    },
    section: {
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        padding: 16,
        marginBottom: 24,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
        elevation: 2,
    },
    sectionTitle: {
        fontSize: 18,
        fontFamily: serifFont,
        fontWeight: 'bold',
        color: '#1A1A1A',
        marginBottom: 16,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 12,
    },
    rowLeft: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    rowText: {
        fontSize: 16,
        color: '#1A1A1A',
        marginLeft: 12,
    },
    separator: {
        height: 1,
        backgroundColor: '#F0F0F0',
        marginVertical: 4,
    }
});
