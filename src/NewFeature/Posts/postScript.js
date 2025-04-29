import React from "react"
import ReactionButtons from "./reactionButton"
import { TimeAgoSlice } from "../TimeAgo/timeSlice"
import PostAuthor from "./postAuthor"
import { Link } from "react-router-dom"

let PostScript = ({ post }) => {
  // console.log(post)
  return (
    <>
      {post ? (
        <article className="flex flex-col gap-2 border-2 border-indigo-100 bg-white px-6 py-5 mb-4 rounded-lg shadow-md hover:shadow-lg transition-shadow">
          <h1 className="text-2xl text-indigo-800 font-bold mb-3">
            {post.title
              .split(" ")
              .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
              .join(" ")}
            ;
          </h1>
          <p className="text-gray-700 mb-4"> {post.body.substring(0, 100)}... </p>
          <div className="grid gap-2">
            <PostAuthor authorId={post.userId} />
            <ReactionButtons post={post} />
          </div>
          <div className="flex items-center justify-between mt-4">
            <Link
              to={`/post/${post.id}`}
              className="px-5 py-2 text-sm text-white bg-gradient-to-r from-indigo-600 to-purple-600 rounded-md font-semibold transition-all hover:from-indigo-700 hover:to-purple-700"
            >
              View Post
            </Link>
            <TimeAgoSlice time={post.date} className="text-gray-500 italic self-center" />
          </div>
        </article>
      ) : (
        "Sorry!! No Post Data is Found"
      )}
    </>
  )
}
PostScript = React.memo(PostScript)
export default PostScript

