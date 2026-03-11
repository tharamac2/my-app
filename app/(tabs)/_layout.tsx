import { Tabs } from 'expo-router';
import React from 'react';
import { StyleSheet, View } from 'react-native';

import { HapticTab } from '@/components/haptic-tab';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const themeColors = Colors[colorScheme ?? 'light'];

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#000000',
        tabBarInactiveTintColor: '#000000',
        tabBarShowLabel: false,
        headerShown: true,
        headerStyle: {
          backgroundColor: '#FFFFFF',
        },
        headerTintColor: '#000000',
        tabBarStyle: {
          backgroundColor: '#FDBE01',
          borderTopWidth: 0,
          height: 85,
          paddingBottom: 25,
          paddingTop: 10,
          borderTopLeftRadius: 35,
          borderTopRightRadius: 35,
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          elevation: 0,
          shadowOpacity: 0,
        },
        tabBarButton: HapticTab,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          headerShown: false,
          title: 'Discover',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons size={28} name={focused ? "home" : "home-outline"} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="chat"
        options={{
          headerShown: false,
          title: 'Chat',
          tabBarIcon: ({ color, focused }) => (
            <View>
              <Ionicons size={26} name={focused ? "chatbubble-ellipses" : "chatbubble-ellipses-outline"} color={color} />
              <View style={styles.badgeDot} />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="matches"
        options={{
          headerShown: false,
          title: 'Favourites',
          tabBarIcon: ({ color, focused }) => (
            <View>
              <Ionicons size={focused ? 28 : 26} name={focused ? "heart" : "heart-outline"} color={color} />
              {!focused && <View style={styles.badgeDot} />}
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="premium"
        options={{
          headerShown: false,
          title: 'Premium',
          tabBarIcon: ({ color, focused }) => (
            <MaterialCommunityIcons size={30} name={focused ? "crown" : "crown-outline"} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          headerShown: false,
          title: 'Profile',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons size={28} name={focused ? "person" : "person-outline"} color={color} />
          ),
        }}
      />
      {/* Remove search since it's now integrated or redundant, or just hide if we need to */}
      <Tabs.Screen
        name="search"
        options={{
          href: null,
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  activeTabBg: {
    backgroundColor: '#FFFFFF',
    width: 45,
    height: 40,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeDot: {
    position: 'absolute',
    top: 2,
    right: -2,
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#FF3B30', // Red dot for notification
    borderWidth: 1.5,
    borderColor: '#FDBE01',
  }
});
