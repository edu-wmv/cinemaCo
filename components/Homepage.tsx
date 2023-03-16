import React, { useCallback, useEffect, useRef, useState } from 'react';
import { View, Animated, RefreshControl, FlatList, StatusBar } from 'react-native';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs'
import { LinearGradient } from 'expo-linear-gradient';
import { useHeaderHeight } from '@react-navigation/elements'
import { useSelector, useDispatch } from 'react-redux';
import { Portal } from 'react-native-portalize';
import { Modalize, useModalize } from 'react-native-modalize'

import Colors from '../constants/Colors';
import { height, width } from '../constants/Metrics';
import TopMovie from './TopMovieCar';
import NowPlaying from './NowPlaying';
import OscarPlaying from './OscarPlaying';
import ComingSoon from './ComingSoon';
import { getRefreshing, getSoonModalOpen, getStreamingModalOpen } from '../hooks/selector';
import { setRefreshing, setSoonModalOpen, setStreamingModalOpen } from '../hooks/action';
import ModalizeNow from './ModalizeNow';
import Header from './Header';
import ModalizeSoon from './ModalizeSoon';

export default function Homepage() {
  const { ref } = useModalize();
  const soonModalRef = useRef<Modalize>(null);

  const animatedValue = useRef<Animated.Value>(new Animated.Value(0)).current;

  const refreshing = useSelector(getRefreshing);
  const isStreamingNowModalOpen = useSelector(getStreamingModalOpen);
  const isSoonModalOpen = useSelector(getSoonModalOpen);
  const dispatch = useDispatch();

  const tabBarH = useBottomTabBarHeight();
  const headerH = useHeaderHeight();
  const barH = StatusBar.currentHeight || 25;

  useEffect(() => {
    isSoonModalOpen === true && soonModalRef.current?.open();
    isStreamingNowModalOpen === true && ref.current?.open();
  }, [isStreamingNowModalOpen, isSoonModalOpen])

  console.log(isSoonModalOpen);

  const onRefresh = useCallback(() => {
    dispatch(setRefreshing(true));
  }, [])

  const translateY = animatedValue.interpolate({
    inputRange: [0, (headerH + 10)],
    outputRange: [-(headerH + 10), 0],
    extrapolate: 'clamp',
  })

  const opacity = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0],
    extrapolate: 'clamp',
  })

  return (
    <View>
      <LinearGradient 
        colors={[Colors.top_gradient, Colors.background]}
        style={{
          position: 'absolute',
          top: 0,
          width,
          height: height * .7 
        }}
        pointerEvents='none'
      />
      <Animated.View 
        style={{ 
          width, 
          height: (headerH + 15), 
          position: 'absolute', 
          zIndex: 5, 
          top: 0, 
          transform: [{ translateY: translateY }],
          opacity: .996
        }}
        pointerEvents='none'
      >
        {/* <LinearGradient 
        colors={[Colors.background, 'transparent']} 
        style={{ width: '100%', height: '100%' }}
        locations={[0.45, 1]}
        pointerEvents={'none'}
        /> */}
        <View style={{ width: '100%', height: headerH + 15, backgroundColor: Colors.top_gradient, borderBottomLeftRadius: 5, borderBottomRightRadius: 5 }} pointerEvents='none' />
      </Animated.View>
      <Header />
      <Animated.ScrollView 
        onScroll={e => {
        const offsetY = e.nativeEvent.contentOffset.y;
        animatedValue.setValue(offsetY);
        }}
        scrollEventThrottle={16}
        style={{ paddingTop: headerH + barH }}
        showsVerticalScrollIndicator={false}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      >
        <View style={{ flex: 1, marginTop: 0, marginBottom: (tabBarH + 50 + headerH) }}>
          <TopMovie />
          <NowPlaying refresh={refreshing} />
          <ComingSoon refresh={refreshing} />
          <Portal>
            <Modalize 
              ref={ref} 
              onClosed={() => dispatch(setStreamingModalOpen(false))} 
              adjustToContentHeight={true} 
              modalStyle={{ backgroundColor: Colors.background, borderTopLeftRadius: 40, borderTopRightRadius: 40 }}
              disableScrollIfPossible
            >
              <ModalizeNow /> 
            </Modalize>
            <Modalize
              ref={soonModalRef} 
              onClosed={() => dispatch(setSoonModalOpen(false))} 
              adjustToContentHeight={true} 
              modalStyle={{ backgroundColor: Colors.background, borderTopLeftRadius: 40, borderTopRightRadius: 40 }}
              disableScrollIfPossible
            >
              <ModalizeSoon />
            </Modalize>
          </Portal>
        </View>
      </Animated.ScrollView>
    </View>
  )
}