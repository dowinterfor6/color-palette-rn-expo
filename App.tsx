import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './src/screens/Home';
import ColorPalette from './src/screens/ColorPalette';
import ColorPaletteModal from './src/screens/ColorPaletteModal';
import { RootStackParamList, MainStackParamList } from './src/interfaces/types';
import { Provider } from 'react-redux';
import { store, persistor } from './src/store/configureStore';
import { PersistGate } from 'redux-persist/integration/react';

const RootStack = createStackNavigator<RootStackParamList>();
const MainStack = createStackNavigator<MainStackParamList>();

const MainStackScreen = () => {
  return (
    <MainStack.Navigator>
      <MainStack.Screen name="Home" component={Home} />
      <MainStack.Screen
        name="ColorPalette"
        component={ColorPalette}
        options={({ route }) => ({ title: route.params.paletteName })}
      />
    </MainStack.Navigator>
  );
};

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer>
          <RootStack.Navigator mode="modal">
            <RootStack.Screen
              name="Main"
              component={MainStackScreen}
              options={{ headerShown: false }}
            />
            <RootStack.Screen
              name="ColorPaletteModal"
              component={ColorPaletteModal}
              options={{ title: 'New Color Palette' }}
            />
          </RootStack.Navigator>
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
};

export default App;
