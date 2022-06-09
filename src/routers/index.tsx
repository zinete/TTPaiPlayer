/**
 * @ Author: zhenghui
 * @ Create Time: 2021-08-30 14:56:37
 * @ Modified by: zhenghui
 * @ Modified time: 2021-10-13 18:07:56
 * @ Description:
 */

import * as React from 'react';
import {StyleSheet} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';

import {
  createBottomTabNavigator,
  BottomTabBarHeightContext,
} from '@react-navigation/bottom-tabs';

import {BlurView} from '@react-native-community/blur';
import HomePage from '../pages/home/index';
import MePage from '../pages/me/index';
import SubPage from '../pages/sub/index';
import MusicDetail from '../pages/home/Detail';
const Stack = createNativeStackNavigator();
const BottomTab = createBottomTabNavigator();

const Tabs = () => {
  return (
    <BottomTabBarHeightContext.Consumer>
      {tabBarHeight => (
        <BottomTab.Navigator
          screenOptions={{
            headerShown: false,
            tabBarStyle: {
              position: 'absolute',
            },
            tabBarBackground: () => (
              <BlurView style={StyleSheet.absoluteFill} />
            ),
          }}
          sceneContainerStyle={{
            backgroundColor: '#191919',
            marginBottom: tabBarHeight,
          }}>
          <Stack.Screen name="发现" component={HomePage} />
          <Stack.Screen name="订阅" component={SubPage} />
          <Stack.Screen name="个人" component={MePage} />
        </BottomTab.Navigator>
      )}
    </BottomTabBarHeightContext.Consumer>
  );
};
const Router = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          gestureEnabled: true,
        }}>
        <Stack.Screen name="Tabs">{() => <Tabs />}</Stack.Screen>
        <Stack.Screen name="HomePage" component={HomePage} />
        <Stack.Screen
          name="MusicDetail"
          component={MusicDetail}
          options={{
            headerShown: true,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export type ProfileScreenNavigationProp =
  NativeStackNavigationProp<PageStackParamList>;
export type PageStackParamList = {
  Tabs: {
    screen?: string;
  };
  MusicDetail: undefined;
};
export default Router;
