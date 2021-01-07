import { GeologicTimeline } from "../util/types";
import { useDelineation } from '../hooks/useDelineation';

export const useTimeline = (): GeologicTimeline => ({
  eons: useDelineation('eons'),
  eras: useDelineation('eras'),
  periods: useDelineation('periods'),
  epochs: useDelineation('epochs'),
});