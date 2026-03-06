import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React from 'react';
import { Dimensions, Image, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');

const serifFont = Platform.select({
    ios: 'Georgia',
    android: 'serif',
    default: 'serif',
});

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

                {/* Top Header & Identity Gradient Block */}
                <LinearGradient
                    colors={['#C2E0F4', '#F5F5F5']}
                    style={styles.headerGradient}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 0, y: 1 }}
                >
                    {/* Navigation Row */}
                    <View style={styles.navRow}>
                        <TouchableOpacity style={styles.iconCircleButton}>
                            <Ionicons name="chevron-back" size={22} color="#1A1A1A" />
                        </TouchableOpacity>
                        <Text style={styles.headerNavTitle}>Profile</Text>
                        <TouchableOpacity style={styles.iconCircleButton}>
                            <Ionicons name="ellipsis-horizontal" size={22} color="#1A1A1A" />
                        </TouchableOpacity>
                    </View>

                    {/* Profile User Info Row */}
                    <View style={styles.profileRow}>
                        <View style={styles.imageWrapper}>
                            <Image
                                source={{ uri: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1288&auto=format&fit=crop' }}
                                style={styles.squircleImage}
                            />
                            <TouchableOpacity style={styles.editButtonOuter}>
                                <View style={styles.editButtonInner}>
                                    <Ionicons name="pencil-outline" size={12} color="#FFFFFF" />
                                </View>
                            </TouchableOpacity>
                        </View>

                        <View style={styles.profileDetailsCol}>
                            <Text style={styles.nameRowText}>J. Snow <Text style={styles.jpText}>(あなた)</Text></Text>
                            <View style={styles.locationRow}>
                                <Ionicons name="map-outline" size={16} color="#7DAEDB" />
                                <Text style={styles.locationTextRow}>17 Km from your location</Text>
                            </View>
                            <View style={styles.tagsRow}>
                                <View style={[styles.tag, { backgroundColor: '#FDBE01' }]}>
                                    <Text style={styles.tagTextWhite}>Nomad</Text>
                                </View>
                                <View style={[styles.tag, { backgroundColor: '#62A1F3' }]}>
                                    <Text style={styles.tagTextWhite}>Explorer</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </LinearGradient>

                {/* 2. Activity Dashboard (Integrated Stats Row) */}
                <View style={styles.statsRow}>
                    <TouchableOpacity style={styles.statColumnRow}>
                        <Text style={styles.statNumberRow}>30</Text>
                        <Text style={styles.statLabelRow}>Countries</Text>
                    </TouchableOpacity>
                    <View style={styles.statDividerRow} />
                    <TouchableOpacity style={styles.statColumnRow}>
                        <Text style={styles.statNumberRow}>93</Text>
                        <Text style={styles.statLabelRow}>Mountain</Text>
                    </TouchableOpacity>
                    <View style={styles.statDividerRow} />
                    <TouchableOpacity style={styles.statColumnRow}>
                        <Text style={styles.statNumberRow}>69</Text>
                        <Text style={styles.statLabelRow}>Cities</Text>
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
    headerGradient: {
        paddingTop: 10,
        paddingHorizontal: 20,
        paddingBottom: 20,
    },
    navRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 30,
    },
    iconCircleButton: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: 'rgba(255, 255, 255, 0.6)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerNavTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#1A1A1A',
    },
    profileRow: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingBottom: 20,
    },
    imageWrapper: {
        position: 'relative',
        marginRight: 20,
    },
    squircleImage: {
        width: 90,
        height: 90,
        borderRadius: 28, // High border radius to make it a squircle
        borderWidth: 2,
        borderColor: '#FFFFFF',
    },
    editButtonOuter: {
        position: 'absolute',
        bottom: -4,
        right: -4,
        backgroundColor: '#F5F5F5',
        borderRadius: 18,
        padding: 4, // creates the gap effect
    },
    editButtonInner: {
        backgroundColor: '#888888', // Grey background from image
        width: 28,
        height: 28,
        borderRadius: 14,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#A8A8A8',
    },
    profileDetailsCol: {
        flex: 1,
    },
    nameRowText: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#1A1A1A',
        marginBottom: 6,
    },
    jpText: {
        fontSize: 16,
        fontWeight: '400',
        color: '#555555',
    },
    locationRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    locationTextRow: {
        fontSize: 13,
        color: '#1A1A1A',
        marginLeft: 4,
        fontWeight: '500',
    },
    tagsRow: {
        flexDirection: 'row',
        gap: 8,
    },
    tag: {
        paddingHorizontal: 16,
        paddingVertical: 6,
        borderRadius: 16,
    },
    tagTextWhite: {
        color: '#FFFFFF',
        fontSize: 12,
        fontWeight: 'bold',
    },
    statsRow: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        paddingVertical: 20,
        backgroundColor: '#F5F5F5', // Blends seamlessly below the gradient
        marginBottom: 10,
    },
    statColumnRow: {
        flex: 1,
        alignItems: 'center',
    },
    statNumberRow: {
        fontSize: 28,
        fontWeight: '300', // Light font weight based on image
        color: '#1A1A1A',
        marginBottom: 4,
    },
    statLabelRow: {
        fontSize: 12,
        color: '#444444',
        fontWeight: '500',
    },
    statDividerRow: {
        width: 1,
        height: 30,
        backgroundColor: '#DDDDDD',
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
