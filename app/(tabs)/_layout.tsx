import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { Link, Tabs } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Animated, StyleSheet, TouchableOpacity, View } from 'react-native';
import { BottomTabBar } from '@react-navigation/bottom-tabs'

import Colors from '../../constants/Colors';
import { height, width } from '../../constants/Metrics';

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */

function MyTabBar({ state, descriptors, navigation }: any) {
  const [translateX] = useState(new Animated.Value(0));

  const TAB_WIDTH = width / 4;

  const translateTab = (index: number) => {
    Animated.spring(translateX, {
      toValue: index * TAB_WIDTH,
      useNativeDriver: true,
    }).start();
  }

  useEffect(() => {
    translateTab(state.index);
  }, [state.index])

  return (
    <View style={{ flexDirection: 'row', backgroundColor: Colors.tab_bar, width, height: 60, alignItems: 'center', justifyContent: 'space-around'}}>
      <Animated.View style={[{ width: TAB_WIDTH, alignItems: 'center', transform: [{translateX}] }, StyleSheet.absoluteFillObject]}>
        <View style={{ width: 4, height: 4, borderRadius: 2, backgroundColor: Colors.tint, position: 'absolute', bottom: 15 }} />
      </Animated.View>
      {state.routes.map((route: { key: string | number; name: any; }, index: any) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            // The `merge: true` option makes sure that the params inside the tab screen are preserved
            navigation.navigate({ name: route.name, merge: true });
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        const tabBarIcon = options.tabBarIcon;

        return (
          <TouchableOpacity
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
          >
            <TabIcon tabIcon={tabBarIcon} isFocused={isFocused} />
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const TabIcon = ({tabIcon, isFocused}: any) => {
  const [translateY] = useState(new Animated.Value(0));
  const translateIcon = (val: number) => {
    Animated.spring(translateY, {
      toValue: val,
      useNativeDriver: true,
    }).start();
  }

  useEffect(() => {
    if (isFocused) {
      translateIcon(-5)
    } else {
      translateIcon(0)
    }
  })

  return (
    <Animated.View style={{ transform: [{translateY}] }}>
      <MaterialCommunityIcons name={tabIcon} size={24} color={isFocused ? Colors.tint : Colors.tabIcons} style={{ }} />
    </Animated.View>
  )
}

export default function TabLayout() {
  const [translateX] = useState(new Animated.Value(0))
  const translateTab = (index: any) => {
    Animated.spring(translateX, {
      toValue: index * (width / 4),
      useNativeDriver: true,
    }).start();
  }

  const TabArr = [
    { name: 'home', icon: 'filmstrip' },
    { name: 'cinemas', icon: 'map-marker' },
    { name: 'tickets', icon: 'ticket-confirmation'},
    { name: 'profile', icon: 'account' },
  ]

  const TabBar = (props: any) => {
    return (
      <View style={{width}}>
        
      </View>
    )
  }
  
  return (
    <Tabs
      tabBar={props => <MyTabBar {...props}/>}
      screenOptions={{
        tabBarActiveTintColor: Colors.tint,
      }}
      initialRouteName="home"
      >
      {TabArr.map((_, index) => {
        return (
          <Tabs.Screen name={_.name} key={index}
            options={{
              headerShown: false,
              tabBarIcon: _.icon,
              tabBarShowLabel: false,
            }}
          />
        )
      })}
    </Tabs>
  );
}
