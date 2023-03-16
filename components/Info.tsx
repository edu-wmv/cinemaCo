import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect, useState } from 'react';
import { View, Text, Image } from 'react-native';
import { useHeaderHeight } from '@react-navigation/elements'

import Colors from '../constants/Colors';
import { height, width } from '../constants/Metrics';
import { getMovieData, getSessionData } from '../hooks/api';
import ContentRating from './ContentRating';
import RottenTomatoe from './RottenTomatoe';

export default function MovieInfo({id}: {id: any}) {
  const [movieData, setMovieData] = useState<movieData>({} as movieData);

  const headerH = useHeaderHeight();
    
  useEffect(() => {
    async function fetch() {
      await getMovieData(id).then(
        res => setMovieData(res)
      )
    }
    
    fetch();
  }, [movieData])

  const Separator = () => <View style={{ width: .75, height: 16, borderRadius: 10, backgroundColor: 'white', marginHorizontal: 10}} />
  const BACKDROP_SIZE = height * .6;

  return (
      <View>
        <Image source={{ uri: movieData.posterH !== '' ? movieData.posterH : 'https://images.unsplash.com/photo-1595769816263-9b910be24d5f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OXx8Y2luZW1hfGVufDB8fDB8fA%3D%3D&w=1000&q=80'}} style={{ width, height: BACKDROP_SIZE, position: 'absolute', top: 0}} blurRadius={5} /> 
        <View style={{ paddingTop: headerH }}>
          <View 
            style={{ alignItems: 'center', justifyContent: 'center', zIndex: 5, /*transform:[{ translateY: BACKDROP_SIZE - viewH }] */}}
            onLayout={(event) => { const { height } = event.nativeEvent.layout;}}
          >
            <View style={{ marginBottom: 10 }}>
              <Image source={{ uri: movieData.posterP }} style={{ height: 200, aspectRatio: '2/3', borderRadius: 7}} />
            </View>
            <View style={{ marginHorizontal: 30 }}>
              {movieData.rottenTomatoe !== undefined ? <RottenTomatoe tomatoes={movieData.rottenTomatoe} /> : null}
              <Text style={{ color: Colors.text, fontFamily: 'Montserrat_Bold', fontSize: 30, textAlign: 'center' }}>{movieData.title}</Text>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
              {movieData.contentRating && <ContentRating rate={movieData.contentRating}/>}
              <Separator />
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <MaterialCommunityIcons name='clock-time-four' size={14} color={Colors.text} />
                <Text style={{ fontFamily: 'Montserrat_Semibold', fontSize: 11, color: Colors.text, paddingLeft: 5 }}>{movieData.duration} min.</Text>
              </View>
              <Separator />
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <MaterialCommunityIcons name='video-vintage' size={14} color={Colors.text} />
                {movieData.genres && <Text style={{ fontFamily: 'Montserrat_Semibold', fontSize: 11, color: Colors.text, paddingLeft: 5 }}>{movieData.genres.map(x => x).join(', ')}</Text>}
              </View>
            </View>
          </View>
          <View style={{ position: 'absolute', zIndex: 1 }}>
            <LinearGradient colors={['transparent', Colors.background]} style={{ width, height: BACKDROP_SIZE}} />
          </View>
        </View>
      </View>
  )
}