import React from 'react';
import { View, Text, Image, TouchableOpacity, Dimensions } from 'react-native';
import CustomText from './CustomText';
import { useCart } from '../store/CartContext';

type MenuItem = {
  id: number;
  name: string;
  price: number;
  image: string;
  description: string;
};

type Props = {
  item: MenuItem;
};

const MenuCard: React.FC<Props> = ({ item }) => {
  const { addToCart, removeFromCart, isInCart } = useCart();
  const inCart = isInCart(item.id);
  return (
    <View
      style={{ elevation: 1 }}
      className="bg-white border border-gray-200 rounded-2xl shadow-sm p-4 flex-1 m-1"
    >
      <Image
        source={{ uri: item.image }}
        className="w-full h-28 rounded-xl mb-3"
        resizeMode="cover"
      />
      <CustomText font="medium" className="text-base text-black mb-1">
        {item.name}
      </CustomText>
      <CustomText
        ellipsizeMode="tail"
        numberOfLines={2}
        className="text-xs text-gray-500 mb-2"
      >
        {item.description}
      </CustomText>
      <CustomText font="bold" className="text-black mb-2">
        ₹{Number(item.price).toFixed(2)}
      </CustomText>
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => (inCart ? removeFromCart(item.id) : addToCart(item))}
        className={`py-2 rounded-xl ${inCart ? 'bg-red-500' : 'bg-green-600'}`}
      >
        <CustomText className="text-white text-center text-sm">
          {inCart ? 'Remove' : 'Add'}
        </CustomText>
      </TouchableOpacity>
    </View>
  );
};

export default MenuCard;
