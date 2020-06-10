import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ScanContainer from '../../containers/scan/ScanContainer';
import ResultContainer from '../../containers/scan/ResultContainer';

const Stack = createStackNavigator();

const ScanScreen = () => {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="ScanComponent" component={ScanContainer} />
      <Stack.Screen name="ResultComponent" component={ResultContainer} />
    </Stack.Navigator>
  );
};

export default ScanScreen;
