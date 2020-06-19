import React from 'react';
import ColorBox from './ColorBox';
import { shallow } from 'enzyme';

describe('ColorBox component', () => {
  it('mounts correctly', () => {
    const colorNameText = 'Color name';

    const wrapper = shallow(
      <ColorBox colorName={colorNameText} hexCode="#ffffff" />,
    );

    expect(wrapper).toExist();
  });

  it('sets the text to white for dark colors', () => {
    const colorNameText = 'Color name';

    const wrapper = shallow(
      <ColorBox colorName={colorNameText} hexCode="#000000" />,
    );

    const textColor = wrapper.find('Text').props().style[1].color;

    expect(textColor).toBe('white');
  });

  it('sets the text to black for light colors', () => {
    const colorNameText = 'Color name';

    const wrapper = shallow(
      <ColorBox colorName={colorNameText} hexCode="#ffffff" />,
    );

    const textColor = wrapper.find('Text').props().style[1].color;

    expect(textColor).toBe('black');
  });

  it('formats and displays the color name and hex code', () => {
    const colorNameText = 'Color name';
    const hexCodeText = '#ffffff';

    const wrapper = shallow(
      <ColorBox colorName={colorNameText} hexCode={hexCodeText} />,
    );

    const colorText = wrapper.find('Text').props().children;

    expect(colorText).toContain(colorNameText);
    expect(colorText).toContain(hexCodeText);
  });
});
