import React, { useEffect } from 'react';
import Routes from './routes';
import { KeyboardAvoidingView, LogBox, Platform, SafeAreaView } from 'react-native';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from './Store/store';
import { MenuProvider } from 'react-native-popup-menu';
import FlashMessage from 'react-native-flash-message';

const App: React.FC = () => {
  useEffect(() => {
    LogBox.ignoreAllLogs();
  }, []);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}> 
        <SafeAreaView style={{ flex: 1 }}>
          <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
            <MenuProvider>
              <FlashMessage position={'top'}/>
            <Routes />
            </MenuProvider>
          </KeyboardAvoidingView>
        </SafeAreaView>
      </PersistGate>
    </Provider>
  );
};

export default App;
