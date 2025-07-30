import React from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import CustomText from '../components/CustomText';
import { useNavigation } from '@react-navigation/native';
import { useCart } from '../store/CartContext';

const CartScreen = () => {
  const { cartItems, removeFromCart, clearCart, updateQuantity } = useCart();
  const navigation = useNavigation();

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  const handleClearCart = () => {
    Alert.alert('Clear Cart', 'Are you sure you want to remove all items?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Clear', onPress: () => clearCart(), style: 'destructive' },
    ]);
  };

  const renderItem = ({ item }: any) => (
    <View
      style={{ elevation: 1 }}
      className="flex-row items-center border border-gray-200 bg-white rounded-xl p-4 shadow-sm m-2"
    >
      <Image
        source={{ uri: item.image }}
        className="w-16 h-16 rounded-lg mr-3"
        resizeMode="cover"
      />
      <View className="flex-1">
        <CustomText font="medium" className="text-base text-black">
          {item.name}
        </CustomText>
        <CustomText className="text-sm text-gray-600">
          ₹{item.price.toFixed(2)} × {item.quantity}
        </CustomText>

        {/* Quantity Controls */}
        <View className="flex-row items-center mt-1">
          <TouchableOpacity
            onPress={() => updateQuantity(item.id, item.quantity - 1)}
            className="bg-gray-300 w-7 h-7 rounded-full items-center justify-center"
          >
            <CustomText className="text-gray-900 font-bold">−</CustomText>
          </TouchableOpacity>

          <CustomText className="mx-3 text-black">{item.quantity}</CustomText>

          <TouchableOpacity
            onPress={() => updateQuantity(item.id, item.quantity + 1)}
            className="bg-gray-300 w-7 h-7 rounded-full items-center justify-center"
          >
            <CustomText className="text-gray-900 font-bold">+</CustomText>
          </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity
        onPress={() => removeFromCart(item.id)}
        className="bg-red-500 px-3 py-1 rounded-md"
      >
        <CustomText className="text-white text-xs">Remove</CustomText>
      </TouchableOpacity>
    </View>
  );

  return (
    <View className="flex-1 bg-gray-100 mt-10">
      <View className=" items-center pb-3">
        <CustomText font="bold" className=" text-xl">
          Cart Items
        </CustomText>
      </View>
      <FlatList
        data={cartItems}
        keyExtractor={item => item.id.toString()}
        renderItem={renderItem}
        ListEmptyComponent={
          <View className="flex-1 justify-center items-center mt-10">
            <CustomText className="text-gray-500">
              Your cart is empty
            </CustomText>
          </View>
        }
      />

      {cartItems.length > 0 && (
        <View className="p-4 border-t border-gray-200 bg-white">
          <View className="flex-row justify-between mb-3">
            <CustomText font="bold" className="text-lg text-black">
              Total
            </CustomText>
            <CustomText font="bold" className="text-lg text-black">
              ₹{total.toFixed(2)}
            </CustomText>
          </View>

          <View className="flex-row justify-between">
            <TouchableOpacity
              onPress={handleClearCart}
              className="bg-red-600 px-5 py-3 rounded-xl"
            >
              <CustomText className="text-white text-sm">Clear Cart</CustomText>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                // Placeholder — you can navigate to payment screen
                Alert.alert('Checkout', 'Proceeding to payment...');
              }}
              className="bg-green-600 px-6 py-3 rounded-xl"
            >
              <CustomText className="text-white text-sm">Checkout</CustomText>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
};

export default CartScreen;
