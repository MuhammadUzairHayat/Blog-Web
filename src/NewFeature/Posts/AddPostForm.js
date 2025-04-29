"use client"

import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { postsAdded, selectAllPosts } from "./postsSlice"
import { selectAllUsers } from "../Users/usersSlice"
import { useNavigate } from "react-router"

const AddPostForm = () => {
  const posts = useSelector(selectAllPosts)

  const [title, updateTitle] = useState("")
  const [body, updateBody] = useState("")
  const [user, updateUser] = useState("select")
  const [userId, updateUserId] = useState()

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const users = useSelector(selectAllUsers)
  // console.log(posts.length, 'Length')

  const onChangeTitle = (event) => updateTitle(event.target.value)
  const onChangeContent = (event) => updateBody(event.target.value)
  const onChangeUser = (event) => {
    const name = event.target.value
    updateUser(name)
    const value = users.find((user) => user.name === name)
    updateUserId(value.id)
  }

  const canSave = body && title && user

  const onPostSaveClick = () => {
    if (body && title) {
      dispatch(postsAdded(posts.length + 1, userId, title, body, user))
      updateTitle("")
      updateBody("")
      updateUser("select")
      navigate("/")
    }
  }

  const renderedUserOptions = users.map((user) => <option key={user.id}>{user.name}</option>)

  const saveBtnStyle = {
    cursor: canSave ? "pointer" : "no-drop",
    opacity: canSave ? 1 : 0.8,
  }

  return (
    <section className="flex justify-center w-full">
      <form className="max-w-[40rem] text-sm border-2 border-indigo-200 bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-xl mb-4 font-semibold text-indigo-500">
          Add Post
        </h1>
        <label htmlFor="posTitle" className="mb-8 font-semibold text-sm text-gray-700">
          Add title
        </label>
        <input
          className="border-2 border-indigo-200 mb-4 py-2 rounded-md px-3 w-full focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          type="text"
          id="postTitle"
          value={title}
          onChange={onChangeTitle}
        />
        <label htmlFor="postUsers" className="mb-8 font-semibold text-gray-700">
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
        <label htmlFor="postContent" className="mb-8 font-semibold text-gray-700">
          Add Content
        </label>
        <textarea
          className="border-2 border-indigo-200 mb-6 min-h-40 py-2 rounded-md px-3 w-full focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          type="text"
          id="postContent"
          value={body}
          onChange={onChangeContent}
        />
        <button
          id="saveBtn"
          className="bg-gradient-to-r from-indigo-600 to-purple-600 mb-2 py-3 px-6 tracking-wide font-semibold rounded-md text-white w-full transition-all hover:from-indigo-700 hover:to-purple-700"
          type="button"
          onClick={onPostSaveClick}
          style={saveBtnStyle}
          disabled={!canSave}
        >
          Save Post
        </button>
      </form>
    </section>
  )
}

export default AddPostForm

