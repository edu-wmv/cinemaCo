import React from 'react';
import { View } from 'react-native'

import Colors from '../constants/Colors';

export default function ProfileAvatarHeader() {
  return (
    <View style={{ backgroundColor: 'grey', width: 40, height: 40, borderRadius: 20, borderColor: Colors.tint, borderWidth: 1}} />
  )
}