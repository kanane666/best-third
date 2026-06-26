# 🦁 Lions 3es — CM 2026

> Classement live des meilleurs 3es de la Coupe du Monde 2026 · Mobile First · React + Vite

---

## 🚀 Déploiement sur Vercel (5 étapes)

### 1. Clone / push sur GitHub
```bash
git init
git add .
git commit -m "init: lions 3es cm2026"
git remote add origin https://github.com/TON_USERNAME/lions-3es-cm2026.git
git push -u origin main
```

### 2. Ouvrir [vercel.com](https://vercel.com)
- Connecte ton compte GitHub
- Clique **"Add New Project"**
- Sélectionne le repo `lions-3es-cm2026`

### 3. Configuration Vercel (auto-détectée)
| Paramètre | Valeur |
|---|---|
| Framework | **Vite** |
| Build Command | `npm run build` |
| Output Directory | `dist` |

### 4. Clique **Deploy** → c'est tout ! 🎉

---

## 💻 Développement local

```bash
npm install
npm run dev
# → http://localhost:3000
```

---

## 📡 API utilisée

**Source principale :** `https://worldcup26.ir/get/groups` + `/get/games`
- Open source, gratuite, sans clé API
- Groupes + scores live toutes les 60 secondes

**Fallback :** Données statiques intégrées (mis à jour au dernier état connu)
- Activé automatiquement si l'API est indisponible

---

## 🏗️ Structure du projet

```
src/
├── components/
│   ├── Header.jsx          # Header sticky avec indicateur live
│   ├── LiveMatchBanner.jsx # Bandeau matchs en cours
│   ├── ThirdPlaceRanking.jsx # Tableau classement 3es
│   ├── SenegalCard.jsx     # Focus Sénégal avec analyse
│   ├── GroupsGrid.jsx      # Vue 12 groupes
│   └── BottomNav.jsx       # Navigation mobile
├── hooks/
│   └── useLiveData.js      # Fetch + refresh auto 60s
├── utils/
│   └── data.js             # Données statiques + calculs FIFA
├── App.jsx
└── main.jsx
```

---

## ⚙️ Tech

- React 18 + Vite 5
- Zéro dépendances CSS (tout inline, mobile-first)
- PWA-ready (ajouter à l'écran d'accueil)
- Auto-refresh toutes les 60 secondes
- Fallback données statiques si API down
