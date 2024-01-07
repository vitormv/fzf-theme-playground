export type BorderTypeGlyphs = {
  top: string;
  bottom: string;
  left: string;
  right: string;
  topLeft: string;
  topRight: string;
  bottomLeft: string;
  bottomRight: string;
};

export type BorderStyle = 'rounded' | 'sharp' | 'bold' | 'double' | 'block' | 'thinblock' | 'none';

export const BorderStyleDefinitions: Record<BorderStyle, BorderTypeGlyphs> = {
  none: {
    top: '',
    bottom: '',
    left: '',
    right: '',
    topLeft: '',
    topRight: '',
    bottomLeft: '',
    bottomRight: '',
  },
  // ╭─────────────────╮
  // │     rounded     │
  // ╰─────────────────╯
  rounded: {
    top: '─',
    bottom: '─',
    left: '│',
    right: '│',
    topLeft: '╭',
    topRight: '╮',
    bottomLeft: '╰',
    bottomRight: '╯',
  },
  sharp: {
    top: '─',
    bottom: '─',
    left: '│',
    right: '│',
    topLeft: '┌',
    topRight: '┐',
    bottomLeft: '└',
    bottomRight: '┘',
  },
  bold: {
    top: '━',
    bottom: '━',
    left: '┃',
    right: '┃',
    topLeft: '┏',
    topRight: '┓',
    bottomLeft: '┗',
    bottomRight: '┛',
  },
  double: {
    top: '═',
    bottom: '═',
    left: '║',
    right: '║',
    topLeft: '╔',
    topRight: '╗',
    bottomLeft: '╚',
    bottomRight: '╝',
  },
  // ▛▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▜
  // ▌      block      ▐
  // ▙▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▟
  block: {
    top: '▀',
    bottom: '▄',
    left: '▌',
    right: '▐',
    topLeft: '▛',
    topRight: '▜',
    bottomLeft: '▙',
    bottomRight: '▟',
  },
  thinblock: {
    top: '▔',
    bottom: '▁',
    left: '▏',
    right: '▕',
    topLeft: '🭽',
    topRight: '🭾',
    bottomLeft: '🭼',
    bottomRight: '🭿',
  },
};

export const borderTypes = Object.keys(BorderStyleDefinitions) as BorderStyle[];