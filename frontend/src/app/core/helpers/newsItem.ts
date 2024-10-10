//types
import { NewsColor, NewsImagePlacement } from '../types';
//constants
import { BLUE, GREEN, LEFT, RED, RIGHT, YELLOW } from '../constants';

export const getNewsColor = (index: number): NewsColor => {
  switch (index) {
    case 0:
      return BLUE;

    case 1:
      return GREEN;

    case 2:
      return RED;

    case 3:
      return YELLOW;

    case 4:
      return BLUE;

    case 5:
      return GREEN;

    default:
      return BLUE;
  }
};

export const getNewsImagePlacement = (index: number): NewsImagePlacement => (index % 2 == 0 ? LEFT : RIGHT);
