import React from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import ScanScreen from './screen/scan/ScanScreen';
import SearchScreen from './screen/search/SearchScreen';
import BlogScreen from './screen/post/BlogScreen';
import ProfileScreen from './screen/profile/ProfileScreen';
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { useColorScheme } from 'react-native-appearance';

const Tab = createMaterialBottomTabNavigator();

const Main = () => {
  const colorScheme = useColorScheme();
  console.log(colorScheme);
  return (
    <NavigationContainer>
      <Tab.Navigator
        barStyle={{
          backgroundColor: colorScheme === 'dark' ? '#212529' : '#f8f9fa',
        }}
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            switch (route.name) {
              case 'SCAN':
                return (
                  <MaterialCommunityIcons
                    name="barcode-scan"
                    size={24}
                    color={colorScheme === 'dark' ? '#f8f9fa' : '#212529'}
                  />
                );
              case 'SEARCH':
                return (
                  <MaterialIcons
                    name="search"
                    size={24}
                    color={colorScheme === 'dark' ? '#f8f9fa' : '#212529'}
                  />
                );
              case 'BLOG':
                return (
                  <MaterialCommunityIcons
                    name="pencil"
                    size={24}
                    color={colorScheme === 'dark' ? '#f8f9fa' : '#212529'}
                  />
                );
              case 'PROFILE':
                return (
                  <MaterialIcons
                    name={focused ? 'favorite' : 'favorite-border'}
                    size={24}
                    color={colorScheme === 'dark' ? '#f8f9fa' : '#212529'}
                  />
                );
            }
          },
        })}
      >
        <Tab.Screen name="SCAN" component={ScanScreen} />
        <Tab.Screen name="SEARCH" component={SearchScreen} />
        <Tab.Screen name="BLOG" component={BlogScreen} />
        <Tab.Screen name="PROFILE" component={ProfileScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default Main;
