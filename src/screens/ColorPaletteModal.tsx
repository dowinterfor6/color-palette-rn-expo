/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Switch,
  FlatList,
} from 'react-native';
import COLORS from '../data/colors';
import { IColor } from '../interfaces/interfaces';
import { ColorPaletteModalScreenProps } from '../interfaces/types';

// const ColorPaletteModal = ({ navigation }: { navigation: INavigation }) => {
const ColorPaletteModal = ({ navigation }: ColorPaletteModalScreenProps) => {
  const [name, setName] = useState('');
  const [selectedColors, setSelectedColors] = useState<IColor[]>([]);

  const handleSubmit = useCallback(() => {
    if (!name) {
      Alert.alert('Please enter a palette name');
    } else if (selectedColors.length < 3) {
      Alert.alert('Please add at least 3 colors');
    } else {
      const newColorPalette = {
        paletteName: name,
        colors: selectedColors,
      };
      navigation.navigate('Home', { newColorPalette });
    }
  }, [name, selectedColors]);

  const handleValueChange = useCallback((value, color) => {
    if (value === true) {
      setSelectedColors((colors) => [color, ...colors]);
    } else {
      setSelectedColors((colors) =>
        colors.filter(
          (selectedColor) => color.colorName !== selectedColor.colorName,
        ),
      );
    }
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.name}>Name of new palette</Text>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
        placeholder="Palette name"
      />
      <FlatList
        data={COLORS}
        keyExtractor={(_, index) => `modal-color-list-${index}`}
        renderItem={({ item }) => (
          <View style={styles.color}>
            <Text>{item.colorName}</Text>
            <Switch
              value={
                !!selectedColors.find(
                  (color) => color.colorName === item.colorName,
                )
              }
              onValueChange={(selected) => {
                handleValueChange(selected, item);
              }}
            />
          </View>
        )}
      />
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    borderColor: 'grey',
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  container: {
    padding: 10,
    backgroundColor: 'white',
    flex: 1,
  },
  button: {
    height: 40,
    backgroundColor: 'teal',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  name: {
    marginBottom: 10,
  },
  color: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'grey',
  },
});

export default ColorPaletteModal;
