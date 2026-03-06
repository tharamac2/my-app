import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { Dimensions, Image, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Svg, { Circle } from 'react-native-svg';

const { width } = Dimensions.get('window');

const serifFont = Platform.select({
    ios: 'Georgia',
    android: 'serif',
    default: 'serif',
});

// Reusable Circular Progress Component
const CompletenessRing = ({ size, progress, strokeWidth }: { size: number, progress: number, strokeWidth: number }) => {
    const radius = (size - strokeWidth) / 2;
    const circumference = radius * 2 * Math.PI;
    const strokeDashoffset = circumference - (progress / 100) * circumference;

    return (
        <View style={{ position: 'absolute', top: 0, left: 0 }}>
            <Svg height={size} width={size}>
                {/* Background Ring */}
                <Circle
                    stroke="rgba(255,255,255,0.2)"
                    fill="transparent"
                    strokeWidth={strokeWidth}
                    r={radius}
                    cx={size / 2}
                    cy={size / 2}
                />
                {/* Progress Ring */}
                <Circle
                    stroke="#4CAF50" // Green color
                    fill="transparent"
                    strokeWidth={strokeWidth}
                    strokeDasharray={`${circumference} ${circumference}`}
                    strokeDashoffset={strokeDashoffset}
                    strokeLinecap="round"
                    r={radius}
                    cx={size / 2}
                    cy={size / 2}
                    transform={`rotate(-90 ${size / 2} ${size / 2})`}
                />
            </Svg>
        </View>
    );
};

export default function ProfileDashboard() {
    const router = useRouter();

    const handleLogout = () => {
        router.replace('/welcome');
    };

    const profileImageSize = 100;
    const ringStrokeWidth = 4;
    const ringSize = profileImageSize + (ringStrokeWidth * 4);

    return (
        <SafeAreaView style={styles.container} edges={['top']}>
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>

                {/* 1. Header & Identity Section */}
                <View style={styles.header}>
                    <View style={styles.profileImageContainer}>
                        <CompletenessRing size={ringSize} progress={80} strokeWidth={ringStrokeWidth} />
                        <Image
                            source={{ uri: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1288&auto=format&fit=crop' }}
                            style={[styles.profileImage, { width: profileImageSize, height: profileImageSize, borderRadius: profileImageSize / 2 }]}
                        />
                        <View style={styles.completenessBadge}>
                            <Text style={styles.completenessText}>80%</Text>
                        </View>
                    </View>

                    <Text style={styles.name}>Prisha Mirha</Text>
                    <Text style={styles.email}>prisha.m@example.com</Text>

                    <View style={styles.trustBadge}>
                        <MaterialCommunityIcons name="shield-check" size={16} color="#4CAF50" />
                        <Text style={styles.trustBadgeText}>ID Verified</Text>
                    </View>
                </View>

                {/* 2. Activity Dashboard (Quick Stats Row) */}
                <View style={styles.statsCard}>
                    <TouchableOpacity style={styles.statColumn}>
                        <Text style={styles.statNumber}>45</Text>
                        <Text style={styles.statLabel}>Profile Views</Text>
                    </TouchableOpacity>
                    <View style={styles.statDivider} />
                    <TouchableOpacity style={styles.statColumn}>
                        <Text style={styles.statNumber}>12</Text>
                        <Text style={styles.statLabel}>Shortlisted By</Text>
                    </TouchableOpacity>
                    <View style={styles.statDivider} />
                    <TouchableOpacity style={styles.statColumn}>
                        <Text style={styles.statNumber}>3</Text>
                        <Text style={styles.statLabel}>Contact Views</Text>
                    </TouchableOpacity>
                </View>

                {/* 3. Inline Subscription Banner */}
                <View style={styles.promoBanner}>
                    <View style={styles.promoContent}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 4 }}>
                            <Text style={styles.promoTitle}>👑 Free Plan</Text>
                        </View>
                        <Text style={styles.promoSubtext}>Upgrade to Premium to message matches directly.</Text>
                    </View>
                    <TouchableOpacity style={styles.promoBtn}>
                        <Text style={styles.promoBtnText}>Upgrade Now</Text>
                    </TouchableOpacity>
                </View>

                {/* 4. Expanded Menu Options */}
                <View style={styles.menuContainer}>

                    {/* Account Settings */}
                    <Text style={styles.sectionHeader}>ACCOUNT SETTINGS</Text>
                    <View style={styles.menuGroup}>
                        <TouchableOpacity style={styles.menuItem} onPress={() => router.push('/edit-profile')}>
                            <Ionicons name="person-outline" size={22} color="#1A1A1A" style={styles.menuIcon} />
                            <Text style={styles.menuText}>Edit Profile</Text>
                            <Ionicons name="chevron-forward" size={20} color="#CCCCCC" />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.menuItem} onPress={() => router.push('/partner-preferences')}>
                            <Ionicons name="heart-outline" size={22} color="#1A1A1A" style={styles.menuIcon} />
                            <Text style={styles.menuText}>Partner Preferences</Text>
                            <Ionicons name="chevron-forward" size={20} color="#CCCCCC" />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.menuItem} onPress={() => router.push('/manage-photos')}>
                            <Ionicons name="images-outline" size={22} color="#1A1A1A" style={styles.menuIcon} />
                            <Text style={styles.menuText}>Manage Photos</Text>
                            <Ionicons name="chevron-forward" size={20} color="#CCCCCC" />
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.menuItem, { borderBottomWidth: 0 }]} onPress={() => router.push('/astrology-details')}>
                            <MaterialCommunityIcons name="star-four-points-outline" size={22} color="#1A1A1A" style={styles.menuIcon} />
                            <Text style={styles.menuText}>Astrological Details</Text>
                            <Ionicons name="chevron-forward" size={20} color="#CCCCCC" />
                        </TouchableOpacity>
                    </View>

                    {/* Privacy & Security */}
                    <Text style={styles.sectionHeader}>PRIVACY & SECURITY</Text>
                    <View style={styles.menuGroup}>
                        <TouchableOpacity style={styles.menuItem}>
                            <Ionicons name="eye-off-outline" size={22} color="#1A1A1A" style={styles.menuIcon} />
                            <Text style={styles.menuText}>Who can see my photos</Text>
                            <Text style={styles.menuValueText}>Only Members</Text>
                            <Ionicons name="chevron-forward" size={20} color="#CCCCCC" />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.menuItem}>
                            <Ionicons name="ban-outline" size={22} color="#1A1A1A" style={styles.menuIcon} />
                            <Text style={styles.menuText}>Blocked Profiles</Text>
                            <Ionicons name="chevron-forward" size={20} color="#CCCCCC" />
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.menuItem, { borderBottomWidth: 0 }]}>
                            <Ionicons name="lock-closed-outline" size={22} color="#1A1A1A" style={styles.menuIcon} />
                            <Text style={styles.menuText}>Change Password</Text>
                            <Ionicons name="chevron-forward" size={20} color="#CCCCCC" />
                        </TouchableOpacity>
                    </View>

                    {/* Support */}
                    <Text style={styles.sectionHeader}>SUPPORT</Text>
                    <View style={styles.menuGroup}>
                        <TouchableOpacity style={styles.menuItem}>
                            <Ionicons name="help-circle-outline" size={22} color="#1A1A1A" style={styles.menuIcon} />
                            <Text style={styles.menuText}>Help Center</Text>
                            <Ionicons name="chevron-forward" size={20} color="#CCCCCC" />
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.menuItem, { borderBottomWidth: 0 }]}>
                            <Ionicons name="mail-outline" size={22} color="#1A1A1A" style={styles.menuIcon} />
                            <Text style={styles.menuText}>Contact Us</Text>
                            <Ionicons name="chevron-forward" size={20} color="#CCCCCC" />
                        </TouchableOpacity>
                    </View>

                </View>

                {/* 5. Bottom Actions */}
                <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
                    <Ionicons name="log-out-outline" size={20} color="#D32F2F" style={{ marginRight: 8 }} />
                    <Text style={styles.logoutText}>Log Out</Text>
                </TouchableOpacity>

            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F5F5',
    },
    scrollContent: {
        paddingBottom: 40,
    },
    header: {
        backgroundColor: '#134377', // Dark blue
        paddingTop: 20,
        paddingBottom: 60, // Extra padding to overlap the stats card
        alignItems: 'center',
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
    },
    profileImageContainer: {
        position: 'relative',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 16,
    },
    profileImage: {
        borderWidth: 3,
        borderColor: '#FFFFFF',
    },
    completenessBadge: {
        position: 'absolute',
        bottom: 0,
        backgroundColor: '#4CAF50',
        paddingHorizontal: 8,
        paddingVertical: 2,
        borderRadius: 12,
        borderWidth: 2,
        borderColor: '#FFFFFF',
    },
    completenessText: {
        color: '#FFFFFF',
        fontSize: 10,
        fontWeight: 'bold',
    },
    name: {
        fontSize: 24,
        fontWeight: 'bold',
        fontFamily: serifFont,
        color: '#FFFFFF',
        marginBottom: 4,
    },
    email: {
        fontSize: 14,
        color: '#B0C4DE', // Light steel blue
        marginBottom: 12,
    },
    trustBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(255,255,255,0.15)',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 20,
    },
    trustBadgeText: {
        color: '#FFFFFF',
        fontSize: 12,
        fontWeight: '600',
        marginLeft: 6,
    },
    statsCard: {
        flexDirection: 'row',
        backgroundColor: '#FFFFFF',
        marginHorizontal: 20,
        marginTop: -30, // Pull up to overlap header
        borderRadius: 20,
        paddingVertical: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 5,
    },
    statColumn: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    statDivider: {
        width: 1,
        backgroundColor: '#EEEEEE',
        marginVertical: 5,
    },
    statNumber: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#1A1A1A',
        marginBottom: 4,
    },
    statLabel: {
        fontSize: 12,
        color: '#666666',
        fontWeight: '500',
    },
    promoBanner: {
        flexDirection: 'row',
        backgroundColor: '#2C2C2C', // Dark grey
        marginHorizontal: 20,
        marginTop: 20,
        borderRadius: 16,
        padding: 16,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 4,
    },
    promoContent: {
        flex: 1,
        marginRight: 10,
    },
    promoTitle: {
        color: '#FDBE01',
        fontWeight: 'bold',
        fontSize: 16,
    },
    promoSubtext: {
        color: '#CCCCCC',
        fontSize: 12,
        lineHeight: 18,
    },
    promoBtn: {
        backgroundColor: '#FDBE01',
        paddingHorizontal: 16,
        paddingVertical: 10,
        borderRadius: 20,
    },
    promoBtnText: {
        color: '#1A1A1A',
        fontWeight: 'bold',
        fontSize: 13,
    },
    menuContainer: {
        marginTop: 25,
        paddingHorizontal: 20,
    },
    sectionHeader: {
        fontSize: 12,
        fontWeight: 'bold',
        color: '#888888',
        marginBottom: 8,
        marginLeft: 10,
        letterSpacing: 1,
    },
    menuGroup: {
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        marginBottom: 24,
        overflow: 'hidden',
    },
    menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 16,
        paddingHorizontal: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#F0F0F0',
    },
    menuIcon: {
        marginRight: 15,
    },
    menuText: {
        flex: 1,
        fontSize: 15,
        color: '#1A1A1A',
        fontWeight: '500',
    },
    menuValueText: {
        fontSize: 14,
        color: '#888888',
        marginRight: 8,
    },
    logoutButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 20,
        marginTop: 10,
        marginBottom: 20,
        paddingVertical: 16,
        borderRadius: 16,
        borderWidth: 1.5,
        borderColor: '#FFCDD2',
        backgroundColor: 'rgba(255, 235, 238, 0.5)',
    },
    logoutText: {
        color: '#D32F2F',
        fontWeight: 'bold',
        fontSize: 16,
    },
});
