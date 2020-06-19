import colorPaletteReducer from "./colorPalettes"
import { COLOR_PALETTES } from "../data/initialColorPalettes"
import { CREATE_PALETTE, FETCH_PALETTES } from "../actions/actions";

describe('color palette reducer', () => {
  it('should return initial state', () => {
    expect(colorPaletteReducer(undefined, {})).toEqual(COLOR_PALETTES);
  });

  it('should handle CREATE_PALETTE', () => {
    // TODO: Refactor?
    const colorPalette = {
      paletteName: 'Sample color palette',
      colors: [{ colorName: 'Color', hexCode: '#abcabc' }],
    };

    const createPaletteAction = {
      type: CREATE_PALETTE,
      colorPalette,
    };

    expect(colorPaletteReducer([], createPaletteAction)).toEqual([
      colorPalette,
    ]);
  });

  it('should handle FETCH_PALETTES', () => {
    const colorPalette = {
      paletteName: 'Sample color palette',
      colors: [{ colorName: 'Color', hexCode: '#abcabc' }],
    };

    const fetchPalettesAction = {
      type: FETCH_PALETTES,
    };

    expect(colorPaletteReducer([colorPalette], fetchPalettesAction)).toEqual([
      colorPalette,
    ]);
  });
});
