import {
  CREATE_PALETTE,
  createPalette,
  FETCH_PALETTES,
  fetchPalettes,
} from './actions';

describe('actions', () => {
  it('should create an action to add a new palette', () => {
    const colorPalette = {
      paletteName: 'Sample color palette',
      colors: [{ colorName: 'Color', hexCode: '#abcabc' }],
    };

    const expectedAction = {
      type: CREATE_PALETTE,
      colorPalette,
    };

    expect(createPalette(colorPalette)).toEqual(expectedAction);
  });

  it('should create an action to fetch all palettes', () => {
    const expectedAction = {
      type: FETCH_PALETTES,
    };

    expect(fetchPalettes()).toEqual(expectedAction);
  });
});
