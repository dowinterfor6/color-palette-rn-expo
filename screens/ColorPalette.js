import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import ColorBox from '../components/ColorBox';

const ColorPalette = ({ route }) => {
  const { colors, paletteName } = route.params;

  return (
    // <SafeAreaView style={GlobalStyles.droidSafeArea}>
    <FlatList
      style={styles.container}
      data={colors}
      renderItem={({ item }) => (
        <ColorBox colorName={item.colorName} hexCode={item.hexCode} />
      )}
      keyExtractor={(item, index) => item.colorName + index}
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
