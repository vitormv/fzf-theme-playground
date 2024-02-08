import type { ThemeOptions } from '~/data/options.store';
import { Line } from '~/utils/tui/Line';
import { token, fillSpace } from '~/utils/tui/Token';

const addScrollbarToLines = (count: number, lines: Line[], themeOptions: ThemeOptions) => {
  lines.forEach((line, i) => {
    if (i >= count) return;

    line.tokens.push(fillSpace(' '), token(themeOptions.scrollbar.substr(0, 1), 'bg scrollbar'));
  });

  return lines;
};

export const createFinderLines = (themeOptions: ThemeOptions) => {
  const fileResultLines = [
    new Line({
      className: 'bg',
      tokens: [
        token(' '.repeat(themeOptions.pointer.length), 'gutter'),
        token(themeOptions.marker, 'gutter marker'),
        token('src/fzf/tui/borders', 'fg'),
        token('.go', 'hl'),
      ],
    }),
    new Line({
      className: 'bg',
      tokens: [
        token(' '.repeat(themeOptions.pointer.length), 'gutter'),
        token(' '.repeat(themeOptions.marker.length)),
        token('src/fzf/tui/main', 'fg'),
        token('.go', 'hl'),
      ],
    }),
    new Line({
      className: 'bg',
      tokens: [
        token(' '.repeat(themeOptions.pointer.length), 'gutter'),
        token(themeOptions.marker, 'gutter marker'),
        token('src/options', 'fg'),
        token('.go', 'hl'),
      ],
    }),
    new Line({
      className: 'bg',
      tokens: [
        token(' '.repeat(themeOptions.pointer.length), 'gutter'),
        token(' '.repeat(themeOptions.marker.length)),
        token('src/matcher', 'fg'),
        token('.go', 'hl'),
      ],
    }),
    new Line({
      className: 'bg',
      tokens: [
        token(themeOptions.pointer, 'pointer bg-plus'),
        token(' '.repeat(themeOptions.marker.length), 'bg-plus'),
        token('src/history', 'fg-plus bg-plus'),
        token('.go', 'hl-plus bg-plus'),
      ],
    }),
    new Line({
      className: 'bg',
      tokens: [
        token(' '.repeat(themeOptions.pointer.length), 'gutter'),
        token(' '.repeat(themeOptions.marker.length)),
        token('src/reader', 'fg'),
        token('.go', 'hl'),
      ],
    }),
    new Line({
      className: 'bg',
      tokens: [
        token(' '.repeat(themeOptions.pointer.length), 'gutter'),
        token(' '.repeat(themeOptions.marker.length)),
        token('src/merger', 'fg'),
        token('.go', 'hl'),
      ],
    }),
  ];

  const uiLines = [
    new Line({ className: 'bg', tokens: [token('  '), token('This is Header', 'header')] }),
    new Line({
      className: 'bg',
      tokens: [
        token(' ', 'spinner'),
        token(' '),
        themeOptions.info === 'default' ? token('35/63 (3) ', 'info') : undefined,
        fillSpace(themeOptions.separator || ' ', 'separator'),
        themeOptions.info === 'right' ? token(' 35/63 (3)', 'info') : undefined,
        token(' '),
      ],
    }),
    new Line({
      className: 'bg',
      tokens: [token(themeOptions.prompt, 'prompt'), token('.go$', 'query')],
    }),
  ];

  switch (themeOptions.layout) {
    case 'default': // files first, ui after
      uiLines.unshift(...addScrollbarToLines(3, fileResultLines, themeOptions));
      break;
    case 'reverse': // ui first, reversed files after
      uiLines.reverse();
      uiLines.push(...addScrollbarToLines(3, fileResultLines.toReversed(), themeOptions));
      break;
    case 'reverse-list': // reversed files first, ui after
      uiLines.unshift(...addScrollbarToLines(3, fileResultLines.toReversed(), themeOptions));
      break;
    default:
      throw new Error(`Unsupported layout option: ${themeOptions.layout}`);
  }

  return uiLines;
};
