import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image, View } from 'react-native';
import TournamentScreen from '../screens/TournamentScreen';
import CafeScreen from '../screens/CafeScreen';
import CartScreen from '../screens/CartScreen';
import localAssets from '../constants/localAssets';
import { useCart } from '../store/CartContext';
import CustomText from '../components/CustomText';

const Tab = createBottomTabNavigator();

const MainTabs = () => {
  const { cartItems } = useCart();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarShowLabel: false,
        tabBarStyle: {
          height: '8.5%',
          paddingTop: '3%',
        },
        tabBarIcon: ({ color, size, focused }) => {
          let iconName = localAssets.bottomTabs.tournament;

          if (route.name === 'Tournaments') {
            iconName = localAssets.bottomTabs.tournament;
          } else if (route.name === 'Cafe') {
            iconName = localAssets.bottomTabs.cafe;
          } else if (route.name === 'Cart') {
            iconName = localAssets.bottomTabs.cart;
          }

          return (
            <View className=" items-center justify-center">
              <Image
                source={iconName}
                className=" h-10 w-10"
                tintColor={focused ? 'black' : 'gray'}
              />
              {route.name === 'Cart' && cartItems?.length > 0 && (
                <View className="absolute bg-red-600 h-6 w-6 p-1 rounded-full items-center justify-center -top-2 -right-3">
                  <CustomText className="text-white text-sm -mt-1">
                    {cartItems.length}
                  </CustomText>
                </View>
              )}
            </View>
          );
        },
        headerShown: false,
      })}
    >
      <Tab.Screen name="Tournaments" component={TournamentScreen} />
      <Tab.Screen name="Cafe" component={CafeScreen} />
      <Tab.Screen name="Cart" component={CartScreen} />
    </Tab.Navigator>
  );
};

export default MainTabs;
