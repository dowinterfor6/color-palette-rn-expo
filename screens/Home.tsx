/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useCallback, useEffect } from 'react';
import { FlatList, StyleSheet, TouchableOpacity, Text } from 'react-native';
import PalettePreview from '../components/PalettePreview';
import { IColorPalette } from '../interfaces/interfaces';
import { HomeScreenProps } from '../interfaces/types';
import { bindActionCreators } from 'redux';
import { createPalette, fetchPalettes } from '../actions/actions';
import { connect } from 'react-redux';

// const Home = ({ navigation, route, colorPalettesStore }: HomeScreenProps) => {
// console.warn(colorPalettesStore);
const Home = (props) => {
  const {
    navigation,
    route,
    colorPalettesStore,
    fetchColorPalettes,
    createColorPalette,
  } = props;

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
    // fetchColorPalettes();
    // fetchPalettes(); // Don't need?
    // console.warn(colorPalettesStore)
  }, []);

  const handleRefresh = useCallback(async () => {
    setIsRefreshing(true);
    let a = await fetchColorPalettes();
    console.warn('store on home', colorPalettesStore.length);
    setColorPalettes(colorPalettesStore);
    // console.warn(colorPalettesStore);
    // await fetchColorPalettes();
    setIsRefreshing(false);
  }, [colorPalettesStore]);

  useEffect(() => {
    if (newColorPalette) {
      // TODO: REDUX
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

// export default Home;

const mstp = (state) => {
  const { colorPalettes: colorPalettesStore } = state;
  return { colorPalettesStore };
};

const mdtp = (dispatch) => {
  return {
    createColorPalette: bindActionCreators(createPalette, dispatch),
    fetchColorPalettes: bindActionCreators(fetchPalettes, dispatch),
  };
};

export default connect(mstp, mdtp)(Home);
