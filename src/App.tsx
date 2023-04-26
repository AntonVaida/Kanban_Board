import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { getIssues } from './services/getIssues';
import { Issues } from './types/Issues';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { addNewRepo } from './features/selectRepo';
import { 
  fetchActiveIssues, 
  fetchCompletedIssues,
  fetchRepoInform,
} from './features/IssuesSlice';
import { SearchBar } from './components/SearchBar';
import { ListIssues } from './components/ListIssues';

function App() {
  const {repoURL} = useAppSelector((store) => store.loadingData);
  const [errorUrl, setErrorUrl] = useState<null | string>(null);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (repoURL) {
      dispatch(fetchActiveIssues(repoURL))
      dispatch(fetchCompletedIssues(repoURL))
      dispatch(fetchRepoInform(repoURL))
    }
  }, [repoURL])


  return (
    <div style={{width: '100%', overflow: 'hidden'}}>
      <SearchBar 
        setErrorUrl={setErrorUrl} 
      />
      <ListIssues
        errorUrl={errorUrl}
        setErrorUrl={setErrorUrl}
      />
    </div>
  );
}

export default App;
