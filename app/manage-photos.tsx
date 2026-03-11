import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { useRouter } from 'expo-router';
import React from 'react';
import {
    Alert,
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

    const [photos, setPhotos] = React.useState([
        { id: '1', uri: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1288&auto=format&fit=crop', isPrimary: true },
        { id: '2', uri: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1287&auto=format&fit=crop', isPrimary: false },
        { id: '3', uri: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1364&auto=format&fit=crop', isPrimary: false },
    ]);

    const pickImage = async (replaceId?: string) => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
            Alert.alert('Permission Denied', 'We need camera roll permissions to upload photos.');
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images'],
            allowsEditing: true,
            aspect: [3, 4],
            quality: 0.8,
        });

        if (!result.canceled) {
            const newUri = result.assets[0].uri;
            if (replaceId) {
                setPhotos(current => current.map(p => p.id === replaceId ? { ...p, uri: newUri } : p));
            } else {
                if (photos.length >= 6) {
                    Alert.alert('Limit Reached', 'You can only upload up to 6 photos.');
                    return;
                }
                const newPhoto = {
                    id: Date.now().toString(),
                    uri: newUri,
                    isPrimary: photos.length === 0,
                };
                setPhotos([...photos, newPhoto]);
            }
        }
    };

    const deletePhoto = (id: string) => {
        Alert.alert(
            'Delete Photo',
            'Are you sure you want to remove this photo?',
            [
                { text: 'Cancel', style: 'cancel' },
                {
                    text: 'Delete',
                    style: 'destructive',
                    onPress: () => {
                        setPhotos(current => {
                            const filtered = current.filter(p => p.id !== id);
                            // If we deleted the primary, make the first remaining one primary
                            if (current.find(p => p.id === id)?.isPrimary && filtered.length > 0) {
                                filtered[0].isPrimary = true;
                            }
                            return filtered;
                        });
                    }
                }
            ]
        );
    };

    const setPrimary = (id: string) => {
        setPhotos(current => current.map(p => ({
            ...p,
            isPrimary: p.id === id
        })));
        Alert.alert('Profile Picture Updated');
    };

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
                    <TouchableOpacity
                        style={[styles.uploadBtn, photos.length >= 6 && styles.uploadBtnDisabled]}
                        onPress={() => pickImage()}
                        disabled={photos.length >= 6}
                    >
                        <Ionicons
                            name="cloud-upload-outline"
                            size={32}
                            color={photos.length >= 6 ? "#CCCCCC" : "#134377"}
                            style={styles.uploadIcon}
                        />
                        <Text style={[styles.uploadTitle, photos.length >= 6 && { color: "#CCCCCC" }]}>
                            {photos.length >= 6 ? 'Limit Reached' : 'Upload New Photo'}
                        </Text>
                        <Text style={styles.uploadSubtext}>JPG, PNG up to 10MB</Text>
                    </TouchableOpacity>
                </View>

                <Text style={styles.sectionTitle}>YOUR PHOTOS ({photos.length} / 6)</Text>

                <View style={styles.photoGrid}>
                    {photos.map((photo) => (
                        <View key={photo.id} style={styles.photoContainer}>
                            <TouchableOpacity activeOpacity={0.9} onPress={() => setPrimary(photo.id)}>
                                <Image source={{ uri: photo.uri }} style={styles.image} />
                            </TouchableOpacity>

                            {photo.isPrimary && (
                                <View style={styles.primaryBadge}>
                                    <Text style={styles.primaryBadgeText}>Profile Pic</Text>
                                </View>
                            )}

                            <View style={styles.actionRow}>
                                <TouchableOpacity style={styles.actionBtn} onPress={() => pickImage(photo.id)}>
                                    <Ionicons name="pencil" size={14} color="#FFFFFF" />
                                </TouchableOpacity>
                                <TouchableOpacity style={[styles.actionBtn, { backgroundColor: '#FF4444' }]} onPress={() => deletePhoto(photo.id)}>
                                    <Ionicons name="trash" size={14} color="#FFFFFF" />
                                </TouchableOpacity>
                            </View>
                        </View>
                    ))}

                    {/* Empty slots */}
                    {Array.from({ length: 6 - photos.length }).map((_, i) => (
                        <TouchableOpacity key={`empty-${i}`} style={styles.emptySlot} onPress={() => pickImage()}>
                            <Ionicons name="add" size={30} color="#CCCCCC" />
                        </TouchableOpacity>
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
    actionRow: {
        position: 'absolute',
        top: 6,
        right: 6,
        flexDirection: 'row',
        gap: 6,
    },
    actionBtn: {
        backgroundColor: 'rgba(0,0,0,0.6)',
        width: 28,
        height: 28,
        borderRadius: 14,
        justifyContent: 'center',
        alignItems: 'center',
    },
    uploadBtnDisabled: {
        borderColor: '#CCCCCC',
        backgroundColor: '#F9F9F9',
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
