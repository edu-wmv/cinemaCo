import React from 'react';
import { View, Text, Image } from 'react-native';
import Colors from '../constants/Colors';

export default function RottenTomatoe({tomatoes}: {tomatoes: rottenTomatoe}) {
  const criticsRating: any = {
    'Certified': require('../assets/images/certified.png'),
    'Rotten': require('../assets/images/tomato-rotten.png'),
    'Fresh': require('../assets/images/tomato-fresh.png'),
    '': require('../assets/images/tomato-empty.png'),
  }

  const audienceRating: any = {
    'Upright': require('../assets/images/aud-fresh.png'),
    'Spilled': require('../assets/images/aud-rotten.png'),
    '': require('../assets/images/aud-empty.png'),
  }

  return (
    tomatoes !== null || undefined ?
    <View style={{ flexDirection: 'row', justifyContent: 'center', columnGap: 12 }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', columnGap: 4 }}>
        <Image source={criticsRating[tomatoes.criticsRating]} style={{ width: 22, aspectRatio: '1/1' }} />
        <View style={{ flexDirection: 'row' }}>
          <Text style={{ fontFamily: 'Montserrat_Medium', fontSize: 12, color: Colors.text }}>{tomatoes.criticsScore}</Text>
          <Text style={{ fontFamily: 'Montserrat_Medium', fontSize: 9, color: Colors.text, lineHeight: 12}}>%</Text>
        </View>
      </View>
      <View style={{ flexDirection: 'row', alignItems: 'center', columnGap: 2 }}>
        <Image source={audienceRating[tomatoes.audienceRating]} style={{ width: 22, aspectRatio: '1/1' }} />
        <View style={{ flexDirection: 'row' }}>
          <Text style={{ fontFamily: 'Montserrat_Medium', fontSize: 12, color: Colors.text }}>{tomatoes.audienceScore}</Text>
          <Text style={{ fontFamily: 'Montserrat_Medium', fontSize: 9, color: Colors.text, lineHeight: 12}}>%</Text>
        </View>
      </View>
    </View>
    : null
  )
}