import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import {
    Dimensions,
    FlatList,
    Image,
    Platform,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width, height } = Dimensions.get('window');

const serifFont = Platform.select({
    ios: 'Georgia',
    android: 'serif',
    default: 'serif',
});

const ALL_MATCHES = [
    {
        id: '1',
        name: 'Prisha Mirha',
        age: 28,
        profession: 'Software Professional',
        degree: 'Graduate',
        location: 'Dwaraka, New Delhi',
        imageUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1288&auto=format&fit=crop',
    },
    {
        id: '2',
        name: 'Sowmiya',
        age: 25,
        profession: 'Software Professional',
        degree: 'Graduate',
        location: 'Dindigul, Tamilnadu',
        imageUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1364&auto=format&fit=crop',
    },
    {
        id: '3',
        name: 'Riya Shibu',
        age: 26,
        profession: 'Software Professional',
        degree: 'Post Graduate',
        location: 'Chennai, Tamil Nadu',
        imageUrl: 'https://images.unsplash.com/photo-1524250502761-1ac6f2e30d43?q=80&w=1000&auto=format&fit=crop',
    },
];

export default function AllMatchesScreen() {
    const router = useRouter();

    const renderMatchCard = ({ item }: { item: typeof ALL_MATCHES[0] }) => (
        <View style={styles.card}>
            <Image source={{ uri: item.imageUrl }} style={styles.cardImage} />

            {/* Side Action Buttons */}
            <View style={styles.sideActions}>
                <TouchableOpacity style={styles.actionBtn}>
                    <Ionicons name="heart" size={24} color="#FDBE01" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.actionBtn}>
                    <MaterialCommunityIcons name="ring" size={24} color="#FDBE01" />
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.actionBtn}
                    onPress={() => router.push({
                        pathname: '/chat-detail',
                        params: { name: item.name, imageUrl: item.imageUrl }
                    })}
                >
                    <Ionicons name="chatbubble" size={24} color="#FDBE01" />
                </TouchableOpacity>
            </View>

            {/* Bottom Info Overlay */}
            <View style={styles.infoOverlay}>
                <Text style={styles.nameText}>{item.name}, {item.age}</Text>
                <Text style={styles.professionText}>{item.profession} - {item.degree}</Text>
                <Text style={styles.locationText}>{item.location}</Text>
            </View>
        </View>
    );

    return (
        <SafeAreaView style={styles.container} edges={['top']}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
                    <Ionicons name="chevron-back" size={28} color="#FDBE01" />
                </TouchableOpacity>
            </View>

            <FlatList
                data={ALL_MATCHES}
                renderItem={renderMatchCard}
                keyExtractor={item => item.id}
                contentContainerStyle={styles.listContent}
                showsVerticalScrollIndicator={false}
            />

            {/* Floating Bottom Tab Bar Mockup */}
            <View style={styles.bottomTab}>
                <TouchableOpacity onPress={() => router.push('/(tabs)')}>
                    <Ionicons name="home-outline" size={24} color="#000" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => router.push('/(tabs)/chat')}>
                    <Ionicons name="chatbubble-ellipses-outline" size={24} color="#000" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => router.push('/(tabs)/matches')}>
                    <Ionicons name="heart-outline" size={24} color="#000" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => router.push('/(tabs)/premium')}>
                    <MaterialCommunityIcons name="crown-outline" size={24} color="#000" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => router.push('/(tabs)/profile')}>
                    <Ionicons name="person-outline" size={24} color="#000" />
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    header: {
        paddingHorizontal: 15,
        paddingVertical: 10,
    },
    backBtn: {
        padding: 5,
    },
    listContent: {
        paddingHorizontal: 20,
        paddingBottom: 100,
    },
    card: {
        width: '100%',
        height: height * 0.55,
        borderRadius: 25,
        overflow: 'hidden',
        marginBottom: 20,
        position: 'relative',
        backgroundColor: '#F5F5F5',
    },
    cardImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    sideActions: {
        position: 'absolute',
        right: 15,
        top: '15%',
        gap: 20,
    },
    actionBtn: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: '#FFFFFF',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    infoOverlay: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        padding: 20,
        paddingTop: 40,
        backgroundImage: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)',
        // backgroundColor: 'rgba(0,0,0,0.3)', // Fallback
    },
    nameText: {
        fontSize: 22,
        fontFamily: serifFont,
        fontWeight: '700',
        color: '#FFFFFF',
        marginBottom: 4,
    },
    professionText: {
        fontSize: 14,
        color: '#FFFFFF',
        opacity: 0.9,
        marginBottom: 2,
        fontFamily: serifFont,
    },
    locationText: {
        fontSize: 14,
        color: '#FFFFFF',
        fontWeight: '600',
        fontFamily: serifFont,
    },
    bottomTab: {
        position: 'absolute',
        bottom: 20,
        left: 20,
        right: 20,
        height: 70,
        backgroundColor: '#FDBE01',
        borderRadius: 35,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.2,
        shadowRadius: 10,
    },
});
