import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/use-color-scheme';
import React from 'react';
import { ActivityIndicator, StyleSheet, Text, TextStyle, TouchableOpacity, TouchableOpacityProps, ViewStyle } from 'react-native';

interface PrimaryButtonProps extends TouchableOpacityProps {
    title: string;
    loading?: boolean;
    type?: 'primary' | 'secondary' | 'outline';
    style?: ViewStyle;
    textStyle?: TextStyle;
}

export function PrimaryButton({
    title,
    loading = false,
    type = 'primary',
    style,
    textStyle,
    disabled,
    ...rest
}: PrimaryButtonProps) {
    const theme = useColorScheme() ?? 'light';
    const colors = Colors[theme];

    const getBackgroundColor = () => {
        if (disabled) return colors.border;
        if (type === 'secondary') return colors.secondary;
        if (type === 'outline') return 'transparent';
        return colors.primary;
    };

    const getTextColor = () => {
        if (disabled) return colors.textSecondary;
        if (type === 'outline') return colors.primary;
        return '#FFFFFF';
    };

    return (
        <TouchableOpacity
            style={[
                styles.button,
                { backgroundColor: getBackgroundColor() },
                type === 'outline' && { borderWidth: 1, borderColor: colors.primary },
                style,
            ]}
            disabled={disabled || loading}
            activeOpacity={0.8}
            {...rest}
        >
            {loading ? (
                <ActivityIndicator color={getTextColor()} />
            ) : (
                <Text style={[styles.text, { color: getTextColor() }, textStyle]}>
                    {title}
                </Text>
            )}
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        height: 50,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 24,
        marginVertical: 8,
    },
    text: {
        fontSize: 16,
        fontWeight: '600',
    },
});
