import React from 'react';
import { shallow } from 'enzyme';
import PalettePreview from './PalettePreview';

describe('PalettePreview component', () => {
  it('mounts correctly', () => {
    const mockHandlePress = jest.fn();
    const colorPaletteSample = {
      paletteName: 'Sample color palette',
      colors: [{ colorName: 'Color', hexCode: '#abcabc' }],
    };

    const wrapper = shallow(
      <PalettePreview
        handlePress={mockHandlePress}
        colorPalette={colorPaletteSample}
      />,
    );

    expect(wrapper).toExist();
  });

  it('calls the handlePress function when clicked', () => {
    const mockHandlePress = jest.fn();
    const colorPaletteSample = {
      paletteName: 'Sample color palette',
      colors: [{ colorName: 'Color', hexCode: '#abcabc' }],
    };

    const wrapper = shallow(
      <PalettePreview
        handlePress={mockHandlePress}
        colorPalette={colorPaletteSample}
      />,
    );

    wrapper.find('TouchableOpacity').props().onPress();

    expect(mockHandlePress).toHaveBeenCalled();
  });

  it('displays the color palette name', () => {
    const mockHandlePress = jest.fn();
    const colorPaletteSample = {
      paletteName: 'Sample color palette',
      colors: [{ colorName: 'Color', hexCode: '#abcabc' }],
    };

    const wrapper = shallow(
      <PalettePreview
        handlePress={mockHandlePress}
        colorPalette={colorPaletteSample}
      />,
    );

    const paletteText = wrapper.find('Text').props().children;

    expect(paletteText).toEqual(colorPaletteSample.paletteName);
  });

  describe('flatlist component', () => {
    it('passes up to 5 colors to the flatlist for rendering', () => {
      const mockHandlePress = jest.fn();
      const colorPaletteSample = {
        paletteName: 'Sample color palette',
        colors: [
          { colorName: 'Color1', hexCode: '#abcab1' },
          { colorName: 'Color2', hexCode: '#abcab2' },
          { colorName: 'Color3', hexCode: '#abcab3' },
          { colorName: 'Color4', hexCode: '#abcab4' },
          { colorName: 'Color5', hexCode: '#abcab5' },
        ],
      };

      const wrapper = shallow(
        <PalettePreview
          handlePress={mockHandlePress}
          colorPalette={colorPaletteSample}
        />,
      );

      const flatListProps = wrapper.find('FlatList').props();
      const flatListData = flatListProps.data;

      expect(flatListData).toEqual(colorPaletteSample.colors);
    });

    it('generates a unique key based on index', () => {
      const mockHandlePress = jest.fn();
      const colorPaletteSample = {
        paletteName: 'Sample color palette',
        colors: [{ colorName: 'Color', hexCode: '#abcabc' }],
      };

      const wrapper = shallow(
        <PalettePreview
          handlePress={mockHandlePress}
          colorPalette={colorPaletteSample}
        />,
      );

      const flatListProps = wrapper.find('FlatList').props();
      const flatListData = flatListProps.data;
      const flatListKeyExtractor = flatListProps.keyExtractor;

      expect(flatListData.map(flatListKeyExtractor)).toContain(
        'palette-item-0',
      );
    });

    it('renders a view component for each color', () => {
      const mockHandlePress = jest.fn();
      const colorPaletteSample = {
        paletteName: 'Sample color palette',
        colors: [
          { colorName: 'Color1', hexCode: '#abcab1' },
          { colorName: 'Color2', hexCode: '#abcab2' },
          { colorName: 'Color3', hexCode: '#abcab3' },
          { colorName: 'Color4', hexCode: '#abcab4' },
          { colorName: 'Color5', hexCode: '#abcab5' },
        ],
      };

      const wrapper = shallow(
        <PalettePreview
          handlePress={mockHandlePress}
          colorPalette={colorPaletteSample}
        />,
      );

      const flatListProps = wrapper.find('FlatList').props();
      const flatListData = flatListProps.data.map((data) => {
        return { item: data };
      });
      const flatListRenderItem = flatListProps.renderItem;

      const flatListRenderedItems = flatListData.map(flatListRenderItem);

      expect(flatListRenderedItems.length).toBe(
        colorPaletteSample.colors.length,
      );

      const flatListRenderedItemsType = flatListRenderedItems.map(
        (item) => item.type.displayName,
      );

      expect(flatListRenderedItemsType.every((el) => el === 'View')).toBe(true);
    });
  });
});
