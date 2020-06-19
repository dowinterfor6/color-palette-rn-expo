/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useCallback, useEffect } from 'react';
import { FlatList, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';

import { createPalette, fetchPalettes } from '../actions/actions';
import PalettePreview from '../components/PalettePreview';
import { IColorPalette, IState } from '../interfaces/interfaces';
import { HomeScreenProps } from '../interfaces/types';

const Home = ({
  navigation,
  route,
  colorPalettesStore,
  fetchColorPalettes,
  createColorPalette,
}: HomeScreenProps) => {
  const newColorPalette = route.params
    ? route.params.newColorPalette
    : undefined;
  const [colorPalettes, setColorPalettes] = useState<IColorPalette[]>([]);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // const fetchColorPalettes = useCallback(async () => {
  //   const result = await fetch(
  //     'https://color-palette-api.kadikraman.now.sh/palettes',
  //   );

  //   if (result.ok) {
  //     const palettes: IColorPalette[] = await result.json();
  //     setColorPalettes(palettes);
  //   }
  // }, []);

  useEffect(() => {
    setColorPalettes(colorPalettesStore);
  }, []);

  const handleRefresh = useCallback(() => {
    setIsRefreshing(true);
    fetchColorPalettes();
    setColorPalettes(colorPalettesStore);
    setIsRefreshing(false);
  }, [colorPalettesStore]);

  useEffect(() => {
    if (newColorPalette) {
      createColorPalette(newColorPalette);
      setColorPalettes((palettes) => [newColorPalette, ...palettes]);
    }
  }, [newColorPalette]);

  return (
    <FlatList
      style={styles.list}
      data={colorPalettes}
      keyExtractor={(_, index) => `home-palette-list-${index}`}
      renderItem={({ item }) => (
        <PalettePreview
          handlePress={() => {
            navigation.navigate('ColorPalette', item);
          }}
          colorPalette={item}
        />
      )}
      refreshing={isRefreshing}
      onRefresh={handleRefresh}
      ListHeaderComponent={
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('ColorPaletteModal');
          }}
        >
          <Text style={styles.buttonText}>Add a color palette</Text>
        </TouchableOpacity>
      }
    />
  );
};

const styles = StyleSheet.create({
  list: {
    padding: 10,
    backgroundColor: 'white',
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'teal',
    marginBottom: 10,
  },
});

const mstp = (state: IState) => {
  const { colorPalettes: colorPalettesStore } = state;
  return { colorPalettesStore };
};

const mdtp = (dispatch: Dispatch) => {
  return {
    createColorPalette: bindActionCreators(createPalette, dispatch),
    fetchColorPalettes: bindActionCreators(fetchPalettes, dispatch),
  };
};

export default connect(mstp, mdtp)(Home);
