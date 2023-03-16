import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';

export default function ContentRating({rate}: {rate: string }) {
  const [color, setColor] = useState<string>();
  const [text, setText] = useState<string>();

  useEffect(() => {
    setData();
  }, [color, text])

  type match = {
    color: string;
    textColor: string;
    text: string;
  }

  interface props {
    rate: match[]
  }
  
  const rate_match: any = {
    'Livre': {
      color: '#15FE3A',
      textColor: '#272727',
      text: 'L'
    },
    '12 anos': {
      color: '#FECC15',
      textColor: '#272727',
      text: 'A12'
    },
    '14 anos': {
      color: '#EC6A14',
      textColor: '#272727',
      text: 'A14'
    },
    '16 anos': {
      color: '#DD071F',
      textColor: '#272727',
      text: 'A16'
    },
    '18 anos': {
      color: '#FFF',
      textColor: '#272727',
      text: 'A18'
    },
    'Verifique a Classificação': {
      color: '#FFF',
      textColor: '#272727', 
      text: '?',
    }
  }

  function setData() {
    if (rate !== undefined || ' ' || '' ) {
      setColor(rate_match[rate].color)
      setText(rate_match[rate].text)
    }
    else {
      setColor('transparent');
      setText(' ')
    }
  }

  
  return (
    <View style={{ backgroundColor: color === undefined ? '#FFF' : color, borderRadius: 3, justifyContent: 'center', alignItems: 'center'}}>
      <Text style={{ color: '#272727', paddingHorizontal: 5, fontFamily: 'Futura_Bold', fontSize: 10}}>{text}</Text>
    </View>
  )
}