import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { store } from './APP/store';
import {Provider} from 'react-redux'
import {BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { fetchPosts } from './NewFeature/Posts/postsSlice';
import {ReactQueryDevtools} from  '@tanstack/react-query-devtools'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { fetchUsers } from './NewFeature/Users/usersSlice';
 
store.dispatch(fetchPosts())
store.dispatch(fetchUsers())
const queryClient = new QueryClient()

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* <QueryClientProvider client={queryClient}> */}
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path='/*' element={<App />} />
        </Routes>
      </Router>
    </Provider>
    {/* <ReactQueryDevtools initialIsOpen={false} position="bottom-right" /> */}
    {/* </QueryClientProvider> */}
  </React.StrictMode>
);


