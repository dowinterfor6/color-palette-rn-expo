export const CREATE_PALETTE = 'CREATE_PALETTE';

export const createPalette = (colorPalette) => ({
  type: CREATE_PALETTE,
  colorPalette,
});

export const FETCH_PALETTES = 'FETCH_PALETTES';

export const fetchPalettes = () => ({
  type: FETCH_PALETTES,
});
