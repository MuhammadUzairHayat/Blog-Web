"use client"
import { useSelector } from "react-redux"
import { selectAllPosts, selectPostsByUser } from "../Posts/postsSlice"
import { selectUserById } from "./usersSlice"
import { useParams } from "react-router"
import PostScript from "../Posts/postScript"
import EachUserPosts from "./eachUserPosts"

// export const userPostLength = null;
function UserPagePosts() {
  const { userId } = useParams()
  // console.log(userId)

  const post = useSelector(selectAllPosts)
  const user = useSelector((state) => selectUserById(state, userId))
  // console.log(user, 'user')
  // console.log(post, 'post')

  const filterUserPosts = useSelector((state) => selectPostsByUser(state, userId))
  const userPostLength = filterUserPosts.length

  if (!user) {
    return <p className="text-4xl text-center py-12 text-indigo-700"> Loading... </p>
  } else {
    if (filterUserPosts.length === 0) {
      return <p className="text-4xl text-center py-12 text-indigo-700">No posts found for this user</p>
    } else {
      return (
        <section className="postList-sect max-w-5xl mx-auto">
          <div className="flex justify-between items-center mb-8 bg-white p-6 rounded-lg shadow-md">
            <p className="flex text-4xl font-bold py-1 text-indigo-800 border-b-4 border-indigo-400">{user.name}</p>
            <EachUserPosts userPosts={userPostLength} />
          </div>
          {filterUserPosts.map((post) => {
            return <PostScript key={post.id} post={post} />
          })}
        </section>
      )
    }
  }
}

export default UserPagePosts

