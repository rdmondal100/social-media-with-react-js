import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import PostStats from "./PostStats";

const GridPostList = ({postList , showuser = true, showStats = true}) => {
  console.log(postList)
	const { userData } = useSelector((state) => state.auth);
  return (
    <ul className=" grid-container">
      {postList?.map((post)=>(
          <li className="relative min-w-80 h-80 " key={post?.$id}>
            
          <Link className="grid-post_link" to={`/post/${post.$id}`}>
          <img src={post?.imageUrl} alt="post" className="h-full w-full object-cover "/>
          </Link>

          <div className="grid-post_user">
            {showuser && (
              <div className="flex items-center justify-start gap-2 flex-1">
                <img src={post?.creator?.imageUrl} alt="creator" className="h-8 w-8 rounded-full"/>
                <p className="line-clamp-1">{post?.creator?.name}</p>
              </div>
            )}
            {showStats && <PostStats post={post} userId={userData?.$id}/>}
          </div>
        </li>
      ))}
    </ul>
  
  )
}

export default GridPostList