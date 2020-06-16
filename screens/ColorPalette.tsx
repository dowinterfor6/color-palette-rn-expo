import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import ColorBox from '../components/ColorBox';
import { IColorPalette } from '../interfaces/interfaces';
import { ColorPaletteScreenProps } from '../interfaces/types';

const ColorPalette = ({ route }: ColorPaletteScreenProps) => {
  const { colors, paletteName }: IColorPalette = route.params;

  return (
    // <SafeAreaView style={GlobalStyles.droidSafeArea}>
    <FlatList
      style={styles.container}
      data={colors}
      renderItem={({ item }) => (
        <ColorBox colorName={item.colorName} hexCode={item.hexCode} />
      )}
      keyExtractor={(_, index) => `color-item-${index}`}
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
