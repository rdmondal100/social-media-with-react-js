import Loader from "@/components/shared/Loader";
import PostCard from "@/components/shared/PostCard";
import postServices from "@/lib/appwrite/post_services";
import { useEffect, useState } from "react";

const Home = () => {


	const [isPostLoading, setIsPostLoading] = useState(true);
	const [posts, setPosts] = useState(null);
	useEffect(() => {
		const getPost = async () => {
			const data = await postServices.getRecentPosts();
			setPosts(data);
			console.log(data);
			setIsPostLoading(false);
		};
		getPost();
	}, []);

	return (
		<div className='flex flex-1 '>
			<div className='home-container'>
				<div className='home-posts'>
					<h2 className=' h3-bold md:h2-bold text-left w-full'>
						{" "}
						Home Feed
					</h2>
					{isPostLoading && !posts ? (
						<Loader />
					) : (
						<ul className='flex flex-col flex-1 gap-9 w-full'>
							{posts &&
								posts?.documents?.map((post) => (
									<PostCard post={post} key={post.$id} />
								))}
						</ul>
					)}
				</div>
			</div>
		</div>
	);
};

export default Home;
