import {
  TypedUseSelectorHook,
  useDispatch as useReduxDispatch,
  useSelector as useReduxSelector
} from 'react-redux';
import type { RootState, AppDispatch } from './store';

// Типизированные хуки
export const useAppDispatch: () => AppDispatch = () =>
  useReduxDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useReduxSelector;
