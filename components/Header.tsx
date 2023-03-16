import { Fontisto, MaterialCommunityIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { View, Text, Pressable, FlatList, StatusBar } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Modal from 'react-native-modal'
import { useDispatch, useSelector } from 'react-redux';

import Colors from '../constants/Colors';
import { width } from '../constants/Metrics';
import { setRefreshing } from '../hooks/action';
import { getStatesAPI } from '../hooks/api';
import { getRefreshing } from '../hooks/selector';

export default function Header() {
  const [isModalVisible, setModalVisible] = useState<boolean>(false);
  const isRefreshing = useSelector(getRefreshing)

  const [states, setStates] = useState<states[]>();
  const [city, setCity] = useState<string>();

  const dispatch = useDispatch()
  const barH = StatusBar.currentHeight || 25;

  useEffect(() => {
    getCity();
  }, [isRefreshing])

  const getStates = () => {
    getStatesAPI().then((res) => {
      setStates(res);
    });
  }

  async function getCity() {
    try {
      const city = await AsyncStorage.getItem('city_name');
      if (city !== null) {
        setCity(city);
      } else {
        setCity('São Paulo');
      }
    } catch (err) {
      console.log(err);
    }
  }

  const renderItem = ({item}: {item: states}) => {
    const setCity = async (city: any) => {
      setModalVisible(false);
      try {
        await AsyncStorage.setItem('city_name', city.name);
        await AsyncStorage.setItem('city_id', city.id);
      } catch (e) {
        console.log(e);
      } finally {
        getCity();
        dispatch(setRefreshing(true))
      }
    }

    return (
      <View style={{ paddingHorizontal: 10 }}>
        <Text style={{ color: Colors.text_gray, fontSize: 14, fontFamily: 'Montserrat_Bold'}}>
          {item.uf} - {item.name}
        </Text>
        <View style={{ marginLeft: 5 }}>
          {item.cities.map((c) => (
            <Pressable onPress={() => setCity(c)} key={c.name}>
              <Text style={{ color: Colors.text, marginTop: 10, fontSize: 14 }}>{c.name}</Text>
            </Pressable>
          ))}
        </View>
      </View>
    )
  }

  return (
    <View style={{ zIndex: 50 }} onLayout={(event) => { const { height } = event.nativeEvent.layout; console.log(height)}}>
    <View
      style={{ width, flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 15, position: 'absolute', top: (barH + 20) }}>
      <View style={{ }}>
        <Text style={{ color: Colors.text_gray, fontSize: 12, fontFamily: 'Montserrat_Semibold'}}>O que vamos assistir hoje?</Text>
        <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }} onPress={() => {setModalVisible(true); getStates();}}>
          <Fontisto name='map-marker-alt' color={Colors.tint} size={14} />
          <Text style={{ fontFamily: 'SF_Pro_Medium', color: Colors.city, fontSize: 16, marginLeft: 5 }}>{city}</Text>
        </TouchableOpacity>
      </View>
      <View style={{ backgroundColor: 'grey', width: 40, height: 40, borderRadius: 10, borderColor: Colors.tint, borderWidth: 1}} />
    </View>

    <Modal isVisible={isModalVisible} onBackdropPress={() => setModalVisible(false)} animationIn='zoomIn' animationOut='fadeOut'>
        <View style={{ height: '80%', width: '90%', backgroundColor: Colors.background, alignSelf: 'center', borderRadius: 10 }}>
          <View style={{ flex: 1, paddingHorizontal: 10, paddingVertical: 20 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center'}}>
              <MaterialCommunityIcons name='map-marker' color={Colors.tint} size={18} />
              <Text style={{ color: Colors.text, fontFamily: 'Montserrat_Bold', fontSize: 16, paddingLeft: 4}}>Selecionar cidade:</Text>
            </View>

            <FlatList 
              data={states}
              keyExtractor={(item) => item.uf}
              renderItem={renderItem}
              ItemSeparatorComponent={() => <View style={{ backgroundColor: Colors.gray1, height: 1, width: '100%', marginVertical: 10}} />}
              style={{ marginTop: 20 }}
            />
          </View>
        </View>
      </Modal>
  </View>
  )
}