import { createSlice } from '@reduxjs/toolkit';

export interface selectedRepo {
  repoURL: string | null,
}

const initialState: selectedRepo = {
  repoURL: null,
}

export const selectRepoSlice = createSlice({
  name: 'selectedRepo',
  initialState,
  reducers: {
    addNewRepo: (state, action) => {
      state.repoURL = action.payload
    },
  }
})

export const { addNewRepo } = selectRepoSlice.actions;
export default selectRepoSlice.reducer;