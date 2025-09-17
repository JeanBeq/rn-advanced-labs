import { Tabs } from 'expo-router';

export default function TabLayout() {
  return (
    <Tabs>
      <Tabs.Screen
        name="home"
        options={{
          title: 'Accueil',
        }}
      />
      <Tabs.Screen
        name="tp1-profile-card"
        options={{
          title: 'Profil',
        }}
      />
      <Tabs.Screen
        name="TP3-forms/formik"
        options={{
          title: 'Formik',
        }}
      />
      <Tabs.Screen
        name="TP3-forms/rhf"
        options={{
          title: 'RHF',
        }}
      />
      {/* Masquer tous les autres écrans */}
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
