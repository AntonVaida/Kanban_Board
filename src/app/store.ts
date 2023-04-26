import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import issuesReducer from '../features/IssuesSlice';
import loadingReducer from '../features/selectRepo';

const store = configureStore({
  reducer: {
    issues: issuesReducer,
    loadingData: loadingReducer,
  },
})

export default store;
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;