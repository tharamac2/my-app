import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/use-color-scheme';
import React from 'react';
import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface MatchCardProps {
    name: string;
    age: number;
    height: string;
    profession: string;
    location: string;
    imageUrl: string;
    onPress?: () => void;
}

const { width } = Dimensions.get('window');

export function MatchCard({ name, age, height, profession, location, imageUrl, onPress }: MatchCardProps) {
    const theme = useColorScheme() ?? 'light';
    const colors = Colors[theme];

    return (
        <TouchableOpacity
            activeOpacity={0.9}
            onPress={onPress}
            style={[styles.container, { backgroundColor: colors.surface, shadowColor: colors.text }]}
        >
            <Image source={{ uri: imageUrl || 'https://via.placeholder.com/400x500' }} style={styles.image} />

            <View style={styles.infoContainer}>
                <Text style={[styles.name, { color: colors.text }]}>{name}, {age}</Text>
                <Text style={[styles.details, { color: colors.textSecondary }]}>
                    {height} • {profession}
                </Text>
                <Text style={[styles.location, { color: colors.textSecondary }]}>{location}</Text>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        width: width - 32,
        alignSelf: 'center',
        borderRadius: 20,
        overflow: 'hidden',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 12,
        elevation: 5,
        marginVertical: 12,
    },
    image: {
        width: '100%',
        height: 400,
        resizeMode: 'cover',
    },
    infoContainer: {
        padding: 16,
    },
    name: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    details: {
        fontSize: 16,
        marginBottom: 4,
    },
    location: {
        fontSize: 14,
    },
});
