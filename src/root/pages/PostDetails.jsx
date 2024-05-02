import Loader from "@/components/shared/Loader";
import PostStats from "@/components/shared/PostStats";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import postServices from "@/lib/appwrite/post_services";
import { multiFormatDateString } from "@/lib/utils";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";

const PostDetails = () => {
	const { id } = useParams();
	const [post, setPost] = useState([]);
	const [loading, setLoading] = useState(true);
  const [isdeleting,setIsDeleting]=useState(false)
	const { userData } = useSelector((state) => state.auth);
  const {toast}=useToast()
  const navigate = useNavigate()

	const handleDeletePost = async () => {
    setIsDeleting(true)
    const deletePost = await postServices.deletePost(post?.$id,post?.imageId)
    console.log(deletePost)
    if(!deletePost){
      setIsDeleting(false)
      toast({ variant:"destructive",title:"Failed to delete the post!",description:"Please try again"})
    }
    setIsDeleting(false)
    navigate('/')

  };

	useEffect(() => {
		const refresh = async () => {
			const data = await postServices.getPostById(id || "");
			setPost(data);
      if(data){
        setLoading(false)
      }
		};
		refresh();
	}, [id]);
	return (
		<div className=' post_details-container'>
			{loading ? (
				<Loader />
			) : (
				<div className='post_details-card overflow-hidden'>
					<img
						src={post?.imageUrl}
						alt='post'
						className=' rounded-t-md min-h-80 lg:w-1/2 '
					/>

					<div className=' post_details-info lg:w-1/2'>
						<div className='flex-between w-full'>
							<Link
								to={`/profile/${post?.creator?.$id}`}
								className='flex items-center gap-3'
							>
								<img
									src={
										post?.creator?.imageUrl ||
										"/assets/icons/profile-placeholder.svg"
									}
									alt='creator'
									className='rounded-full w-9 h-9 lg:w-12 lg:h-12'
								/>

								<div className='flex flex-col'>
									<p className='base-medium lg:body-bold text-foreground '>
										{post?.creator?.name}
									</p>
									<div className=' flex-center gap-2 text-muted-foreground '>
										<p className='subtle-semibold lg:small-regular'>
											{multiFormatDateString(
												post?.$createdAt
											)}
										</p>
										-
										<p className='subtle-semibold lg:small-regular'>
											{post?.location}
										</p>
									</div>
								</div>
							</Link>

							<div className='flex-center gap-2'>
								{userData?.$id === post?.creator?.$id && (
									<div className='flex-center gap-3'>
										<Link to={`/update-post/${post?.$id}`}>
											<img
												src='/assets/icons/edit.svg'
												alt='edit'
												width={24}
												height={24}
											/>
										</Link>

										<div
											onClick={handleDeletePost}
											
											className='ghost_details-delete_btn cursor-pointer'
										>
										{isdeleting ? (<Loader/>):(	<img
												src='/assets/icons/delete.svg'
												alt='delete'
												width={24}
												height={24}
                        className=""
											/>)}
										</div>
									</div>
								)}
							</div>
						</div>

						<hr className='border w-full border-muted' />
						<div className='flex flex-col flex-1 w-full small-medium lg:base-regular'>
							<p>{post?.caption}</p>
							<ul className='flex gap-1 mt-2'>
								{post?.tags?.map((tag) => (
									<li
										key={tag}
										className=' text-muted-foreground'
									>
										#{tag}
									</li>
								))}
							</ul>
						</div>
            <div className="w-full ">
              {!loading  && <PostStats post={post} userId={userData?.$id}/>}
            </div>
					</div>
				</div>
			)}
		</div>
	);
};

export default PostDetails;
