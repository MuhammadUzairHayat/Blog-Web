"use client"

import { reactionAdded } from "./postsSlice"
import { useDispatch } from "react-redux"

const reactionEmoji = {
  like: "👍🏼",
  wow: "😮",
  heart: "❤️",
  rocket: "🚀",
  coffee: "☕",
}

const ReactionButtons = ({ post }) => {
  const dispatch = useDispatch()

  const reactionButtons = Object.entries(reactionEmoji).map(([name, emoji]) => {
    // console.log(name, emoji)
    return (
      <button
        key={name}
        type="button"
        className="reactionBtn tracking-[-0.5px] text-indigo-700 bg-indigo-50 hover:bg-indigo-100 rounded-xl px-2 py-1 transition-colors"
        onClick={() => dispatch(reactionAdded({ postId: post.id, reaction: name }))}
      >
        {emoji} {post.reactions[name]}
        &nbsp;&nbsp;
      </button>
    )
  })
  return <div className="flex gap-2">{reactionButtons} </div>
}

export default ReactionButtons

