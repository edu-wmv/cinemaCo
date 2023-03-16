import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, Image, VirtualizedList } from 'react-native';
import { useHeaderHeight } from '@react-navigation/elements'

import { getNow } from '../hooks/api';
import { width } from '../constants/Metrics';
import Colors from '../constants/Colors';
import { HeaderCity } from '../components/CityHeader';

export default function StreamingNow() {
  const [movies, setMovies] = useState<contentScreen[]>([])
  const headerH = useHeaderHeight();

  useEffect(() => {
    async function fetchData() {
      await getNow(100).then(
        res => setMovies(res)
      )
      .catch(err => console.error(err))
    }

    fetchData();
  }, [])


  return (
      <View style={{ paddingTop: headerH, flex: 1, marginHorizontal: 20 }}>
        <ScrollView style={{ marginTop: 20 }} showsVerticalScrollIndicator={false} >
          <View style={{ alignItems: 'flex-start', marginBottom: 20 }}>
            <Text style={{ fontSize: 24, fontWeight: 'bold', color: 'white' }}>
              Em cartaz
            </Text>
            <HeaderCity />
          </View>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between'}}>
            {/* {movies.map(movie => {
              return <MovieItem id={movie.id} title={movie.title} poster={movie.poster} key={movie.id}/>
            })} */}
            
          </View>
        </ScrollView>
    </View>
  )
}

const MovieItem = ({poster, id, title}: { poster: string, id: string, title: string }) => {
  const POSTER_WIDTH = (width / 3) - 20;

  return (
    <View style={{ width: POSTER_WIDTH, paddingBottom: 12 }}>
      <Image source={{ uri: poster }} style={{ width: '100%', aspectRatio: '2/3', borderRadius: 3 }} />
      <Text style={{ fontFamily: 'Montserrat_Semibold', color: Colors.text_gray_lightest, fontSize: 11}}>{title}</Text>
    </View>
  )
}