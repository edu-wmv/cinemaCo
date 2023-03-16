import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { View, Image, Text, TouchableOpacity } from 'react-native';

import Colors from '../constants/Colors';
import { width } from '../constants/Metrics';
import { getCarousel } from '../hooks/api';
import ContentRating from './ContentRating';

export default function TopMovie() {
  const [movie, setMovie] = useState({} as topMovie);
  const router = useRouter();

  useEffect(() => {
    async function fetchData() {
      await getCarousel().then(
        res => setMovie(res)
      ).catch(err => 
        console.log(err)
      )      
    }

    fetchData();
  }, [])

  return (
    <View style={{ width: (width - 20), alignSelf: 'center' }}>
    <TouchableOpacity activeOpacity={.75} onPress={() => {router.push('/movie_info'); router.setParams({id: movie.id})}}>
      <Image source={{ uri: movie.poster }} style={{ aspectRatio: '1.85/1', borderRadius: 5, borderWidth: 2, borderColor: Colors.gray1 }}/>
      <View style={{ position: 'absolute', bottom: 10, width: '100%', alignItems: 'center' }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          {movie.contentRating && <ContentRating rate={movie.contentRating}/>}
          <View style={{ height: 4, width: 4, borderRadius: 2, backgroundColor: Colors.white, marginHorizontal: 5}} /> 
          <Text style={{ color: Colors.white, fontFamily: 'Montserrat_Bold', fontSize: 12}}>{movie.duration}</Text>
        </View>
        <Text style={{ color: Colors.white, fontFamily: 'Futura_Bold', fontSize: 35, textTransform: 'uppercase', textAlign: 'center' }}>{movie?.title}</Text>
      </View>
    </TouchableOpacity>
    </View>
  );
}