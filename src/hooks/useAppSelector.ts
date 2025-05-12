import { TypedUseSelectorHook, useSelector } from 'react-redux';
import { RootState } from '@/store/config/store';

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
