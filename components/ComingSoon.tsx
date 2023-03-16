import { Entypo } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Image, FlatList } from 'react-native';
import { useDispatch } from 'react-redux';
import Colors from '../constants/Colors';
import { height, width } from '../constants/Metrics';
import { setSoonModalOpen } from '../hooks/action';
import { getComingSoon } from '../hooks/api';
import ContentRating from './ContentRating';

export default function ComingSoon({refresh}: { refresh: boolean }) {
  const [movies, setMovies] = useState<contentScreen[]>([]);

  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    async function fetchData() {
      await getComingSoon().then(
        res => setMovies(res.slice(0, 3))
      )
    }

    fetchData();
  }, [refresh]);

  const renderItem = ({ item }: {item: contentScreen, index: number }) => { 
    return (
      <TouchableOpacity style={{ width: '100%', alignSelf: 'center' }} activeOpacity={.65} onPress={() => {router.push('/movie_info'); router.setParams({ id: item.id })}}>
        <View style={{ backgroundColor: Colors.box, paddingHorizontal: 10, paddingVertical: 10, marginBottom: 15, borderRadius: 10, flexDirection: 'row', width: '100%' }}>
          <Image source={{ uri: item.poster  || 'https://img.freepik.com/free-vector/digital-technology-background-with-abstract-wave-border_53876-117508.jpg' }} style={{ height: height * .12, aspectRatio: '2/3', borderRadius: 5 }} />
          <View style={{ paddingLeft: 10, flex: 1, marginRight: 20}}>
            <View style={{ flexDirection: 'row', alignItems: 'flex-start', columnGap: 5, width: '100%', flexWrap: 'wrap', paddingTop: 10 }}>
              <Text style={{ fontFamily: 'SF_Pro_Semibold', color: Colors.text, fontSize: 14, lineHeight: 14 }}>{item.title}</Text>
              <View>
                {item.contentRating !== undefined ? <ContentRating rate={item.contentRating}/> : null }
              </View>
            </View>
            <View style={{ paddingTop: 5 }}>
              {item.director && <Text style={{ color: Colors.text_gray, fontFamily: 'SF_Pro_Regular', fontSize: 12, lineHeight: 12}}>{item.director}</Text>}
            </View>
            <View style={{ flexDirection: 'row', position: 'absolute', bottom: 2, marginHorizontal: 10 }}>
              <Text style={{ fontFamily: 'SF_Pro_Regular', fontSize: 12, lineHeight: 12, color: Colors.text_gray_dark}}>{item.premiereDate?.dayAndMonth}  ·  {item.duration} min</Text>
            </View>
          </View>
          <TouchableOpacity style={{ position: 'absolute', bottom: 10, right: 15}}>
            <Entypo name='plus' size={22} color={Colors.tint_light} />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    )
  }

  const renderTest = ({ item }: {item: contentScreen}) => {
    return (
      <TouchableOpacity style={{ width: (width-20)/3 - 2.5, backgroundColor: Colors.box, marginRight: 5, borderRadius: 4}} activeOpacity={.65}>
        <Image source={{ uri: item.poster }} style={{ aspectRatio: '2/3', marginHorizontal: 10, marginTop: 5, borderRadius: 5 }} />
        <View style={{ flex: 1, marginHorizontal: 10, marginTop: 5 }}>
          <Text style={{ fontFamily: 'Montserrat_Semibold', fontSize: 12, color: Colors.text, textAlign: 'center'}}>{item.title}</Text>
          <View style={{ alignItems: 'center', marginTop: 15, paddingBottom: 15 }}>
            {item.contentRating !== undefined ? <ContentRating rate={item.contentRating} /> : null}
          </View>
        </View> 
      </TouchableOpacity>
    )
  }

  return (
    <View style={{ marginTop: 25 }}>
      <View style={{ flexDirection: 'row', alignItems: 'baseline', justifyContent: 'space-between', marginHorizontal: 10, marginBottom: 5 }}>
        <Text style={{ fontFamily: 'SF_Pro_Bold', fontSize: 20, color: Colors.text }}>Em Breve</Text>
        <TouchableOpacity onPress={() => dispatch(setSoonModalOpen(true))} activeOpacity={.65}>
          <Text style={{ fontFamily: 'SF_Pro_Bold', fontSize: 11, color: Colors.tint,}}>Ver Mais</Text>
        </TouchableOpacity>
      </View>
      <FlatList 
        data={movies}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        horizontal={false}
        contentContainerStyle={{marginLeft: 10,  paddingRight: 10 }}
        showsHorizontalScrollIndicator={false}
        decelerationRate={'fast'}
        bounces={false}
      />
    </View>
  )
}