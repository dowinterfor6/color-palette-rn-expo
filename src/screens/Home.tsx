/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useCallback, useEffect, useLayoutEffect } from 'react';
import { FlatList, StyleSheet, TouchableOpacity, Text, Button } from 'react-native';
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';

import { createPalette, fetchPalettes } from '../actions/actions';
import PalettePreview from '../components/PalettePreview';
import { IColorPalette, IState } from '../interfaces/interfaces';
import { HomeScreenProps } from '../interfaces/types';
import { flatlistKeyExtractor } from '../utils/utils';

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

  const renderItem = ({ item }: { item: IColorPalette }) => (
    <PalettePreview
      handlePress={() => {
        navigation.navigate('ColorPalette', item);
      }}
      colorPalette={item}
    />
  );

  const colorPaletteModalOnPress = () => {
    navigation.navigate('ColorPaletteModal');
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button onPress={colorPaletteModalOnPress} title="New palette" />
      ),
    });
  });

  return (
    <FlatList
      style={styles.list}
      data={colorPalettes}
      keyExtractor={flatlistKeyExtractor('home-palette-list')}
      renderItem={renderItem}
      refreshing={isRefreshing}
      onRefresh={handleRefresh}
    // ListHeaderComponent={
    //   <TouchableOpacity onPress={colorPaletteModalOnPress}>
    //     <Text style={styles.buttonText}>Add a color palette</Text>
    //   </TouchableOpacity>
    // }
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
