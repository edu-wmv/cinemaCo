import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, Image, LogBox } from 'react-native';
import { FlatGrid } from 'react-native-super-grid';

import { HeaderCity } from './CityHeader';
import Colors from '../constants/Colors';
import { height, width } from '../constants/Metrics';
import { getNow } from '../hooks/api';
import { useDispatch, useSelector } from 'react-redux';
import { getRefreshing } from '../hooks/selector';
import { RefreshControl, TouchableOpacity } from 'react-native-gesture-handler';
import { useRouter } from 'expo-router';
import { setStreamingModalOpen } from '../hooks/action';

const POSTER_WIDTH = (width / 3) - 20;

export default function ModalizeNow() {
  const isRefreshing = useSelector(getRefreshing)

  const router = useRouter();
  const dispatch = useDispatch();

  const [movies, setMovies] = useState<contentScreen[]>([])
  async function fetchData() {
    await getNow(100)
    .then(
      res => setMovies(res)
    )
    .catch(
      err => console.log(err)
    )
  }

  useEffect(() => {
    fetchData();
  }, [isRefreshing])

  const renderItem = useCallback((({item}: {item: contentScreen}) => <MovieItem id={item.id} title={item.title} poster={item.poster}  />), []);
  const MovieItem = ({poster, id, title}: { poster: string, id: string, title: string }) => {

    return (
      <TouchableOpacity style={{ width: POSTER_WIDTH, paddingBottom: 12 }} activeOpacity={.65} onPress={() => {dispatch(setStreamingModalOpen(false)); router.push('movie_info'); router.setParams({ id })}}>
        <Image source={{ uri: poster !== '' || null ? poster : 'https://static.vecteezy.com/system/resources/previews/005/337/799/original/icon-image-not-found-free-vector.jpg' }} style={{ width: '100%', aspectRatio: '2/3', borderRadius: 3 }} />
        <Text style={{ fontFamily: 'Montserrat_Semibold', color: Colors.text_gray_lightest, fontSize: 11}}>{title}</Text>
      </TouchableOpacity>
    )
  }
  

  return (
    <View style={{ height: height * .87}}>
      <View style={{ alignSelf: 'center', alignItems: 'center', paddingVertical: 20}}>
        <Text style={{ fontFamily: 'SF_Pro_Bold', fontSize: 20, color: Colors.text}}>Em cartaz</Text>
        <HeaderCity />
      </View>
      <FlatGrid 
        data={movies}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        itemDimension={POSTER_WIDTH}
        maxItemsPerRow={3}
        itemContainerStyle={{ alignSelf: 'flex-start' }}
        refreshing={isRefreshing}
      />
    </View>
  )
}

LogBox.ignoreLogs(['VirtualizedLists should never be nested inside plain ScrollViews with the same orientation because it can break windowing and other functionality - use another VirtualizedList-backed container instead.'])