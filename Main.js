import React from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import ScanScreen from './screen/scan/ScanScreen';
import SearchScreen from './screen/search/SearchScreen';
import BlogScreen from './screen/post/BlogScreen';
import ProfileScreen from './screen/profile/ProfileScreen';
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { useColorScheme } from 'react-native-appearance';
import palette from './lib/styles/open-color';

const Tab = createMaterialBottomTabNavigator();

const Main = () => {
  const colorScheme = useColorScheme();
  return (
    <NavigationContainer>
      <Tab.Navigator
        barStyle={{
          backgroundColor:
            colorScheme === 'dark' ? palette.gray[9] : palette.gray[0],
        }}
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
                  <MaterialCommunityIcons
                    name="pencil"
                    size={24}
                    color={
                      colorScheme === 'dark' ? palette.gray[0] : palette.gray[9]
                    }
                  />
                );
              case 'PROFILE':
                return (
                  <MaterialIcons
                    name={focused ? 'favorite' : 'favorite-border'}
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
        <Tab.Screen name="PROFILE" component={ProfileScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default Main;
