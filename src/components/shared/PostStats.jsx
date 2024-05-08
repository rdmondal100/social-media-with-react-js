import { checkIsLiked } from "@/lib/utils";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Loader from "./Loader";
import postServices from "@/lib/appwrite/post_services";
import authService from "@/lib/appwrite/auth_services";
import { data } from "autoprefixer";

const PostStats = ({ post, userId }) => {
	const likesList = post?.likes?.map((user) => user.$id);

	const [likes, setLikes] = useState(likesList);
	const [isSaved, setIsSaved] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
  const {userData} = useSelector((state)=>state.auth)
	const handleLIkePost = (e) => {
		e.stopPropagation();
		let newLikes = [...likes];
		const hasLiked = newLikes.includes(userId);
		if (hasLiked) {
			newLikes = newLikes.filter((id) => id !== userId);
		} else {
			newLikes.push(userId);
		}

		setLikes(newLikes);
		postServices.likePost({ postId: post?.$id, likesArray: newLikes });
	};

	const handleSavePost = async (e) => {
		e.stopPropagation();
		setIsLoading(true);

		const data = await authService.getCurrentUserAccount();
		const savedRecordId = data?.save?.find((record) => {

			return record?.post?.$id === post?.$id;
		});

		if (savedRecordId) {
			await postServices.deleteSavedPost(savedRecordId?.$id);

			setIsSaved(false);
			setIsLoading(false);
		} else {
			await postServices.savePost({
				postId: post?.$id,
				userId: userData?.$id,
			});
			setIsSaved(true);
			setIsLoading(false);
		}
	};

	useEffect(() => {
		const refresh = async () => {
			const data = await authService.getCurrentUserAccount();

			setIsSaved(
				data?.save?.find((record) => record?.post?.$id === post?.$id)
			);
		};
		refresh();
	}, [data]);

	return (
		<div className='flex justify-between items-center z-20'>
			<div className='flex gap-2 mr-5'>
				<img
					src={`${
						checkIsLiked(likes, userId)
							? "/assets/icons/liked.svg"
							: "/assets/icons/like.svg"
					} `}
					alt='like'
					width={20}
					height={20}
					onClick={handleLIkePost}
					className=' cursor-pointer'
				/>
				<p className=' small-medium lg:base-medium'>{likes?.length}</p>
			</div>
			<div className='flex gap-2 '>
				{isLoading ? (
					<Loader />
				) : (
					<img
						src={
							isSaved
								? "/assets/icons/saved.svg"
								: "/assets/icons/save.svg"
						}
						alt='like'
						width={20}
						height={20}
						onClick={handleSavePost}
						className=' cursor-pointer'
					/>
				)}
			</div>
		</div>
	);
};

export default PostStats;
