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

const { width } = Dimensions.get('window');

const serifFont = Platform.select({
    ios: 'Georgia',
    android: 'serif',
    default: 'serif',
});

const RECENTLY_VIEWED = [
    {
        id: '1',
        name: 'Riya Shibu',
        age: 26,
        profession: 'Software Professional',
        location: 'Chennai, Tamil Nadu',
        imageUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1364&auto=format&fit=crop',
    },
    {
        id: '2',
        name: 'Riya Shibu',
        age: 26,
        profession: 'Software Professional',
        location: 'Chennai, Tamil Nadu',
        imageUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1288&auto=format&fit=crop',
    },
    {
        id: '3',
        name: 'Riya Shibu',
        age: 26,
        profession: 'Software Professional',
        location: 'Chennai, Tamil Nadu',
        imageUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1287&auto=format&fit=crop',
    },
    {
        id: '4',
        name: 'Riya Shibu',
        age: 26,
        profession: 'Software Professional',
        location: 'Chennai, Tamil Nadu',
        imageUrl: 'https://images.unsplash.com/photo-1524250502761-1ac6f2e30d43?q=80&w=1000&auto=format&fit=crop',
    },
];

export default function RecentlyViewedScreen() {
    const router = useRouter();

    const renderRecentCard = ({ item }: { item: typeof RECENTLY_VIEWED[0] }) => (
        <TouchableOpacity
            style={styles.card}
            onPress={() => router.push({
                pathname: '/profile-detail',
                params: { name: item.name, age: item.age.toString() }
            })}
        >
            <Image source={{ uri: item.imageUrl }} style={styles.cardImage} />
            <View style={styles.cardInfo}>
                <Text style={styles.nameText}>{item.name}, {item.age}</Text>
                <Text style={styles.professionText}>{item.profession} ....</Text>
                <Text style={styles.locationText}>{item.location}</Text>
            </View>
            <TouchableOpacity style={styles.heartBtn}>
                <Ionicons name="heart" size={26} color="#FDBE01" />
            </TouchableOpacity>
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={styles.container} edges={['top']}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
                    <Ionicons name="chevron-back" size={28} color="#FDBE01" />
                </TouchableOpacity>
            </View>

            <FlatList
                data={RECENTLY_VIEWED}
                renderItem={renderRecentCard}
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
        backgroundColor: '#FCFCFC',
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
        flexDirection: 'row',
        backgroundColor: '#FFF8E1',
        borderRadius: 20,
        padding: 12,
        alignItems: 'center',
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 5,
        elevation: 2,
    },
    cardImage: {
        width: 100,
        height: 100,
        borderRadius: 15,
    },
    cardInfo: {
        flex: 1,
        marginLeft: 15,
    },
    nameText: {
        fontSize: 18,
        fontFamily: serifFont,
        fontWeight: 'bold',
        color: '#000',
        marginBottom: 4,
    },
    professionText: {
        fontSize: 12,
        fontFamily: serifFont,
        color: '#444',
        marginBottom: 2,
        fontWeight: '600',
    },
    locationText: {
        fontSize: 12,
        fontFamily: serifFont,
        color: '#666',
        fontWeight: '600',
    },
    heartBtn: {
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
    bottomTab: {
        position: 'absolute',
        bottom: 20,
        left: 20,
        right: 20,
        height: 75,
        backgroundColor: '#FDBE01',
        borderRadius: 37,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.2,
        shadowRadius: 10,
    },
    addBtn: {
        width: 50,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
    }
});
