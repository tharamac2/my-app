import { MatchCard } from '@/components/ui/MatchCard';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/use-color-scheme';
import React from 'react';
import { FlatList, ListRenderItemInfo, StyleSheet, View } from 'react-native';

const DUMMY_MATCHES = [
  {
    id: '1',
    name: 'Priya Sharma',
    age: 26,
    height: '5\'5"',
    profession: 'Software Engineer',
    location: 'Bangalore, India',
    imageUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1288&auto=format&fit=crop',
  },
  {
    id: '2',
    name: 'Rahul Verma',
    age: 29,
    height: '5\'11"',
    profession: 'Marketing Manager',
    location: 'Mumbai, India',
    imageUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1287&auto=format&fit=crop',
  },
  {
    id: '3',
    name: 'Anjali Desai',
    age: 27,
    height: '5\'4"',
    profession: 'Architect',
    location: 'Delhi, India',
    imageUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1364&auto=format&fit=crop',
  },
];

export default function DiscoverScreen() {
  const theme = useColorScheme() ?? 'light';
  const colors = Colors[theme];

  const renderItem = ({ item }: ListRenderItemInfo<typeof DUMMY_MATCHES[0]>) => (
    <MatchCard
      name={item.name}
      age={item.age}
      height={item.height}
      profession={item.profession}
      location={item.location}
      imageUrl={item.imageUrl}
      onPress={() => console.log('Navigate to profile', item.id)}
    />
  );

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <FlatList
        data={DUMMY_MATCHES}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContent: {
    paddingVertical: 16,
  },
});
