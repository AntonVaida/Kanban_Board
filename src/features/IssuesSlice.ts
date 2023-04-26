import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../app/store'
import { getIssues } from '../services/getIssues'
import { Issues } from '../types/Issues'
import { getActiveIssues } from '../services/getActiveIssues'
import { getCompletedIssues } from '../services/getCompletedIssue'
import { getUnicleIssue } from '../services/getUnicleIssue'
import { getRepoInform } from '../services/getRepoIform'
import { Inform } from '../types/Inform'

interface IssuesSlice {
  issuesActiveList: Issues[] | null,
  issuesCompletedList: Issues[] | null,
  issuesProgresList: Issues[] | null,
  RepoInform: Inform | null,
  loading: boolean,
  error: string | null,
}

const initialState: IssuesSlice = {
  issuesActiveList: null,
  issuesCompletedList: null,
  issuesProgresList: null,
  RepoInform: null,
  loading: false,
  error: null,
}

export const IssuesSlicer = createSlice({
  name: 'issues',
  initialState, 
  reducers: {
    moveIssueToCompleted: (state, action) => {
      const newIssuesActiveList = state.issuesActiveList?.filter(issue => issue?.id !== action.payload?.item.id) || null;
      const newIssueProgressList = state.issuesProgresList?.filter(issue => issue?.id !== action.payload?.item.id) || null;
      state.issuesActiveList = newIssuesActiveList;
      state.issuesProgresList = newIssueProgressList;
      const filtredDropList = state.issuesCompletedList || []

      let newIssuesCompletedList = filtredDropList.length ? filtredDropList?.filter(issue => issue?.id !== action.payload?.item.id) : [];
      newIssuesCompletedList.splice(action.payload.index, 0, action.payload.item)

      state.issuesCompletedList = newIssuesCompletedList
    },
    moveIssueToActive: (state, action) => {
      const newIssuesCompletedList = state.issuesCompletedList?.filter(issue => issue?.id !== action.payload?.item.id) || null;
      const newIssuesProgressList = state.issuesProgresList?.filter(issue => issue?.id !== action.payload?.item.id) || null;
      state.issuesCompletedList = newIssuesCompletedList;
      state.issuesProgresList = newIssuesProgressList;
      const filtredDropList = state.issuesActiveList || [];

      let newIssuesActiveList = filtredDropList.length ? filtredDropList?.filter(issue => issue?.id !== action.payload?.item.id) : [];
      newIssuesActiveList.splice(action.payload.index, 0, action.payload.item)

      state.issuesActiveList = newIssuesActiveList
    },
    moveIssueToProgres: (state, action) => {
      const newIssuesCompletedList = state.issuesCompletedList?.filter(issue => issue?.id !== action.payload?.item.id) || null;
      const newIssuesActiveList = state.issuesActiveList?.filter(issue => issue?.id !== action.payload?.item.id) || null;
      state.issuesCompletedList = newIssuesCompletedList;
      state.issuesActiveList = newIssuesActiveList;
      const filtredDropList = state.issuesProgresList || [];

      let newIssueProgressList = filtredDropList.length ? filtredDropList?.filter(issue => issue?.id !== action.payload?.item.id) : [];
      newIssueProgressList.splice(action.payload.index, 0, action.payload.item)

      state.issuesProgresList = newIssueProgressList
    },
  },
  extraReducers(builder) {
    builder.addCase(fetchActiveIssues.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    builder.addCase(fetchCompletedIssues.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    builder.addCase(fetchActiveIssues.fulfilled, (state, action) => {
      state.issuesActiveList = getUnicleIssue(action.payload)
      state.error = null;
      state.loading = false;
    })
    builder.addCase(fetchCompletedIssues.fulfilled, (state, action) => {
      state.issuesCompletedList = getUnicleIssue(action.payload)
      state.error = null;
      state.loading = false;
    })
    builder.addCase(fetchActiveIssues.rejected, (state) => {
      state.loading = false;
      state.error = 'Error loading Issues';
    })
    builder.addCase(fetchCompletedIssues.rejected, (state) => {
      state.loading = false;
      state.error = 'Error loading Issues';
    })
    builder.addCase(fetchRepoInform.pending, (state, action) => {
      state.loading = true;
      state.error = null;
    })
    builder.addCase(fetchRepoInform.fulfilled, (state, action) => {
      const {stargazers_count, full_name} = action.payload;
      state.RepoInform = {stargazers_count, full_name};
      state.error = null;
      state.loading = false;
    })
    builder.addCase(fetchRepoInform.rejected, (state) => {
      state.loading = false;
      state.error = 'Error loading RepoInform';
    })
  },
})

export const fetchActiveIssues = createAsyncThunk('issuesActive/fetch', (baseURL: string) => {
  return getActiveIssues(baseURL)
})
export const { moveIssueToCompleted, moveIssueToActive, moveIssueToProgres} = IssuesSlicer.actions;
export const fetchCompletedIssues = createAsyncThunk('issuesCompleted/fetch', (baseURL: string) => {
  return getCompletedIssues(baseURL)
})
export const fetchRepoInform = createAsyncThunk('repoInform/fetch', (baseURL: string) => {
  return getRepoInform(baseURL)
})
export default IssuesSlicer.reducer;