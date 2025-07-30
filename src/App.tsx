import { View, Text, StatusBar } from 'react-native';
import React from 'react';
import '../global.css';
import RootNavigator from './navigation/RootNavigator';
import { NavigationContainer } from '@react-navigation/native';
import { CartProvider } from './store/CartContext';

const App = () => {
  return (
    <CartProvider>
      <NavigationContainer>
        <RootNavigator />
        <StatusBar
          translucent
          backgroundColor={'rgba(0,0,0,0)'}
          barStyle="dark-content"
        />
      </NavigationContainer>
    </CartProvider>
  );
};

export default App;
