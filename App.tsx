import React from 'react';
import RootNav from '@app/navigation/RootNav';
import {SafeAreaProvider} from 'react-native-safe-area-context';

const App = () => {
  return (
    <SafeAreaProvider>
      <RootNav />
    </SafeAreaProvider>
  );
};

export default App;
