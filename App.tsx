import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {
  createStackNavigator,
  TransitionSpecs,
  HeaderStyleInterpolators,
} from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';

import Home from './src/screens/Home';
import ColorPalette from './src/screens/ColorPalette';
import ColorPaletteModal from './src/screens/ColorPaletteModal';
import { store, persistor } from './src/store/configureStore';
import { RootStackParamList, MainStackParamList } from './src/interfaces/types';
import SampleDrawer from './src/screens/SampleDrawer';
import CustomDrawerContent from './src/drawers/CustomDrawerContent';
import SampleTab from './src/screens/SampleTab';

const RootStack = createStackNavigator<RootStackParamList>();
const MainStack = createStackNavigator<MainStackParamList>();
const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();

const config = {
  animation: 'spring',
  config: {
    stiffness: 1000,
    damping: 500,
    mass: 3,
    overshootClamping: true,
    restDisplacementThreshold: 0.01,
    restSpeedThreshold: 0.01,
  },
};

const MyTransition = {
  gestureDirection: 'horizontal',
  transitionSpec: {
    open: TransitionSpecs.TransitionIOSSpec,
    close: TransitionSpecs.TransitionIOSSpec,
  },
  headerStyleInterpolator: HeaderStyleInterpolators.forFade,
  cardStyleInterpolator: ({ current, next, layouts }) => {
    return {
      cardStyle: {
        transform: [
          {
            translateX: current.progress.interpolate({
              inputRange: [0, 1],
              outputRange: [layouts.screen.width, 0],
            }),
          },
          {
            rotate: current.progress.interpolate({
              inputRange: [0, 1],
              outputRange: [1, 0],
            }),
          },
          {
            scale: next
              ? next.progress.interpolate({
                inputRange: [0, 1],
                outputRange: [1, 0.9],
              })
              : 1,
          },
        ],
      },
      overlayStyle: {
        opacity: current.progress.interpolate({
          inputRange: [0, 1],
          outputRange: [0, 0.5],
        }),
      },
    };
  },
};

const MainStackScreen = () => {
  return (
    <MainStack.Navigator
      screenOptions={{
        gestureEnabled: true,
        headerTitleAlign: 'center',
        cardOverlayEnabled: true,
        ...MyTransition,
      }}
      headerMode="screen"
    >
      <MainStack.Screen
        name="Home"
        component={Home}
        options={{
          title: 'Home',
          transitionSpec: {
            open: config,
            close: config,
          },
        }}
      />
      <MainStack.Screen
        name="ColorPalette"
        component={ColorPalette}
        options={({ route }) => ({
          title: route.params.paletteName,
        })}
      />
    </MainStack.Navigator>
  );
};

const RootStackScreen = () => {
  return (
    <RootStack.Navigator
      mode="modal"
      screenOptions={{ headerTitleAlign: 'center' }}
    >
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
        }}
      />
    </RootStack.Navigator>
  );
};

const TabNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={RootStackScreen}
        options={{
          tabBarIcon: () => <FontAwesome name="home" size={24} color="black" />,
        }}
      />
      <Tab.Screen
        name="Sample Tab"
        component={SampleTab}
        options={{
          tabBarIcon: () => (
            <MaterialCommunityIcons name="test-tube" size={24} color="black" />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer>
          <Drawer.Navigator
            edgeWidth={25}
            drawerContent={(props) => <CustomDrawerContent {...props} />}
          >
            <Drawer.Screen
              name="Home"
              component={TabNavigator}
              options={{
                drawerIcon: () => (
                  <FontAwesome name="home" size={24} color="black" />
                ),
              }}
            />
            <Drawer.Screen
              name="Sample Drawer Component"
              component={SampleDrawer}
              options={{
                drawerIcon: () => (
                  <MaterialCommunityIcons
                    name="test-tube-empty"
                    size={24}
                    color="black"
                  />
                ),
              }}
            />
          </Drawer.Navigator>
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
};

export default App;
