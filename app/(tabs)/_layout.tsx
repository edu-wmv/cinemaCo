import React, { useEffect, useState } from 'react';
import { Tabs } from 'expo-router';
import { Animated, StyleSheet, TouchableOpacity, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import Colors from '../../constants/Colors';
import { tabIconSize, width } from '../../constants/Metrics';
import Header from '../../components/Header';

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
    <View style={{ flexDirection: 'row', position: 'absolute', bottom: 0, backgroundColor: Colors.tab_bar, width, height: 70, alignItems: 'center', justifyContent: 'space-around', borderTopLeftRadius: 20, borderTopRightRadius: 20}}>
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
            key={index}
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
    <Animated.View style={{ transform: [{translateY}], height: tabIconSize, width: width/10, alignItems: 'center', justifyContent: 'center' }}>
      <MaterialCommunityIcons type name={tabIcon} size={tabIconSize} color={isFocused ? Colors.tint : Colors.tabIcons}/>
    </Animated.View>
  )
}

export default function TabLayout() {
  const TabArr = [
    { name: 'index', icon: 'home' },
    { name: 'profile', icon: 'filmstrip-box' },
    { name: 'cinemas', icon: 'theater' },
    { name: 'tickets', icon: 'ticket-confirmation-outline'},
  ]
  
  return (
    <Tabs
      tabBar={props => <MyTabBar {...props}/>}
      screenOptions={{
        tabBarActiveTintColor: Colors.tint,
      }}
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
