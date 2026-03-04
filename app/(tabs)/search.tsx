import { FormInput } from '@/components/ui/FormInput';
import { PrimaryButton } from '@/components/ui/PrimaryButton';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/use-color-scheme';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

export default function SearchScreen() {
    const theme = useColorScheme() ?? 'light';
    const colors = Colors[theme];

    const [minAge, setMinAge] = useState('24');
    const [maxAge, setMaxAge] = useState('32');
    const [religion, setReligion] = useState('');
    const [location, setLocation] = useState('');

    return (
        <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
            <View style={styles.content}>
                <Text style={[styles.sectionTitle, { color: colors.text }]}>Find Your Match</Text>

                <View style={styles.row}>
                    <View style={styles.halfWidth}>
                        <FormInput
                            label="Min Age"
                            keyboardType="numeric"
                            value={minAge}
                            onChangeText={setMinAge}
                        />
                    </View>
                    <View style={styles.halfWidth}>
                        <FormInput
                            label="Max Age"
                            keyboardType="numeric"
                            value={maxAge}
                            onChangeText={setMaxAge}
                        />
                    </View>
                </View>

                <FormInput
                    label="Religion / Community"
                    placeholder="e.g. Hindu, Muslim, Christian"
                    value={religion}
                    onChangeText={setReligion}
                />

                <FormInput
                    label="Location"
                    placeholder="City or Country"
                    value={location}
                    onChangeText={setLocation}
                />

                <PrimaryButton
                    title="Search Profiles"
                    style={styles.searchButton}
                    onPress={() => console.log('Searching...')}
                />
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    content: {
        padding: 24,
    },
    sectionTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 24,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 16,
    },
    halfWidth: {
        flex: 1,
    },
    searchButton: {
        marginTop: 32,
    },
});
