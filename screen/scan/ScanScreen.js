import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ScanComponent from '../../components/scan/ScanComponent';
import ResultComponent from '../../components/scan/ResultComponent';

const Stack = createStackNavigator();

const ScanScreen = () => {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="ScanComponent" component={ScanComponent} />
      <Stack.Screen name="ResultComponent" component={ResultComponent} />
    </Stack.Navigator>
  );
};

export default ScanScreen;
