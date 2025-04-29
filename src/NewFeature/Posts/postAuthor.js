import { useSelector } from "react-redux"
import { selectAllUsers } from "../Users/usersSlice"

const PostAuthor = ({ authorId }) => {
  const users = useSelector(selectAllUsers)
  const author = users.find((user) => String(user.id) === String(authorId))
  return <span className="font-semibold text-indigo-700 mb-2">{author ? author.name : "Unknown Person"}</span>
}

export default PostAuthor

