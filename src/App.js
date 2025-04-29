import React, { useEffect } from "react";
import Counter from "./FEATURE/COUNTER/counter";
import PostList from "./NewFeature/Posts/postList";
import AddPostForm from "./NewFeature/Posts/AddPostForm";
import SinglePostPage from "./NewFeature/Posts/singlePostPage";
import {Route, Routes, useNavigate} from 'react-router'
import Layout from "./Component/Layout";
import { EditPost } from "./NewFeature/Posts/editPost";
import UsersList from "./NewFeature/Users/usersList";
import UserPagePosts from "./NewFeature/Users/UserPagePosts";


function App() {
  const Navigate = useNavigate()

  return (
    <Routes>
      <Route path="/" element={<Layout />} >
        <Route index element={<PostList />} />
        
        <Route path="post">
          <Route index element={<AddPostForm />} />
          <Route path=":postId" element={<SinglePostPage />} />
          <Route path="edit/:postId" element={<EditPost />} />
        </Route>

        <Route path="user">
          <Route index element={<UsersList />} />
          <Route path=":userId" element={<UserPagePosts />} />
        </Route>
    

        <Route path="*" element={<Navigate to='/' replace/>}></Route>

      </Route>
    </Routes>
  );
}

export default App;
