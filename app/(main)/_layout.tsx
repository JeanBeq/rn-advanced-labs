import { Tabs } from 'expo-router';
import { Platform, Text } from 'react-native';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#007AFF',
        tabBarInactiveTintColor: '#8E8E93',
        tabBarStyle: {
          height: Platform.OS === 'ios' ? 88 : 68,
          paddingBottom: Platform.OS === 'ios' ? 28 : 12,
          paddingTop: 8,
          backgroundColor: '#fff',
          borderTopWidth: 1,
          borderTopColor: '#E5E5EA',
          elevation: 8,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: -2 },
          shadowOpacity: 0.1,
          shadowRadius: 8,
        },
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '600',
        },
        tabBarIconStyle: {
          marginTop: 4,
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: 'Accueil',
          tabBarIcon: ({ color }) => (
            <Text style={{ fontSize: 24, color }}>🏠</Text>
          ),
        }}
      />
      <Tabs.Screen
        name="TP3-forms"
        options={{
          title: 'Forms',
          tabBarIcon: ({ color }) => (
            <Text style={{ fontSize: 24, color }}>📝</Text>
          ),
        }}
      />
      <Tabs.Screen
        name="tp4A-robots"
        options={{
          title: 'Zustand',
          tabBarIcon: ({ color }) => (
            <Text style={{ fontSize: 24, color }}>🤖</Text>
          ),
        }}
      />
      <Tabs.Screen
        name="TP5-robots-db"
        options={{
          title: 'SQLite',
          tabBarIcon: ({ color }) => (
            <Text style={{ fontSize: 24, color }}>💾</Text>
          ),
        }}
      />
      <Tabs.Screen
        name="TP6-camera"
        options={{
          title: 'Caméra',
          tabBarIcon: ({ color }) => (
            <Text style={{ fontSize: 24, color }}>📷</Text>
          ),
        }}
      />
      
      {/* Masquer les écrans secondaires */}
      <Tabs.Screen
        name="tp1-profile-card"
        options={{
          href: null,
        }}
      />
      <Tabs.Screen
        name="tp4b-robots-rtk"
        options={{
          href: null,
        }}
      />
      <Tabs.Screen
        name="detail/[id]"
        options={{
          href: null,
        }}
      />
      <Tabs.Screen
        name="tp2-navigation"
        options={{
          href: null,
        }}
      />
    </Tabs>
  );
}
