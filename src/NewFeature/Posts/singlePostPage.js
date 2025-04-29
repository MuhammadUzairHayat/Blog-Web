"use client"

import { useSelector } from "react-redux"
import { useParams } from "react-router"
import { selectPostById } from "./postsSlice"
import ReactionButtons from "./reactionButton"
import { TimeAgoSlice } from "../TimeAgo/timeSlice"
import PostAuthor from "./postAuthor"
import { Link } from "react-router-dom"

export const SinglePostPage = () => {
  const { postId } = useParams()
  // console.log(postId)

  const post = useSelector((state) => selectPostById(state, postId))

  if (!post) {
    console.log("NO")
    return (
      <article className="border-2 border-gray-200 px-5 py-5 mb-2 rounded">
        <p className="text-4xl"> Single Page Post </p>
      </article>
    )
  } else {
    // console.log('YES')
    return (
     <div className="px-2">
      <article
        className="border-2 border-indigo-100 bg-white max-w-10 px-8 py-6 mb-2 rounded-lg shadow-md"
        style={{ margin: "2rem auto", maxWidth: "60rem" }}
      >
        <h1 className="text-2xl lg:text-3xl font-extrabold tracking-tight text-indigo-800 mb-7">
          {post.title
            .split(" ")
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
            .join(" ")}
          ;
        </h1>
        <p className="text-gray-700 mb-8 text-[16px] leading-relaxed"> {post.body} </p>
        <span className="text-[1.2rem] text-indigo-700">
          <PostAuthor authorId={post.userId} />
        </span>
        <div className="flex justify-between my-5">
          <ReactionButtons post={post} />
        </div>
        <div className="flex justify-between items-center text-xl">
          <Link
            to={`/post/edit/${post.id}`}
            className="px-8 py-2 text-sm text-white bg-gradient-to-r from-indigo-600 to-purple-600 rounded-md font-semibold transition-all hover:from-indigo-700 hover:to-purple-700"
          >
            Edit Post
          </Link>
          <TimeAgoSlice time={post.date} className="text-gray-500 italic" />
        </div>
      </article>
      </div>
    )
  }
}

export default SinglePostPage

