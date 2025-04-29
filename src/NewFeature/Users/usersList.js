import { useSelector } from "react-redux"
import { selectAllUsers } from "./usersSlice"
import { Link } from "react-router-dom"

const UsersList = () => {
  const users = useSelector(selectAllUsers)
  const renderedUsers = users.map((user) => {
    // console.log(user)
    return (
      <li key={user.id} className="mb-3">
        <Link
          className="link text-indigo-600 hover:text-indigo-800 text-lg font-medium hover:underline transition-colors"
          to={`/user/${user.id}`}
        >
          {" "}
          {user.name}{" "}
        </Link>
      </li>
    )
  })

  return (
    <section className="all-user-sect max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-md">
      <h1 className="inline-block py-2 tracking-wide text-4xl mb-8 font-semibold  text-indigo-800">
        All Users
      </h1>
      <ul className="pl-4">{renderedUsers}</ul>
    </section>
  )
}

export default UsersList

