import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Animated, Dimensions, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { DeviceEventEmitter } from 'react-native';

const { width } = Dimensions.get('window');

export type ToastType = 'success' | 'error' | 'info';

interface ToastOptions {
    message: string;
    type?: ToastType;
    duration?: number;
}

export const Toast = {
    show: (options: ToastOptions) => {
        DeviceEventEmitter.emit('SHOW_TOAST', options);
    },
};

export default function ToastManager() {
    const [isVisible, setIsVisible] = useState(false);
    const [message, setMessage] = useState('');
    const [type, setType] = useState<ToastType>('info');
    const [animation] = useState(new Animated.Value(-100));

    useEffect(() => {
        const subscription = DeviceEventEmitter.addListener('SHOW_TOAST', (options: ToastOptions) => {
            setMessage(options.message);
            setType(options.type || 'info');
            setIsVisible(true);

            Animated.timing(animation, {
                toValue: 50,
                duration: 300,
                useNativeDriver: true,
            }).start();

            setTimeout(() => {
                hideToast();
            }, options.duration || 3000);
        });

        return () => subscription.remove();
    }, []);

    const hideToast = () => {
        Animated.timing(animation, {
            toValue: -100,
            duration: 300,
            useNativeDriver: true,
        }).start(() => {
            setIsVisible(false);
        });
    };

    if (!isVisible) return null;

    const getIcon = () => {
        switch (type) {
            case 'success': return 'checkmark-circle';
            case 'error': return 'close-circle';
            default: return 'information-circle';
        }
    };

    const getColor = () => {
        switch (type) {
            case 'success': return '#10B981';
            case 'error': return '#EF4444';
            default: return '#3B82F6';
        }
    };

    return (
        <Animated.View style={[styles.container, { transform: [{ translateY: animation }] }]}>
            <View style={[styles.toast, { borderLeftColor: getColor() }]}>
                <Ionicons name={getIcon() as any} size={24} color={getColor()} style={styles.icon} />
                <Text style={styles.message}>{message}</Text>
                <TouchableOpacity onPress={hideToast}>
                    <Ionicons name="close" size={20} color="#999" />
                </TouchableOpacity>
            </View>
        </Animated.View>
    );
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 9999,
        alignItems: 'center',
    },
    toast: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        width: width * 0.9,
        padding: 16,
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 12,
        elevation: 8,
        borderLeftWidth: 4,
    },
    icon: {
        marginRight: 12,
    },
    message: {
        flex: 1,
        fontSize: 14,
        color: '#1A1A1A',
        fontWeight: '500',
    },
});
