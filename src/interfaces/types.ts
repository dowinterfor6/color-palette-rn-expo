import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { IColorPalette, IColor } from './interfaces';
import { Action } from 'redux';

export type RootStackParamList = {
  Home: { newColorPalette?: IColorPalette };
  ColorPaletteModal: undefined;
  Main: undefined;
};

type ColorPaletteModalScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'ColorPaletteModal'
>;

export type ColorPaletteModalScreenProps = {
  navigation: ColorPaletteModalScreenNavigationProp;
};

export type MainStackParamList = {
  Home: { newColorPalette?: IColorPalette };
  ColorPalette: { colors: IColor[]; paletteName: string };
  ColorPaletteModal: undefined;
};

type HomeScreenNavigationProp = StackNavigationProp<MainStackParamList, 'Home'>;

type HomeScreenRouteProp = RouteProp<MainStackParamList, 'Home'>;

export type HomeScreenProps = {
  navigation: HomeScreenNavigationProp;
  route: HomeScreenRouteProp;
  colorPalettesStore: IColorPalette[];
  fetchColorPalettes: Function;
  createColorPalette: Function;
};

type ColorPaletteScreenNavigationProp = StackNavigationProp<
  MainStackParamList,
  'ColorPalette'
>;

type ColorPaletteScreenRouteProp = RouteProp<
  MainStackParamList,
  'ColorPalette'
>;

export type ColorPaletteScreenProps = {
  navigation: ColorPaletteScreenNavigationProp;
  route: ColorPaletteScreenRouteProp;
};

export type colorPaletteAction = Action & { colorPalette: IColorPalette };
