import { CREATE_PALETTE, FETCH_PALETTES } from '../actions/actions';
import { COLOR_PALETTES } from '../data/initialColorPalettes';

const colorPaletteReducer = (state = COLOR_PALETTES, action) => {
  Object.freeze(state);

  switch (action.type) {
    case CREATE_PALETTE:
      return [action.colorPalette, ...state];
    case FETCH_PALETTES:
      return state;
    default:
      return state;
  }
};

export default colorPaletteReducer;
