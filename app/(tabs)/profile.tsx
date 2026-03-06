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
        <View style={{ position: 'absolute', top: -4, left: -4, right: -4, bottom: -4 }}>
            <Svg height={size} width={size}>
                {/* Background Ring */}
                <Circle
                    stroke="transparent" // Removed white background ring based on image
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
                    transform={`rotate(-135 ${size / 2} ${size / 2})`} // Rotate so it starts bottom-left
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

                {/* 1. Header & Identity Section (Cover + Card UI) */}
                <View style={styles.coverPhotoContainer}>
                    <Image
                        source={{ uri: 'https://images.unsplash.com/photo-1557683316-973673baf926?q=80&w=1429&auto=format&fit=crop' }} // Premium gradient/abstract cover
                        style={styles.coverPhoto}
                    />
                </View>

                <View style={styles.profileCard}>
                    <View style={styles.profileHeaderRow}>
                        <View style={styles.profileOuterContainer}>
                            <View style={styles.profileImageContainer}>
                                <CompletenessRing size={ringSize} progress={80} strokeWidth={ringStrokeWidth} />
                                <Image
                                    source={{ uri: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1288&auto=format&fit=crop' }}
                                    style={[styles.profileImage, { width: profileImageSize, height: profileImageSize, borderRadius: profileImageSize / 2 }]}
                                />
                            </View>
                            <View style={styles.completenessBadge}>
                                <Text style={styles.completenessText}>80%</Text>
                            </View>
                        </View>

                        <View style={styles.profileInfoContainer}>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Text style={styles.name}>Prisha Mirha</Text>
                                <MaterialCommunityIcons name="check-decagram" size={20} color="#0084FF" style={{ marginLeft: 4, marginTop: 4 }} />
                            </View>
                            <Text style={styles.email}>prisha.m@example.com</Text>

                            <View style={styles.trustBadgeWrapper}>
                                <View style={styles.trustBadge}>
                                    <MaterialCommunityIcons name="shield-check" size={14} color="#4CAF50" />
                                    <Text style={styles.trustBadgeText}>ID Verified</Text>
                                </View>
                            </View>
                        </View>
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
    coverPhotoContainer: {
        width: '100%',
        height: 160,
        backgroundColor: '#134377',
    },
    coverPhoto: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    profileCard: {
        backgroundColor: '#FFFFFF',
        marginHorizontal: 16,
        marginTop: -60, // Overlap cover photo
        borderRadius: 20,
        padding: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 12,
        elevation: 5,
        marginBottom: 20, // Add gap before stats
    },
    profileHeaderRow: {
        flexDirection: 'row',
    },
    profileOuterContainer: {
        alignItems: 'center',
        marginTop: -40, // overlap image slightly inside card relative to row
    },
    profileImageContainer: {
        position: 'relative',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 6, // Create gap for the ring
    },
    profileImage: {
        borderWidth: 4,
        borderColor: '#FFFFFF',
    },
    completenessBadge: {
        position: 'absolute',
        bottom: -4,
        backgroundColor: '#4CAF50',
        paddingHorizontal: 12,
        paddingVertical: 4,
        borderRadius: 12,
        borderWidth: 2,
        borderColor: '#FFFFFF',
    },
    completenessText: {
        color: '#FFFFFF',
        fontSize: 12,
        fontWeight: 'bold',
    },
    profileInfoContainer: {
        flex: 1,
        marginLeft: 16,
        justifyContent: 'center',
        paddingTop: 8,
    },
    name: {
        fontSize: 22,
        fontWeight: 'bold',
        fontFamily: serifFont,
        color: '#1A1A1A',
        marginBottom: 2,
    },
    email: {
        fontSize: 14,
        color: '#666666',
    },
    trustBadgeWrapper: {
        flexDirection: 'row',
        marginTop: 8,
    },
    trustBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(76, 175, 80, 0.1)', // Light green tint
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 16,
    },
    trustBadgeText: {
        color: '#4CAF50',
        fontSize: 12,
        fontWeight: 'bold',
        marginLeft: 4,
    },
    statsCard: {
        flexDirection: 'row',
        backgroundColor: '#FFFFFF',
        marginHorizontal: 16, // match the new card width edge
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
