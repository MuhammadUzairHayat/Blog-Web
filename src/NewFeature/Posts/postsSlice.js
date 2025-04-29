import { combineSlices, createAsyncThunk, createSelector, createSlice, nanoid } from "@reduxjs/toolkit";
import { sub } from "date-fns";
import axios from 'axios'


const POST_URL = 'https://jsonplaceholder.typicode.com/posts'

const initialState = {
    posts: [],
    status: 'idle',
    error: null
}

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
      try {
        const response = await axios.get(POST_URL);
        return [...response.data];
      } catch (error) {
        console.error(error.message);
        throw error;
      }
    }
  );

export const addNewPost = createAsyncThunk('posts/addNewPost', async (initialPost) => {
      try {
        const response = await axios.post(POST_URL, initialPost);
        return response.data
      } catch (error) {
         console.error(error.message) // only for Redux testing
      }
    }
  );

export const updatePost = createAsyncThunk('posts/updatePost', async (initialPost) => {
    const id = initialPost.id
      try {
        const response = await axios.put(`${POST_URL}/${id}`, initialPost);
        // console.log(response.data)
        return response.data
      } catch (error) {
        return initialPost
      }
    }
  );

export const deletePost = createAsyncThunk('posts/deletePost', async (initialPost) => {
    // console.log("initial", initialPost)
    const {id} = initialPost
    // console.log(id, 'id given')
      try {
        const response = await axios.delete(`${POST_URL}/${id}`);
        // console.log(response, 'response data')
        return  {
          status: response.status,
          id : id
        }
          
      } catch (error) {
        console.error(error.message)
      }
    }
  );

const postsSlice = createSlice({
    name: 'posts',
    initialState: initialState,
    reducers: {
        postsAdded: {
            reducer(state,action) {
            state.posts.push(action.payload)
            // console.log(action.payload)
            },
            prepare(id, userId, title, body, user) {
                return {
                payload: {
                    userId: userId,
                    id: id,
                    title,
                    body,
                    date: new Date().toISOString(),
                    user,
                    reactions: {
                        like: 0,
                        wow:0,
                        heart: 0,
                        rocket: 0,
                        coffee: 0
                    }
           }}
        }},
        reactionAdded (state, action) {
                const {postId, reaction} = action.payload;
                const postExist = state.posts.find(post => post.id === postId);
                if(postExist) {
                    postExist.reactions[reaction]++
                }
        }
    },
    extraReducers(builder) {
        builder
            .addCase(fetchPosts.pending, (state, action)=> {
                state.status = 'loading'
            })
            .addCase(fetchPosts.fulfilled, (state, action)=> {
                state.status = 'succeeded'
                let min = 1;
                const loadedPosts = action.payload.map((post)=> {
                    // console.log(state.status)
                    post.date = sub(new Date(), {minutes: min++}).toISOString()
                    post.user = 'Anonymous'
                    post.reactions = {
                        like: 0,
                        wow: 0,
                        heart:0,
                        rocket:0,
                        coffee:0
                    }
                    return post;
                    
                })
                // console.log(loadedPosts)
                // console.log(state.posts.concat(loadedPosts))
                state.posts = loadedPosts
                // console.log(state.posts)

            })
            .addCase(addNewPost.fulfilled, (state, action)=> {
                if (!action.payload?.id) {
                    console.log(`Uploading didn't complete`)
                    console.log(action.payload)
                    return;
                } else {
                    const newPost = action.payload;
                    state.posts = [...state.posts, newPost]
                }
                
            })
            .addCase(updatePost.fulfilled, (state, action)=> {
              // console.log(action.payload.id)
                if (!action.payload?.id) {
                    console.log(`Uploading didn't Complete`)
                    console.log(action.payload)
                    return;
                } else {
                    const {id} = action.payload;
                    state.posts = state.posts.map(post => post.id === id ? action.payload : post);
                }  
            })
            .addCase(deletePost.fulfilled, (state, action)=> {
              console.log(action.payload , 'give response')
                if (action.payload.status !== 200 && action.payload.status !== 204) {
                    console.log(`Deletion didn't Complete`)
                    console.log(action.payload)
                    return;
                } else {
                    const id = action.payload.id;
                    // console.log(id)
                    const filterPosts = state.posts.filter(post => post.id !== id);
                    state.posts = filterPosts
                }
                
            })
            .addCase(fetchPosts.rejected, (state, action)=> {
                state.status = 'Failed'
                state.error = action.error.message
            })
    }
})


export const selectPostById = (state, postId)=> {
    return (state.posts.posts.find(post=> String(post.id) === String(postId)))
}

export const selectAllPosts = (state) => state.posts.posts; 
export const getPostsStatus = (state) => state.posts.status;
export const getPostsError = (state) => state.posts.error;

export const {postsAdded, reactionAdded} = postsSlice.actions

export const selectPostsByUser = createSelector(
  [selectAllPosts, (state, userId)  => userId],
  (posts, userId) => posts.filter(post => String(post.userId) === String(userId))
)

export default postsSlice.reducer