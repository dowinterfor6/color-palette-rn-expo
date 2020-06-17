import { CREATE_PALETTE, FETCH_PALETTES } from '../actions/actions';
import { COLOR_PALETTES } from '../initialColorPalettes';

const colorPaletteReducer = (state = COLOR_PALETTES, action) => {
  Object.freeze(state);

  switch (action.type) {
    case CREATE_PALETTE:
      // console.warn(state);
      // return state;
      // console.warn(action.colorPalette);
      console.warn('create', [action.colorPalette, ...state].length);
      return [action.colorPalette, ...state];
    case FETCH_PALETTES:
      console.warn('fetch', state.length);
      return state;
    default:
      return state;
  }
};

export default colorPaletteReducer;
