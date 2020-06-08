import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ScanComponent from '../../components/scan/ScanComponent';
import ResultContainer from '../../containers/scan/ResultContainer';

const Stack = createStackNavigator();

const ScanScreen = () => {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="ScanComponent" component={ScanComponent} />
      <Stack.Screen name="ResultComponent" component={ResultContainer} />
    </Stack.Navigator>
  );
};

export default ScanScreen;
