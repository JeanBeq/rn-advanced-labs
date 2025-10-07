import { Tabs } from 'expo-router';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: '🏠 Accueil',
        }}
      />
      <Tabs.Screen
        name="tp1-profile-card"
        options={{
          title: '👤 Profil',
        }}
      />
      <Tabs.Screen
        name="tp4A-robots"
        options={{
          title: '🤖 Zustand',
        }}
      />
      <Tabs.Screen
        name="tp4b-robots-rtk"
        options={{
          title: '🔧 Redux',
        }}
      />
      {/* Masquer tous les autres écrans */}
      <Tabs.Screen
        name="TP3-forms/formik"
        options={{
          href: null,
        }}
      />
      <Tabs.Screen
        name="TP3-forms/rhf"
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
      <Tabs.Screen
        name="TP3-forms"
        options={{
          href: null,
        }}
      />
    </Tabs>
  );
}
