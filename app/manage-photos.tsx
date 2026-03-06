import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import {
    Dimensions,
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');
const gap = 12;
const padding = 20;
const itemSize = (width - padding * 2 - gap * 2) / 3;

export default function ManagePhotosScreen() {
    const router = useRouter();

    // Dummy Photos
    const photos = [
        { id: '1', uri: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1288&auto=format&fit=crop', isPrimary: true },
        { id: '2', uri: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1287&auto=format&fit=crop', isPrimary: false },
        { id: '3', uri: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1364&auto=format&fit=crop', isPrimary: false },
    ];

    return (
        <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
                    <Ionicons name="arrow-back" size={24} color="#1A1A1A" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Manage Photos</Text>
                <View style={{ width: 34 }} /> {/* Spacer for centering */}
            </View>

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>

                <View style={styles.uploadSection}>
                    <TouchableOpacity style={styles.uploadBtn}>
                        <Ionicons name="cloud-upload-outline" size={32} color="#134377" style={styles.uploadIcon} />
                        <Text style={styles.uploadTitle}>Upload New Photo</Text>
                        <Text style={styles.uploadSubtext}>JPG, PNG up to 10MB</Text>
                    </TouchableOpacity>
                </View>

                <Text style={styles.sectionTitle}>YOUR PHOTOS ({photos.length} / 6)</Text>

                <View style={styles.photoGrid}>
                    {photos.map((photo) => (
                        <View key={photo.id} style={styles.photoContainer}>
                            <Image source={{ uri: photo.uri }} style={styles.image} />

                            {photo.isPrimary && (
                                <View style={styles.primaryBadge}>
                                    <Text style={styles.primaryBadgeText}>Profile Pic</Text>
                                </View>
                            )}

                            <TouchableOpacity style={styles.deleteBtn}>
                                <Ionicons name="trash" size={16} color="#FFFFFF" />
                            </TouchableOpacity>
                        </View>
                    ))}

                    {/* Empty slots */}
                    {Array.from({ length: 6 - photos.length }).map((_, i) => (
                        <View key={`empty-${i}`} style={styles.emptySlot}>
                            <Ionicons name="add" size={30} color="#CCCCCC" />
                        </View>
                    ))}
                </View>

                <View style={styles.guidelines}>
                    <Text style={styles.guideTitle}>Photo Guidelines</Text>
                    <Text style={styles.guideText}>• Look straight at the camera</Text>
                    <Text style={styles.guideText}>• Avoid sunglasses and hats</Text>
                    <Text style={styles.guideText}>• Ensure your face is clearly visible</Text>
                </View>

            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F5F5',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingVertical: 15,
        backgroundColor: '#FFFFFF',
        borderBottomWidth: 1,
        borderBottomColor: '#EEEEEE',
    },
    backButton: {
        padding: 5,
        marginLeft: -5,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#1A1A1A',
    },
    scrollContent: {
        padding: padding,
        paddingBottom: 40,
    },
    uploadSection: {
        marginBottom: 30,
    },
    uploadBtn: {
        backgroundColor: 'rgba(19, 67, 119, 0.05)',
        borderWidth: 2,
        borderColor: '#134377',
        borderStyle: 'dashed',
        borderRadius: 16,
        padding: 24,
        alignItems: 'center',
    },
    uploadIcon: {
        marginBottom: 12,
    },
    uploadTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#134377',
        marginBottom: 4,
    },
    uploadSubtext: {
        fontSize: 13,
        color: '#888888',
    },
    sectionTitle: {
        fontSize: 12,
        fontWeight: 'bold',
        color: '#888888',
        marginBottom: 16,
        letterSpacing: 1,
    },
    photoGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: gap,
    },
    photoContainer: {
        width: itemSize,
        height: itemSize * 1.3,
        borderRadius: 12,
        overflow: 'hidden',
        position: 'relative',
        backgroundColor: '#EAEAEA',
    },
    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    primaryBadge: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'rgba(253, 190, 1, 0.9)',
        paddingVertical: 4,
        alignItems: 'center',
    },
    primaryBadgeText: {
        fontSize: 10,
        fontWeight: 'bold',
        color: '#1A1A1A',
    },
    deleteBtn: {
        position: 'absolute',
        top: 6,
        right: 6,
        backgroundColor: 'rgba(0,0,0,0.5)',
        width: 28,
        height: 28,
        borderRadius: 14,
        justifyContent: 'center',
        alignItems: 'center',
    },
    emptySlot: {
        width: itemSize,
        height: itemSize * 1.3,
        borderRadius: 12,
        backgroundColor: '#EAEAEA',
        borderWidth: 1,
        borderColor: '#DDDDDD',
        borderStyle: 'dashed',
        justifyContent: 'center',
        alignItems: 'center',
    },
    guidelines: {
        marginTop: 40,
        padding: 20,
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
    },
    guideTitle: {
        fontWeight: 'bold',
        fontSize: 14,
        marginBottom: 12,
        color: '#1A1A1A',
    },
    guideText: {
        fontSize: 13,
        color: '#666666',
        marginBottom: 6,
    },
});
