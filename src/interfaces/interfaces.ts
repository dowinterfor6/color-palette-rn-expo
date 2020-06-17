export interface IColor {
  colorName: string;
  hexCode: string;
}

export interface IColorPalette {
  paletteName: string;
  colors: IColor[];
}

export interface IPalettePreview {
  handlePress: () => void;
  colorPalette: IColorPalette;
}

export interface IState {
  colorPalettes: IColorPalette[];
}
