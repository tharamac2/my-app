import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { useRouter } from 'expo-router';
import React from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function ProfileScreen() {
    const router = useRouter();
    const theme = useColorScheme() ?? 'light';
    const colors = Colors[theme];

    const handleLogout = () => {
        // Navigate back to welcome screen
        router.replace('/welcome');
    };

    return (
        <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
            <View style={[styles.header, { backgroundColor: colors.primary }]}>
                <Image
                    source={{ uri: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1287&auto=format&fit=crop' }}
                    style={styles.profileImage}
                />
                <Text style={styles.name}>John Doe</Text>
                <Text style={styles.email}>john.doe@example.com</Text>
            </View>

            <View style={styles.section}>
                <Text style={[styles.sectionTitle, { color: colors.textSecondary }]}>Account Settings</Text>

                <TouchableOpacity style={[styles.menuItem, { backgroundColor: colors.surface, borderBottomColor: colors.border }]}>
                    <IconSymbol name="person.crop.circle" size={24} color={colors.text} />
                    <Text style={[styles.menuText, { color: colors.text }]}>Edit Profile</Text>
                    <IconSymbol name="chevron.right" size={20} color={colors.textSecondary} />
                </TouchableOpacity>

                <TouchableOpacity style={[styles.menuItem, { backgroundColor: colors.surface, borderBottomColor: colors.border }]}>
                    <IconSymbol name="heart.text.square" size={24} color={colors.text} />
                    <Text style={[styles.menuText, { color: colors.text }]}>Partner Preferences</Text>
                    <IconSymbol name="chevron.right" size={20} color={colors.textSecondary} />
                </TouchableOpacity>

                <TouchableOpacity style={[styles.menuItem, { backgroundColor: colors.surface, borderBottomColor: colors.border }]}>
                    <IconSymbol name="photo.on.rectangle" size={24} color={colors.text} />
                    <Text style={[styles.menuText, { color: colors.text }]}>Manage Photos</Text>
                    <IconSymbol name="chevron.right" size={20} color={colors.textSecondary} />
                </TouchableOpacity>
            </View>

            <View style={styles.section}>
                <Text style={[styles.sectionTitle, { color: colors.textSecondary }]}>Support</Text>

                <TouchableOpacity style={[styles.menuItem, { backgroundColor: colors.surface, borderBottomColor: colors.border }]}>
                    <IconSymbol name="questionmark.circle" size={24} color={colors.text} />
                    <Text style={[styles.menuText, { color: colors.text }]}>Help Center</Text>
                    <IconSymbol name="chevron.right" size={20} color={colors.textSecondary} />
                </TouchableOpacity>
            </View>

            <TouchableOpacity
                style={[styles.logoutButton, { backgroundColor: colors.surface }]}
                onPress={handleLogout}
            >
                <Text style={[styles.logoutText, { color: colors.error }]}>Log Out</Text>
            </TouchableOpacity>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        padding: 32,
        alignItems: 'center',
        paddingTop: 48,
    },
    profileImage: {
        width: 120,
        height: 120,
        borderRadius: 60,
        borderWidth: 4,
        borderColor: '#FFFFFF',
        marginBottom: 16,
    },
    name: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#FFFFFF',
        marginBottom: 4,
    },
    email: {
        fontSize: 14,
        color: '#E5E7EB',
    },
    section: {
        marginTop: 24,
    },
    sectionTitle: {
        fontSize: 14,
        fontWeight: '600',
        marginLeft: 16,
        marginBottom: 8,
        textTransform: 'uppercase',
    },
    menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        borderBottomWidth: StyleSheet.hairlineWidth,
    },
    menuText: {
        flex: 1,
        fontSize: 16,
        marginLeft: 16,
    },
    logoutButton: {
        margin: 24,
        padding: 16,
        borderRadius: 12,
        alignItems: 'center',
    },
    logoutText: {
        fontSize: 16,
        fontWeight: 'bold',
    },
});
