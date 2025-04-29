"use client"

/* eslint-disable array-callback-return */
import { useSelector } from "react-redux"
import { selectAllPosts, getPostsStatus, getPostsError } from "./postsSlice"
import PostScript from "./postScript"

const PostList = () => {
  const posts = useSelector(selectAllPosts)
  const postStatus = useSelector(getPostsStatus)
  const postError = useSelector(getPostsError)
  // console.log(posts)

  // const dispatch = useDispatch()

  // useEffect(() => {
  //     if(posts.length === 0) {
  //         dispatch(fetchPosts());
  //     }
  //   },[]);

  let content
  if (postStatus === "loading") {
    content = <p className="text-center text-xl text-indigo-700 py-8">Loading posts...</p>
  } else if (postStatus === "succeeded") {
    if (posts === 0) {
      return "Posts Are Uploaded"
    } else {
      const newFirstrendering = [...posts].sort((a, b) => b.date.localeCompare(a.date))
      content = newFirstrendering.map((post) => <PostScript key={post.id} post={post} />)
    }
  } else {
    content = (
      <p className="text-center text-xl text-red-600 py-8 bg-red-50 rounded-lg border border-red-200">
        {" "}
        Error Occurred: {postError ? postError : "An unknown error occurred."}{" "}
      </p>
    )
  }

  return <section className="postList-sect px-2">{content}</section>
}

export default PostList

