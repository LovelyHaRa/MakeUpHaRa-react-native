import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ScanContainer from '../../containers/scan/ScanContainer';
import ResultContainer from '../../containers/scan/ResultContainer';
import HistoryListContainer from '../../containers/scan/HistoryListContainer';

const Stack = createStackNavigator();

const ScanScreen = () => {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="ScanComponent" component={ScanContainer} />
      <Stack.Screen name="ResultComponent" component={ResultContainer} />
      <Stack.Screen
        name="HistoryListComponent"
        component={HistoryListContainer}
      />
    </Stack.Navigator>
  );
};

export default ScanScreen;
