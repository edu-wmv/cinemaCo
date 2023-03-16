import { useSearchParams } from 'expo-router';
import React from 'react';
import { View } from 'react-native'
import MovieInfo from '../components/Info';

export default function MovieInfoScreen() {
  const params = useSearchParams();
  const { id } = params;

  return (
    <View style={{ flex: 1 }}>
      <MovieInfo id={id} />
    </View>
  )
}