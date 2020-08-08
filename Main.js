import React from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import ScanScreen from './screen/scan/ScanScreen';
import SearchScreen from './screen/search/SearchScreen';
import BlogScreen from './screen/post/BlogScreen';
import ProfileScreen from './screen/profile/ProfileScreen';
import {
  MaterialCommunityIcons,
  MaterialIcons,
  Entypo,
} from '@expo/vector-icons';
import { useColorScheme } from 'react-native-appearance';
import palette from './lib/styles/open-color';
import {
  useFonts,
  NanumGothic_400Regular,
  NanumGothic_700Bold,
} from '@expo-google-fonts/nanum-gothic';
import { AppLoading } from 'expo';

const Tab = createMaterialBottomTabNavigator();

const Main = () => {
  const colorScheme = useColorScheme();
  let [fontsLoaded] = useFonts({
    NanumGothic_400Regular,
    NanumGothic_700Bold,
  });
  if (!fontsLoaded) {
    return <AppLoading />;
  }
  return (
    <NavigationContainer>
      <Tab.Navigator
        barStyle={{
          backgroundColor:
            colorScheme === 'dark' ? palette.gray[9] : palette.gray[0],
        }}
        sceneAnimationEnabled={false}
        backBehavior="none"
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            switch (route.name) {
              case 'SCAN':
                return (
                  <MaterialCommunityIcons
                    name="barcode-scan"
                    size={24}
                    color={
                      colorScheme === 'dark' ? palette.gray[0] : palette.gray[9]
                    }
                  />
                );
              case 'SEARCH':
                return (
                  <MaterialIcons
                    name="search"
                    size={24}
                    color={
                      colorScheme === 'dark' ? palette.gray[0] : palette.gray[9]
                    }
                  />
                );
              case 'BLOG':
                return (
                  <Entypo
                    name="documents"
                    size={24}
                    color={
                      colorScheme === 'dark' ? palette.gray[0] : palette.gray[9]
                    }
                  />
                );
              case 'MY PAGE':
                return (
                  <MaterialCommunityIcons
                    name={focused ? 'account' : 'account-outline'}
                    size={24}
                    color={
                      colorScheme === 'dark' ? palette.gray[0] : palette.gray[9]
                    }
                  />
                );
            }
          },
        })}
      >
        <Tab.Screen name="SEARCH" component={SearchScreen} />
        <Tab.Screen name="SCAN" component={ScanScreen} />
        <Tab.Screen name="BLOG" component={BlogScreen} />
        <Tab.Screen name="MY PAGE" component={ProfileScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default Main;
