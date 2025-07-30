# 🏏 OneSport Cafe App

A React Native application that showcases a dynamic café menu with cart functionality — designed for OneSport. Users can browse delicious items, search or filter them, and add/remove items from the cart. Built with NativeWind, Context API, and clean reusable components.

---

## ✨ Features

- 🧾 Beautiful menu UI with images, names, descriptions, and pricing
- 🔍 Search bar & filter button at the top
- 🛒 Cart management using React Context API
- 📦 Add/Remove items from the cart with quantity control
- 📱 Responsive design with `NativeWind` (Tailwind CSS for React Native)
- 🔁 Reusable components like `MenuCard`, `CircleCheckbox`, `CartItem`
- 📦 FlatList layout with two-column card grid

---

## 🧩 Tech Stack

- **React Native**
- **TypeScript**
- **NativeWind**
- **React Navigation**
- **Context API** (for Cart)
- **Custom Components** (`CustomText`, `MenuCard`, etc.)

---

## 📦 Installation

```bash
git clone https://github.com/dharmendra841434/OneSportAssignment.git
cd OneSportAssignment

# Install dependencies
npm install
# or
yarn install

# Run the app
npx react-native run-android
# or for iOS
npx react-native run-ios



src/
│
├── assets/               # Local images or icons
├── components/           # Reusable UI components (MenuCard, CustomText, etc.)
├── store/                # Cart context
├── data/                 # Static JSON data (menu items, tournaments)
├── screens/              # App screens (Home, Cart, etc.)
├── navigation/           # React Navigation setup
└── App.tsx               # Entry point


## 🎬 Quick Preview

![App Preview](assets/demo.gif)
