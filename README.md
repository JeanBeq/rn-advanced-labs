# TP1 — Initialisation du projet & Premier composant

Bienvenue 👋 Ce dépôt contient l'initialisation d'une application mobile basée sur [Expo](https://expo.dev), utilisant **React Native**, **TypeScript** et le **fichier-based routing** d'Expo Router.

Ce premier TP se concentre sur :

1. La mise en place de l'environnement Expo.
2. La création d'un premier écran simple : une carte de profil (`ProfileCard`).
3. L'introduction à l'état local avec `useState` via un compteur de followers dynamique.

---

## ✅ Composant réalisé : ProfileCard

Fonctionnalités actuelles :

- Affichage d'une image distante (chat) via une URL (API publique cataas.com).
- Nom du profil : « Big Cat ».
- Rôle affiché : « Développeur Mobile ».
- Compteur de followers dynamique (valeur évolutive à chaque interaction).
- Bouton Follow / Unfollow qui :
  - Incrémente le compteur lorsqu'on suit le profil.
  - Décrémente (sans passer sous 0) lorsqu'on se désabonne.
- Style centré et image avec coins arrondis.

Extrait (simplifié) :

```tsx
const [followers, setFollowers] = useState(0);
const [isFollowing, setIsFollowing] = useState(false);

const toggleFollow = () => {
  setFollowers(prev => isFollowing ? Math.max(0, prev - 1) : prev + 1);
  setIsFollowing(f => !f);
};
```

---

## 🎯 Objectifs pédagogiques

- Comprendre la structure d'un projet Expo.
- Manipuler un composant fonctionnel React Native.
- Utiliser `useState` pour gérer un état local simple.
- Mettre à jour l'UI en réponse aux interactions utilisateur.
- Organiser le code dans le dossier `app/` avec le routing automatique.

---

## 🚀 Démarrage rapide

1. Installer les dépendances :
   ```bash
   npm install
   ```
2. Lancer l'application :
   ```bash
   npx expo start
   ```
3. Choisir un mode d'exécution :
   - Build de développement
   - Émulateur Android
   - Simulateur iOS
   - App Expo Go (scan du QR code)

---

## 🧭 Navigation & Structure

Le dossier `app/` définit les routes : chaque fichier `.tsx` devient un écran.

Structure (extrait) :
```text
app/
  _layout.tsx              # Layout racine (navigation)
  (tabs)/                  # Groupe d'onglets
    _layout.tsx
    index.tsx
    explore.tsx
  tp1-profile-card/
    index.tsx              # Écran du TP1 (ProfileCard)
components/               # Composants réutilisables (UI, thèmes, etc.)
hooks/                    # Hooks personnalisés
assets/images/            # Images et icônes
```

---

## 🛠 Technologies & Outils

- Expo + Expo Router
- React Native + TypeScript
- Hooks React (`useState`)
- Images distantes

---

## 🧪 Pistes d'amélioration (prochaines itérations)

- Persister le nombre de followers (AsyncStorage / SecureStore).
- Simuler une API (délai / chargement / erreur).
- Ajouter une animation (scale ou opacity) lors du follow.
- Afficher un avatar local de fallback si l'image distante échoue.
- Extraire `ProfileCard` dans `components/` pour réutilisation.

---

## 📷 Aperçu

![aperçu](image.png)

---
