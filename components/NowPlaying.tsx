import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Image, FlatList } from 'react-native';
import { useDispatch } from 'react-redux';
import Colors from '../constants/Colors';
import { POSTER_SIZE, width } from '../constants/Metrics';
import { setRefreshing, setStreamingModalOpen } from '../hooks/action';
import { getNow } from '../hooks/api';

export default function NowPlaying({refresh}: {refresh: boolean}) {
  const [movies, setMovies] = useState<contentScreen[]>([]);
  const router = useRouter();
  const dispatch = useDispatch();

  function setAction() {
    dispatch(setStreamingModalOpen(true))
  }

  useEffect(() => {
    async function fetchData() {
      await getNow(15).then(
        res => setMovies(res)
      )
    }

    fetchData().finally(
      () => dispatch(setRefreshing(false))
    )
  }, [refresh]);

  const renderItem = ({ item }: {item: contentScreen, index: number }) => { 
    return (
      <TouchableOpacity style={{ marginRight: 10, width: POSTER_SIZE }} activeOpacity={.65} onPress={() => {router.push('/movie_info'); router.setParams({ id: item.id })}} onLongPress={() => null}>
        <Image source={{ uri: item.poster }} style={{ width: '100%', aspectRatio: '2/3', borderRadius: 5 }} />
        {item.poster === '' && <Text style={{ position: 'absolute', top: '40%', fontFamily: 'Montserrat_Semibold', textAlign: 'center', fontSize: 10, width: '100%', paddingHorizontal: 4 }}>{item.title}</Text>}
      </TouchableOpacity>
    )
  }

  return (
    <View style={{ marginTop: 20 }}>
      <View style={{ flexDirection: 'row', alignItems: 'baseline', justifyContent: 'space-between', marginHorizontal: 10, marginBottom: 10 }}>
        <Text style={{ fontFamily: 'SF_Pro_Bold', fontSize: 20, color: Colors.text }}>Em Cartaz</Text>
        <TouchableOpacity onPress={() => setAction()}>
          <Text style={{ fontFamily: 'SF_Pro_Bold', fontSize: 11, color: Colors.tint }}>Ver Mais</Text>
        </TouchableOpacity>
      </View>
      <FlatList 
        data={movies}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        horizontal={true}
        contentContainerStyle={{ marginLeft: 10, paddingRight: 10 }}
        showsHorizontalScrollIndicator={false}
        snapToInterval={POSTER_SIZE + 10}
        snapToAlignment={'start'}
        decelerationRate={'fast'}
        ListEmptyComponent={EmptyItem}
      />
    </View>
  )
}

const EmptyItem = () => {
  return (
    <View style={{ width: width - 20, height: 100, borderRadius: 5, alignItems: 'center', justifyContent: 'center'}}>
      <Text style={{ color: Colors.text_gray, fontFamily: 'Montserrat_Regular'}}>Não há filmes em cartaz na sua cidade :/</Text>
    </View>
  )
}