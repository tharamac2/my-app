import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
    ActivityIndicator,
    Alert,
    Dimensions,
    Image,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import api from '../services/api';

const { width } = Dimensions.get('window');

const serifFont = Platform.select({
    ios: 'Georgia',
    android: 'serif',
    default: 'serif',
});

export default function ProfileDetailScreen() {
    const router = useRouter();
    const params = useLocalSearchParams();
    const [profile, setProfile] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProfile = async () => {
            if (!params.id) {
                setLoading(false);
                return;
            }
            try {
                const response = await api.get(`/profile/${params.id}`);
                setProfile(response.data);
            } catch (error) {
                console.error("Failed to load profile", error);
                Alert.alert("Error", "Could not load profile details");
            } finally {
                setLoading(false);
            }
        };
        fetchProfile();
    }, [params.id]);

    if (loading) {
        return (
            <SafeAreaView style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
                <ActivityIndicator size="large" color="#FDBE01" />
            </SafeAreaView>
        );
    }

    if (!profile) {
        return (
            <SafeAreaView style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
                <Text style={{ fontFamily: serifFont, fontSize: 18 }}>Profile not found.</Text>
                <TouchableOpacity onPress={() => router.back()} style={{ marginTop: 20 }}>
                    <Text style={{ color: '#FDBE01', fontWeight: 'bold' }}>Go Back</Text>
                </TouchableOpacity>
            </SafeAreaView>
        );
    }

    const mainImage = profile.photos?.find((p: any) => p.is_primary)?.url 
        || (profile.photos && profile.photos.length > 0 ? profile.photos[0].url : 'https://via.placeholder.com/400');
    
    // Fallback info if empty
    const bioText = profile.bio || "This user hasn't added a bio yet.";

    return (
        <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>

                {/* Image Header Section */}
                <View style={styles.imageSection}>
                    <View style={styles.mainImageContainer}>
                        <Image source={{ uri: mainImage }} style={styles.mainImage} />

                        {/* Overlay Buttons */}
                        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
                            <Ionicons name="chevron-back" size={24} color="#FDBE01" />
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.favouriteBtn}>
                            <Ionicons name="heart" size={24} color="#FDBE01" />
                        </TouchableOpacity>

                        {/* Gallery Thumbnails */}
                        <View style={styles.galleryOverlay}>
                            {profile.photos?.slice(0, 3).map((img: any) => (
                                <View key={img.id} style={styles.thumbnailContainer}>
                                    <Image source={{ uri: img.url }} style={styles.thumbnail} />
                                </View>
                            ))}
                        </View>

                        {/* Compatibility Badge (mock logic for now if >70%)*/ }
                        {/* Perfect Match Badge logic can go here if provided in API */}
                        
                    </View>
                </View>

                {/* Profile Info */}
                <View style={styles.infoSection}>
                    <View style={styles.titleRow}>
                        <Text style={styles.nameText}>{profile.full_name}, {profile.age || '-'}</Text>
                        <TouchableOpacity onPress={() => Alert.alert('Photos', 'Viewing all photos... ')}>
                            <Text style={styles.seeAllText}>see all</Text>
                        </TouchableOpacity>
                    </View>

                    <Text style={styles.bioText}>{bioText}</Text>

                    {/* Horizontal detail cards */}
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.cardsScroll}>
                        {/* Basic Details */}
                        <View style={styles.detailCard}>
                            <Text style={styles.cardHeader}>Basic details</Text>
                            <View style={styles.gridRow}>
                                <View style={styles.gridItem}>
                                    <Text style={styles.label}>Date Of Birth</Text>
                                    <Text style={styles.value}>{profile.dob || 'Not specified'}</Text>
                                </View>
                                <View style={styles.gridItem}>
                                    <Text style={styles.label}>Profession</Text>
                                    <Text style={styles.value}>{profile.details?.profession || 'Not specified'}</Text>
                                </View>
                            </View>
                            <View style={[styles.gridRow, { marginTop: 15 }]}>
                                <View style={styles.gridItem}>
                                    <Text style={styles.label}>Religion</Text>
                                    <Text style={styles.value}>{profile.details?.religion || 'Not specified'}</Text>
                                </View>
                                <View style={styles.gridItem}>
                                    <Text style={styles.label}>Height</Text>
                                    <Text style={styles.value}>{profile.details?.height ? `${profile.details.height} cm` : 'Not specified'}</Text>
                                </View>
                            </View>
                        </View>

                        {/* Family Details */}
                        <View style={styles.detailCard}>
                            <Text style={styles.cardHeader}>Family/Other details</Text>
                            <View style={styles.gridRow}>
                                <View style={styles.gridItem}>
                                    <Text style={styles.label}>Education</Text>
                                    <Text style={styles.value}>{profile.details?.education || 'Not specified'}</Text>
                                </View>
                            </View>
                            <View style={[styles.gridRow, { marginTop: 15 }]}>
                                <View style={styles.gridItem}>
                                    <Text style={styles.label}>Location</Text>
                                    <Text style={styles.value}>{profile.location || 'Not specified'}</Text>
                                </View>
                            </View>
                        </View>
                    </ScrollView>
                </View>

                {/* Bottom Action Buttons */}
                <View style={styles.actionRow}>
                    <TouchableOpacity style={styles.interestBtn}>
                        <MaterialCommunityIcons name="ring" size={24} color="#000000" style={{ marginRight: 10 }} />
                        <Text style={styles.interestText}>Show Interest</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.chatActionBtn}
                        onPress={() => router.push({
                            pathname: '/chat-detail',
                            params: { name: profile.full_name, imageUrl: mainImage }
                        })}
                    >
                        <Ionicons name="chatbubble" size={28} color="#000000" />
                    </TouchableOpacity>
                </View>

                {/* Spacer for Tab Bar */}
                <View style={{ height: 100 }} />
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    scrollContent: {
        flexGrow: 1,
    },
    imageSection: {
        padding: 15,
    },
    mainImageContainer: {
        width: '100%',
        aspectRatio: 0.85,
        borderRadius: 40,
        borderWidth: 2,
        borderColor: '#FDBE01',
        overflow: 'hidden',
        position: 'relative',
    },
    mainImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    backBtn: {
        position: 'absolute',
        top: 20,
        left: 20,
        backgroundColor: '#FFFFFF',
        width: 45,
        height: 45,
        borderRadius: 22.5,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 5,
    },
    favouriteBtn: {
        position: 'absolute',
        top: 20,
        right: 20,
        backgroundColor: '#FFFFFF',
        width: 45,
        height: 45,
        borderRadius: 22.5,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 5,
    },
    galleryOverlay: {
        position: 'absolute',
        top: 100,
        right: 15,
        gap: 15,
    },
    thumbnailContainer: {
        width: 60,
        height: 60,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#FDBE01',
        overflow: 'hidden',
    },
    thumbnail: {
        width: '100%',
        height: '100%',
    },
    badgeContainer: {
        position: 'absolute',
        bottom: 20,
        width: '100%',
        alignItems: 'center',
    },
    badgeContent: {
        backgroundColor: '#FFFFFF',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 12,
        borderRadius: 25,
        borderWidth: 1.5,
        borderColor: '#FDBE01',
        gap: 10,
    },
    badgeText: {
        fontSize: 16,
        fontWeight: '700',
        color: '#000000',
        fontFamily: serifFont,
    },
    infoSection: {
        paddingHorizontal: 20,
        marginTop: 10,
    },
    titleRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
    },
    nameText: {
        fontSize: 30,
        fontFamily: serifFont,
        fontWeight: '700',
        color: '#1A1A1A',
    },
    seeAllText: {
        fontSize: 18,
        fontFamily: serifFont,
        color: '#FDBE01',
        fontWeight: '700',
    },
    bioText: {
        fontSize: 14,
        lineHeight: 20,
        color: '#1A1A1A',
        fontWeight: '600',
        marginBottom: 25,
        fontFamily: serifFont,
    },
    cardsScroll: {
        marginBottom: 30,
    },
    detailCard: {
        backgroundColor: '#FFE58F', // Soft yellow background
        borderRadius: 25,
        padding: 20,
        width: width * 0.75,
        marginRight: 15,
    },
    cardHeader: {
        fontSize: 18,
        fontWeight: '800',
        color: '#1A1A1A',
        marginBottom: 15,
        fontFamily: serifFont,
    },
    gridRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    gridItem: {
        flex: 1,
    },
    label: {
        fontSize: 12,
        color: '#666666',
        fontWeight: '700',
        marginBottom: 4,
        fontFamily: serifFont,
    },
    value: {
        fontSize: 15,
        color: '#000000',
        fontWeight: '800',
        fontFamily: serifFont,
    },
    actionRow: {
        flexDirection: 'row',
        paddingHorizontal: 20,
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: 15,
        marginBottom: 20,
    },
    interestBtn: {
        flex: 1,
        backgroundColor: '#FDBE01',
        height: 56,
        borderRadius: 15,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    interestText: {
        fontSize: 18,
        fontWeight: '800',
        color: '#000000',
        fontFamily: serifFont,
    },
    chatActionBtn: {
        backgroundColor: '#FDBE01',
        width: 70,
        height: 56,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
