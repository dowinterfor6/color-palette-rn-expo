import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, TransitionSpecs } from '@react-navigation/stack';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import Home from './src/screens/Home';
import ColorPalette from './src/screens/ColorPalette';
import ColorPaletteModal from './src/screens/ColorPaletteModal';
import { store, persistor } from './src/store/configureStore';
import { RootStackParamList, MainStackParamList } from './src/interfaces/types';

const RootStack = createStackNavigator<RootStackParamList>();
const MainStack = createStackNavigator<MainStackParamList>();

const animationConfig = {
  animation: 'spring',
  config: {
    stiffness: 1000,
    damping: 50,
    mass: 3,
    overshootClamping: false,
    restDisplacementThreshold: 0.01,
    restSpeedThreshold: 0.01,
  },
};

const MainStackScreen = () => {
  return (
    <MainStack.Navigator
      screenOptions={{
        gestureEnabled: true,
        gestureDirection: 'horizontal',
      }}
    // headerMode="screen"
    >
      <MainStack.Screen
        name="Home"
        component={Home}
        options={{
          title: 'wtf',
          headerTitleAlign: 'center',
        }}
      />
      <MainStack.Screen
        name="ColorPalette"
        component={ColorPalette}
        options={({ route }) => ({
          title: route.params.paletteName,
          headerTitleAlign: 'center',
        })}
      />
    </MainStack.Navigator>
  );
};

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer>
          <RootStack.Navigator mode="modal" headerMode="screen">
            <RootStack.Screen
              name="Main"
              component={MainStackScreen}
              options={{ headerShown: false }}
            />
            <RootStack.Screen
              name="ColorPaletteModal"
              component={ColorPaletteModal}
              options={{
                title: 'New Color Palette',
                headerTitleAlign: 'center',
              }}
            />
          </RootStack.Navigator>
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
};

export default App;
