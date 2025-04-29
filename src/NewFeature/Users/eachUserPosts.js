const EachUserPosts = ({ userPosts }) => {
  console.log(userPosts, "userPosts");
  return (
    <span
      className="border-2 border-indigo-200 text-sm bg-indigo-50 py-2 px-4
       text-indigo-700 rounded-md font-semibold shadow-sm"
    >
      {userPosts} Posts
    </span>
  );
};

export default EachUserPosts;
