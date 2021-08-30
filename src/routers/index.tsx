/**
 * @ Author: zhenghui
 * @ Create Time: 2021-08-30 14:56:37
 * @ Modified by: zhenghui
 * @ Modified time: 2021-08-30 15:57:03
 * @ Description:
 */

import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';

import HomePage from '../pages/home/index';
import MusicDetail from '../pages/home/Detail';
const Stack = createNativeStackNavigator();

const Router = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          // 页面顶部的标题栏
          headerShown: false,
        }}>
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
