import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { TouchableOpacity } from 'react-native';

export default function HeaderBackButton() {
  const router = useRouter();

  return (
    <TouchableOpacity onPress={() => router.back()}>
      <MaterialCommunityIcons name='chevron-left' size={24} color='white'/>
    </TouchableOpacity>
  )
}