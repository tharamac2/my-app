import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated } from 'react-native';

interface SkeletonProps {
    width?: number | string;
    height?: number | string;
    borderRadius?: number;
    style?: any;
    count?: number;
}

export const Skeleton = ({ width = '100%', height = 20, borderRadius = 4, style }: SkeletonProps) => {
    const opacity = useRef(new Animated.Value(0.3)).current;

    useEffect(() => {
        Animated.loop(
            Animated.sequence([
                Animated.timing(opacity, {
                    toValue: 0.7,
                    duration: 800,
                    useNativeDriver: true,
                }),
                Animated.timing(opacity, {
                    toValue: 0.3,
                    duration: 800,
                    useNativeDriver: true,
                }),
            ])
        ).start();
    }, [opacity]);

    return (
        <Animated.View
            style={[
                styles.skeleton,
                { width, height, borderRadius, opacity },
                style,
            ]}
        />
    );
};

export const SkeletonList = ({ count = 3, style }: { count?: number, style?: any }) => {
    return (
        <View style={[styles.listContainer, style]}>
            {Array.from({ length: count }).map((_, index) => (
                <View key={index} style={styles.listItem}>
                    <Skeleton width={60} height={60} borderRadius={30} style={styles.avatar} />
                    <View style={styles.content}>
                        <Skeleton width="70%" height={24} style={styles.title} />
                        <Skeleton width="40%" height={16} />
                    </View>
                </View>
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    skeleton: {
        backgroundColor: '#E5E7EB',
    },
    listContainer: {
        width: '100%',
    },
    listItem: {
        flexDirection: 'row',
        padding: 16,
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        marginBottom: 16,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 1,
        borderWidth: 1,
        borderColor: '#F3F4F6'
    },
    avatar: {
        marginRight: 16,
    },
    content: {
        flex: 1,
    },
    title: {
        marginBottom: 8,
    }
});
