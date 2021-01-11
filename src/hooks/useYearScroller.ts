import { toScrollPositionAsYear } from '../util/fp';
import useScrollPosition from '@react-hook/window-scroll';

export const useYearScroller = (): string => 
  toScrollPositionAsYear(useScrollPosition());