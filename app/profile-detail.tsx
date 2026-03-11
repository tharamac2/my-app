import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React from 'react';
import {
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

const { width } = Dimensions.get('window');

const serifFont = Platform.select({
    ios: 'Georgia',
    android: 'serif',
    default: 'serif',
});

export default function ProfileDetailScreen() {
    const router = useRouter();
    const params = useLocalSearchParams();

    // Use params or fallback to the provided persona (Prisha Mirha)
    const profile = {
        name: params.name || 'Prisha Mirha',
        age: params.age || '28',
        bio: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
        dob: '02-05-1995',
        birthTime: '04.15 AM',
        religion: 'Hindu',
        height: '168 cm',
        siblings: '3',
        location: 'Mumbai, India',
        mainImage: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1288&auto=format&fit=crop',
        gallery: [
            'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1287&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1364&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?q=80&w=1000&auto=format&fit=crop'
        ]
    };

    return (
        <SafeAreaView style={styles.container} edges={['bottom']}>
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>

                {/* Image Header Section */}
                <View style={styles.imageSection}>
                    <View style={styles.mainImageContainer}>
                        <Image source={{ uri: profile.mainImage }} style={styles.mainImage} />

                        {/* Overlay Buttons */}
                        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
                            <Ionicons name="chevron-back" size={24} color="#FDBE01" />
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.favouriteBtn}>
                            <Ionicons name="heart" size={24} color="#FDBE01" />
                        </TouchableOpacity>

                        {/* Gallery Thumbnails */}
                        <View style={styles.galleryOverlay}>
                            {profile.gallery.map((img, index) => (
                                <View key={index} style={styles.thumbnailContainer}>
                                    <Image source={{ uri: img }} style={styles.thumbnail} />
                                </View>
                            ))}
                        </View>

                        {/* Perfect Match Badge */}
                        <View style={styles.badgeContainer}>
                            <View style={styles.badgeContent}>
                                <MaterialCommunityIcons name="heart-multiple" size={20} color="#FDBE01" />
                                <Text style={styles.badgeText}>Perfect for eachother !</Text>
                            </View>
                        </View>
                    </View>
                </View>

                {/* Profile Info */}
                <View style={styles.infoSection}>
                    <View style={styles.titleRow}>
                        <Text style={styles.nameText}>{profile.name}, {profile.age}</Text>
                        <TouchableOpacity onPress={() => Alert.alert('Photos', 'Viewing all photos... ')}>
                            <Text style={styles.seeAllText}>see all</Text>
                        </TouchableOpacity>
                    </View>

                    <Text style={styles.bioText}>{profile.bio}</Text>

                    {/* Horizontal detail cards */}
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.cardsScroll}>
                        {/* Basic Details */}
                        <View style={styles.detailCard}>
                            <Text style={styles.cardHeader}>Basic details</Text>
                            <View style={styles.gridRow}>
                                <View style={styles.gridItem}>
                                    <Text style={styles.label}>Date Of Birth</Text>
                                    <Text style={styles.value}>{profile.dob}</Text>
                                </View>
                                <View style={styles.gridItem}>
                                    <Text style={styles.label}>Birth Time</Text>
                                    <Text style={styles.value}>{profile.birthTime}</Text>
                                </View>
                            </View>
                            <View style={[styles.gridRow, { marginTop: 15 }]}>
                                <View style={styles.gridItem}>
                                    <Text style={styles.label}>Religion</Text>
                                    <Text style={styles.value}>{profile.religion}</Text>
                                </View>
                                <View style={styles.gridItem}>
                                    <Text style={styles.label}>Height</Text>
                                    <Text style={styles.value}>{profile.height}</Text>
                                </View>
                            </View>
                        </View>

                        {/* Family Details */}
                        <View style={styles.detailCard}>
                            <Text style={styles.cardHeader}>Family details</Text>
                            <View style={styles.gridRow}>
                                <View style={styles.gridItem}>
                                    <Text style={styles.label}>No.of Siblings</Text>
                                    <Text style={styles.value}>{profile.siblings}</Text>
                                </View>
                            </View>
                            <View style={[styles.gridRow, { marginTop: 15 }]}>
                                <View style={styles.gridItem}>
                                    <Text style={styles.label}>Location</Text>
                                    <Text style={styles.value}>{profile.location}</Text>
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
                            params: { name: profile.name, imageUrl: profile.mainImage }
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
