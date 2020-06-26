import React, { useRef, useEffect } from 'react';
import { Text, StyleSheet, Animated } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';

import ColorBox from '../components/ColorBox';
import { IColorPalette, IColor } from '../interfaces/interfaces';
import { ColorPaletteScreenProps } from '../interfaces/types';
import { flatlistKeyExtractor } from '../utils/utils';

const ColorPalette = ({ route }: ColorPaletteScreenProps) => {
  const { colors, paletteName }: IColorPalette = route.params;
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const fadeTimingConfig = {
    toValue: 1,
    duration: 666,
    useNativeDriver: true,
  };

  useEffect(() => {
    Animated.timing(fadeAnim, fadeTimingConfig).start();
  }, [fadeAnim, fadeTimingConfig]);

  const renderItem = ({ item }: { item: IColor }) => (
    <ColorBox colorName={item.colorName} hexCode={item.hexCode} />
  );

  return (
    // <SafeAreaView style={GlobalStyles.droidSafeArea}>
    // <Animated.View style={{ opacity: fadeAnim }}>
    <FlatList
      style={styles.container}
      data={colors}
      renderItem={renderItem}
      keyExtractor={flatlistKeyExtractor('color-item')}
      ListHeaderComponent={<Text style={styles.text}>{paletteName}</Text>}
    />
    // </Animated.View>
    // </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 10,
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
