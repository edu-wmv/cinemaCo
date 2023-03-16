import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Image, FlatList } from 'react-native';
import Colors from '../constants/Colors';
import { getOscar } from '../hooks/api';

export default function OscarPlaying({refresh}: { refresh: boolean }) {
  const [movies, setMovies] = useState<contentScreen[]>([]);
  const router = useRouter();

  useEffect(() => {
    async function fetchData() {
      await getOscar().then(
        res => setMovies(res)
      )
    }

    fetchData();
  }, [refresh]);

  const renderItem = ({ item }: {item: contentScreen, index: number }) => { 
    return (
      <TouchableOpacity style={{ marginRight: 10, width: 120 }} activeOpacity={.65} onPress={() => {router.push('/movie_info'); router.setParams({ id: item.id })}}>
        <Image source={{ uri: item.poster  || 'https://img.freepik.com/free-vector/digital-technology-background-with-abstract-wave-border_53876-117508.jpg' }} style={{ width: 120, aspectRatio: '2/3', borderRadius: 5 }} />
        {item.poster === '' && <Text style={{ position: 'absolute', top: '40%', fontFamily: 'Montserrat_Semibold', textAlign: 'center', fontSize: 10, width: '100%', paddingHorizontal: 4 }}>{item.title}</Text>}
      </TouchableOpacity>
    )
  }

  return (
    <View style={{ marginTop: 25 }}>
      <View style={{ flexDirection: 'row', alignItems: 'baseline', justifyContent: 'space-between', marginHorizontal: 10, marginBottom: 5 }}>
        <Text style={{ fontFamily: 'Montserrat_Bold', fontSize: 20, color: Colors.text, textTransform: 'uppercase' }}>oscar 2023</Text>
        <Text style={{ fontFamily: 'Montserrat_Semibold', fontSize: 11, color: Colors.text_gray_light, textDecorationLine: 'underline' }}>ver mais</Text>
      </View>
      <FlatList 
        data={movies}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        horizontal={true}
        contentContainerStyle={{ marginLeft: 10, paddingRight: 10 }}
        showsHorizontalScrollIndicator={false}
        // snapToInterval={120 + 10}
        // snapToAlignment={'start'}
        decelerationRate={'fast'}
        bounces={false}
      />
    </View>
  )
}