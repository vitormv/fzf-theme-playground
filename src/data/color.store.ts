import type { FzfColor } from '~/types/fzf';
import { writable } from 'svelte/store';
import { colorDefinitions, colorInheritances } from '~/fzf/fzfColorDefinitions';

export type ColorValues = Record<FzfColor, string>;

export type ColorOptions = {
  selectedColor: FzfColor;
  colorPickerColor: string;
  colors: ColorValues;
};

const initialSettings: ColorOptions = {
  selectedColor: 'fg',
  colorPickerColor: colorDefinitions.fg.initial,
  colors: Object.fromEntries(
    Object.entries(colorDefinitions).map(([token, options]) => [token, options.initial ?? '']),
  ) as ColorOptions['colors'],
};

const _colorsStore = writable<ColorOptions>(initialSettings);

/**
 * Given a color token, get its value from the store, or recursively try
 * to find the first parent with a color.
 */
export const getColorOrFallback = (color: FzfColor, currentColors: ColorValues) => {
  const thisColor = { color, value: currentColors[color] };

  if (currentColors[color]) {
    return thisColor;
  }

  // given the inheritance tree, find the first that has a value
  const firstMatched = colorInheritances[color].find(
    (inheritedColor) => currentColors[inheritedColor],
  );

  return firstMatched ? { color: firstMatched, value: currentColors[firstMatched] } : thisColor;
};

export const isValidColor = (color: string): color is FzfColor => {
  return color in colorDefinitions;
};

export const colorsStore = {
  subscribe: _colorsStore.subscribe,
  setSelected: (token: FzfColor) => {
    _colorsStore.update((settings) => ({
      ...settings,
      selectedColor: token,
      colorPickerColor: settings.colors[token],
    }));
  },
  resetAllColors: () => {
    _colorsStore.update((settings) => ({
      ...initialSettings,
      selectedColor: settings.selectedColor,
      colorPickerColor: colorDefinitions[settings.selectedColor].initial,
    }));
  },
  updateColor: (token: string, color: string | undefined) => {
    _colorsStore.update((settings) => ({
      ...settings,
      colors: {
        ...settings.colors,
        [token]: color,
      },
    }));
  },
};