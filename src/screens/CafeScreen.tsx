import React, { useState, useEffect } from 'react';
import {
  FlatList,
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
} from 'react-native';
import MenuCard from '../components/MenuCard';
import menuData from '../data/cafeMenu.json';
import localAssets from '../constants/localAssets';
import CustomText from '../components/CustomText';

type MenuItem = {
  id: number;
  name: string;
  price: number;
  image: string;
  description: string;
};

const CafeScreen = () => {
  const [search, setSearch] = useState('');
  const [filteredData, setFilteredData] = useState<MenuItem[]>(menuData);
  useEffect(() => {
    if (search === '') {
      setFilteredData(menuData);
    } else {
      setFilteredData(
        menuData.filter(item =>
          item.name.toLowerCase().includes(search.toLowerCase()),
        ),
      );
    }
  }, [search]);

  return (
    <View className="flex-1 bg-gray-100 px-3 pt-10">
      <View className=" flex flex-row gap-x-2  ">
        <Image
          source={localAssets.common.cafe}
          className=" h-24 w-24"
          resizeMode="cover"
        />
        <View className=" w-[75%]">
          <CustomText font="bold" className="text-xl">
            OneSport Cafe
          </CustomText>
          <CustomText className="text-gray-600 text-sm mt-1 w-[75%]">
            Your go-to spot for energizing drinks and sporty snacks. Perfect for
            athletes, fans, and foodies alike.
          </CustomText>
        </View>
      </View>
      <View className=" flex-row border my-3 border-gray-200 items-center bg-white rounded-xl px-3 py-0.5 mr-2">
        <Image
          source={localAssets.common.search}
          className="w-4 h-4 mr-2"
          resizeMode="contain"
        />
        <TextInput
          placeholder="Search your favorite cafe treat"
          value={search}
          onChangeText={setSearch}
          className="flex-1 text-black"
          placeholderTextColor="#999"
        />
      </View>

      <FlatList
        data={filteredData}
        keyExtractor={item => item.id.toString()}
        numColumns={2}
        renderItem={({ item }) => <MenuCard item={item} />}
        contentContainerStyle={{ paddingBottom: 8 }}
        columnWrapperStyle={{ justifyContent: 'space-between' }}
      />
    </View>
  );
};

export default CafeScreen;
