import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import tournamentsData from '../data/tournaments.json';
import localAssets from '../constants/localAssets';
import CustomText from '../components/CustomText';
import CustomBottomSheet from '../components/CustomBottomSheet';
import CircleCheckbox from '../components/CircleCheckbox';
import { availableFilter } from '../constants/data';

type Tournament = {
  id: number;
  name: string;
  sport: string;
  location: string;
  startDate: string;
  endDate: string;
};

const TournamentScreen: React.FC = () => {
  const [search, setSearch] = useState<string>('');
  const [tournaments, setTournaments] = useState<Tournament[]>([]);
  const [filtered, setFiltered] = useState<Tournament[]>([]);
  const [isOpenFilterModal, setIsOpenFilterModal] = useState(false);
  const [appliedFilter, setAppliedFilter] = useState<string>('');

  useEffect(() => {
    setTournaments(tournamentsData);
    setFiltered(tournamentsData);
  }, []);

  const handleSearch = (text: string) => {
    setSearch(text);
    if (text.trim() === '') {
      setFiltered(tournaments);
    } else {
      const results = tournaments.filter(
        item =>
          item.name.toLowerCase().includes(text.toLowerCase()) ||
          item.sport.toLowerCase().includes(text.toLowerCase()) ||
          item.location.toLowerCase().includes(text.toLowerCase()),
      );
      setFiltered(results);
    }
  };

  const handleFilter = () => {
    setIsOpenFilterModal(true);
  };

  const handleFilterApply = (option: string) => {
    const results = tournaments.filter(item =>
      item.sport.toLowerCase().includes(option.toLowerCase()),
    );
    setAppliedFilter(option);
    setIsOpenFilterModal(false);
    setFiltered(results);
  };

  const handleClearFilter = () => {
    setAppliedFilter('');
    setFiltered(tournamentsData);
    setIsOpenFilterModal(false);
  };

  const renderItem = ({ item }: { item: Tournament }) => (
    <View
      style={{ elevation: 1 }}
      className="bg-gray-100 p-4 mb-3 overflow-hidden rounded-xl border border-gray-200"
    >
      <View className=" bg-green-500/80 h-32 w-2 absolute " />
      <View className=" flex flex-row items-end justify-between">
        <View>
          <CustomText font="medium" className="text-lg  text-gray-800">
            {item.name}
          </CustomText>
          <CustomText className="text-sm text-gray-600">
            Sport : {item.sport}
          </CustomText>
          <CustomText className="text-sm text-gray-500">
            Location : {item.location}
          </CustomText>
          <CustomText className="text-sm text-gray-400">
            {item.startDate} → {item.endDate}
          </CustomText>
        </View>
        <View>
          <Image
            className=" h-16 w-16"
            tintColor={
              item?.sport?.toLowerCase() === 'cricket' ? '#094ebd' : '#fa6167'
            }
            source={
              item?.sport?.toLowerCase() === 'cricket'
                ? localAssets.common.cricket
                : localAssets.common.football
            }
            resizeMode="contain"
          />
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-white px-4">
      {/* Search & Filter */}
      <View className="flex-row items-center mt-4 mb-2">
        <View className="flex-1 flex-row items-center bg-gray-100 rounded-xl px-3 py-0.5 mr-2">
          <Image
            source={localAssets.common.search}
            className="w-4 h-4 mr-2"
            resizeMode="contain"
          />
          <TextInput
            placeholder="Search tournament"
            value={search}
            onChangeText={handleSearch}
            className="flex-1 text-black"
            placeholderTextColor="#999"
          />
        </View>

        <TouchableOpacity
          activeOpacity={0.7}
          onPress={handleFilter}
          className="p-3 bg-gray-200 rounded-xl"
        >
          <Image
            source={localAssets.common.filter}
            className="w-5 h-5"
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>

      <CustomBottomSheet
        isVisible={isOpenFilterModal}
        sheetHeight={180}
        onClose={() => setIsOpenFilterModal(false)}
        renderContent={() => (
          <View className=" items-center pt-3 px-3 ">
            <View className=" h-1 bg-gray-300 w-20 rounded-xl" />
            <View className=" w-full pt-6 px-5">
              {availableFilter?.map(item => (
                <TouchableOpacity
                  activeOpacity={0.6}
                  onPress={() => handleFilterApply(item)}
                  className=" flex flex-row gap-x-3 border-b border-b-gray-200 py-3"
                >
                  <CircleCheckbox
                    checked={appliedFilter === item}
                    onToggle={() => {}}
                    color="green-600"
                    size={18}
                  />
                  <CustomText>{item}</CustomText>
                </TouchableOpacity>
              ))}
            </View>
            <TouchableOpacity
              onPress={handleClearFilter}
              className=" bg-red-400 px-16 py-2 mt-6 rounded-lg "
            >
              <CustomText className=" text-white">Clear Filter</CustomText>
            </TouchableOpacity>
          </View>
        )}
      />

      {/* Tournament List */}
      <FlatList
        data={filtered}
        keyExtractor={item => item.id.toString()}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </SafeAreaView>
  );
};

export default TournamentScreen;
