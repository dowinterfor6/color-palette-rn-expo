import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';

import ColorBox from '../components/ColorBox';
import { IColorPalette, IColor } from '../interfaces/interfaces';
import { ColorPaletteScreenProps } from '../interfaces/types';
import { flatlistKeyExtractor } from '../utils/utils';

const ColorPalette = ({ route }: ColorPaletteScreenProps) => {
  const { colors, paletteName }: IColorPalette = route.params;

  const renderItem = ({ item }: { item: IColor }) => (
    <ColorBox colorName={item.colorName} hexCode={item.hexCode} />
  );

  return (
    // <SafeAreaView style={GlobalStyles.droidSafeArea}>
    <FlatList
      style={styles.container}
      data={colors}
      renderItem={renderItem}
      keyExtractor={flatlistKeyExtractor('color-item')}
      ListHeaderComponent={<Text style={styles.text}>{paletteName}</Text>}
    />
    // </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    backgroundColor: 'white',
  },
  text: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 10,
  },
});

export default ColorPalette;
