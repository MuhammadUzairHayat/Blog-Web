"use client"
import { useNavigate, useParams } from "react-router"
import { deletePost, selectPostById, updatePost } from "./postsSlice"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { selectAllUsers } from "../Users/usersSlice"
import { assets } from "../../img/assets"

export const EditPost = () => {
  const { postId } = useParams()
  const post = useSelector((state) => selectPostById(state, postId))
  // console.log(post.title, 'tittle')
  const [title, updateTitle] = useState(post.title)
  const [body, updateBody] = useState(post.body)
  const [user, updateUser] = useState(post.user)
  const [userId, updateUserId] = useState(post.user)
  const [requestStatus, updateRequestStatus] = useState("idle")

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const users = useSelector(selectAllUsers)

  const onChangeTitle = (event) => updateTitle(event.target.value)
  const onChangeContent = (event) => updateBody(event.target.value)
  const onChangeUser = (event) => {
    const name = event.target.value
    updateUser(name)
    const value = users.find((user) => user.name === name)
    updateUserId(value.id)
  }

  const canSave = body && title && user && requestStatus === "idle"

  const onPostSaveClick = () => {
    if (canSave) {
      try {
        updateRequestStatus("pending")
        dispatch(
          updatePost({
            userId: userId,
            id: post.id,
            title,
            body,
            date: new Date().toISOString(),
            user,
            reactions: {
              like: 0,
              wow: 0,
              heart: 0,
              rocket: 0,
              coffee: 0,
            },
          }),
        )
        updateTitle("")
        updateBody("")
        updateUser("")
        updateUser("select")
        navigate(`/post/${postId}`)
      } catch (error) {
        console.error("Editing Failed: ", error)
      } finally {
        updateRequestStatus("idle")
      }
    }
  }

  const onDeleteClick = () => {
    if (canSave) {
      // console.log(post.userId)
      // console.log(post.id)
      try {
        updateRequestStatus("pending")
        dispatch(deletePost({ id: post.id }))
        updateTitle("")
        updateBody("")
        updateUser("select")
        navigate("/")
      } catch (error) {
        console.error(error.message)
      } finally {
        updateRequestStatus("idle")
      }
    } else {
      console.log("Deletion not Allowed!!")
    }
  }

  const renderedUserOptions = users.map((user) => <option key={user.id}>{user.name}</option>)

  const saveBtnStyle = {
    cursor: canSave ? "pointer" : "no-drop",
    opacity: canSave ? 1 : 0.8,
  }

  return (
    <section className="max-w-3xl mx-auto">
      <form className="addPostForm-sect bg-white p-6 rounded-lg shadow-md">
        <div className="flex justify-center mb-4 w-full h-full p-4 items-center">
         <img className="object-cover w-20 rounded-full" src={assets.bg_uzair_logo} alt="logo"></img>
        </div>
        <h1 className="text-2xl my-8 font-semibold text-indigo-500">Edit Post</h1>
        <label htmlFor="posTitle" className="font-semibold text-gray-700">
          Add title
        </label>
        <input
          className="border-2 border-indigo-200 mb-4 py-2 rounded-md px-3 w-full focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          type="text"
          id="postTitle"
          value={title}
          onChange={onChangeTitle}
        />
        <label htmlFor="postUsers" className="font-semibold text-gray-700">
          Add Users
        </label>
        <select
          className="border-2 border-indigo-200 mb-4 py-2 rounded-md px-3 w-full focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          type="text"
          id="postTitle"
          value={user}
          onChange={onChangeUser}
        >
          <option value="select" disabled className="bg-indigo-700 text-white">
            Select an option
          </option>
          {renderedUserOptions}
        </select>
        <label htmlFor="postContent" className="font-semibold text-gray-700">
          Add Content
        </label>
        <textarea
          className="border-2 border-indigo-200 mb-6 min-h-40 py-2 rounded-md px-3 w-full focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          type="text"
          id="postContent"
          value={body}
          onChange={onChangeContent}
        />
        <div className="grid grid-cols-2 gap-4">
          <button
            id="saveBtn"
            className="bg-gradient-to-r from-indigo-600 to-purple-600 mb-2 py-3 px-6 tracking-wide font-semibold rounded-md text-white transition-all hover:from-indigo-700 hover:to-purple-700"
            type="button"
            onClick={onPostSaveClick}
            style={saveBtnStyle}
            disabled={!canSave}
          >
            Save Post
          </button>
          <button
            id="saveBtn"
            className="bg-gradient-to-r from-rose-600 to-red-600 mb-2 py-3 px-6 tracking-wide font-semibold rounded-md text-white transition-all hover:from-rose-700 hover:to-red-700"
            type="button"
            onClick={onDeleteClick}
            style={saveBtnStyle}
            disabled={!canSave}
          >
            Delete Post
          </button>
        </div>
      </form>
    </section>
  )
}

export default EditPost

