import React, { useCallback, useEffect, useRef, useState } from 'react';
import { View, Animated, RefreshControl, Text, StatusBar, FlatList } from 'react-native';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs'
import { LinearGradient } from 'expo-linear-gradient';
import { useHeaderHeight } from '@react-navigation/elements'

import Colors from '../constants/Colors';
import { width } from '../constants/Metrics';
import CinemasHeader from './CinemaHeader';
import { Fontisto, SimpleLineIcons } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import { setRefreshing } from '../hooks/action';
import { getRefreshing } from '../hooks/selector';
import { getCinemas } from '../hooks/api';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function Homepage() {
  const [cinemas, setCinemas] = useState<cinemas[]>([])

  const animatedValue = useRef<Animated.Value>(new Animated.Value(0)).current;
  const isRefreshing = useSelector(getRefreshing)

  const [viewH, setViewH] = useState<number>(50);

  const tabBarH = useBottomTabBarHeight();
  const headerH = useHeaderHeight();
  const barH = StatusBar.currentHeight || 25;

  const dispatch = useDispatch()

  const onRefresh = useCallback(() => {
    dispatch(setRefreshing(true))
  }, [])

  useEffect(() => {
    async function fetchData() {
      await getCinemas()
      .then(
        res => setCinemas(res)
      )
      .catch(
        err => console.log(err)
      )
    }

    fetchData();
  }, [isRefreshing])


  const renderItem = useCallback((({item}: {item: cinemas}) => <CinemaItem id={item.id} name={item.name} address={item.address} />) ,[])

  return (
    <View>
      <CinemasHeader />
      <Animated.ScrollView 
        onScroll={e => {
        const offsetY = e.nativeEvent.contentOffset.y;
        animatedValue.setValue(offsetY);
        }}
        scrollEventThrottle={16}
        style={{ paddingTop: ( headerH + barH + 15)}}
        showsVerticalScrollIndicator={false}
        refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />}
      >
        <View style={{ flex: 1, marginTop: 10, marginBottom: (tabBarH + headerH + 60), marginHorizontal: 20}}>
          <View>
            <View style={{ flexDirection: 'row', alignItems: 'center', columnGap: 8 }}>
              <SimpleLineIcons name="star" size={20} color={Colors.tint} />
              <Text style={{ color: Colors.text, fontSize: 24, fontFamily: 'Montserrat_Bold'}}>Favoritos</Text>
            </View>
            <View style={{ height: 80 }} />
          </View>
          <View>
            <Text style={{ color: Colors.text, fontSize: 24, fontFamily: 'Montserrat_Bold', marginBottom: 10}}>Todos</Text>
            <FlatList 
              data={cinemas}
              keyExtractor={(item) => item.id}
              renderItem={renderItem}
            />
          </View>
        </View>
      </Animated.ScrollView>
    </View>
  )
}

const CinemaItem = (props: cinemas) => {
  return (
    <TouchableOpacity 
      activeOpacity={.5}
      style={{ 
        flexDirection: 'row', 
        alignItems: 'center', 
        justifyContent: 'space-between', 
        backgroundColor: Colors.box, 
        paddingHorizontal: 15, 
        paddingVertical: 20, 
        borderRadius: 10,
        marginBottom: 15
      }}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Fontisto name='map-marker-alt' color={Colors.tint} size={22} />
        <View style={{ paddingLeft: 10, width: '85%'}}>
          <Text style={{ color: Colors.text, fontFamily: 'Montserrat_Bold', fontSize: 14}}>{props.name}</Text>
          <Text style={{ color: Colors.text_gray, fontFamily: 'Montserrat_Medium', fontSize: 12}}>{props.address}</Text>
        </View>
      </View>
      <TouchableOpacity activeOpacity={.65}>
        <SimpleLineIcons name="star" size={20} color={Colors.tint} />
      </TouchableOpacity>
    </TouchableOpacity>
  )
}