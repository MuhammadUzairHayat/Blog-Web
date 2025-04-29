import {configureStore} from '@reduxjs/toolkit'
import counterReducer from '../FEATURE/COUNTER/counterSlice'
import postsReducer from '../NewFeature/Posts/postsSlice'
import usersReducer from '../NewFeature/Users/usersSlice'

export const store = configureStore({
    reducer: {
        // counter: counterReducer,
        posts: postsReducer, 
        users : usersReducer
    }
})