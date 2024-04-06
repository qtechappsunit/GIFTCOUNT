import React, {useEffect} from 'react';
import Routes from './routes';
import {LogBox, SafeAreaView} from 'react-native';

const App = () => {
  useEffect(() => {
    LogBox.ignoreAllLogs();
  }, []);

  return (
    <SafeAreaView style={{flex: 1}}>
      <Routes />
    </SafeAreaView>
  );
};

export default App;
