import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Svg, { Circle } from 'react-native-svg';

interface CompatibilityRingProps {
    percentage: number;
    size?: number;
    strokeWidth?: number;
}

export function CompatibilityRing({ percentage, size = 48, strokeWidth = 4 }: CompatibilityRingProps) {
    const radius = (size - strokeWidth) / 2;
    const circumference = radius * 2 * Math.PI;
    const strokeDashoffset = circumference - (percentage / 100) * circumference;

    const getColor = (pct: number) => {
        if (pct >= 70) return '#4CAF50'; // Green
        if (pct >= 50) return '#FFC107'; // Yellow
        return '#F44336'; // Red
    };

    const center = size / 2;
    const color = getColor(percentage);

    return (
        <View style={[styles.container, { width: size, height: size }]}>
            <Svg width={size} height={size} style={styles.svg}>
                {/* Background Track Circle */}
                <Circle
                    stroke="rgba(0,0,0,0.3)"
                    fill="rgba(0,0,0,0.6)" // Dark backdrop for the percentage text
                    cx={center}
                    cy={center}
                    r={radius}
                    strokeWidth={strokeWidth}
                />
                {/* Progress Circle */}
                <Circle
                    stroke={color}
                    fill="none"
                    cx={center}
                    cy={center}
                    r={radius}
                    strokeWidth={strokeWidth}
                    strokeDasharray={`${circumference} ${circumference}`}
                    strokeDashoffset={strokeDashoffset}
                    strokeLinecap="round"
                    originX={center}
                    originY={center}
                    rotation="-90" // Start progress bar from top (12 O'clock)
                />
            </Svg>
            <View style={[StyleSheet.absoluteFill, styles.textContainer]}>
                <Text style={styles.text}>{Math.round(percentage)}%</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        top: 12,
        left: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 3,
        elevation: 5,
        zIndex: 10,
    },
    svg: {
        transform: [{ rotateZ: '0deg' }],
    },
    textContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        fontSize: 12,
        fontWeight: 'bold',
        color: '#FFFFFF',
    },
});
