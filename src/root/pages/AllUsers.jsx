import Loader from "@/components/shared/Loader";
import postServices from "@/lib/appwrite/post_services";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const AllUsers = () => {
	const [allUsers, setAllUsers] = useState([]);
  const [isSearching,setIsSearchig] =useState(true)
	useEffect(() => {
		const getUsers = async () => {
			try {

				const users = await postServices.getAllUsers();
				setAllUsers(users);
				console.log(users);
			} catch (error) {
				console.log(error);
			}finally{
        setIsSearchig(false)
      }
		};
		getUsers();
	}, []);

	return (
		<div className='common-container'>
			<div className='user-container'>
				<div className='user-grid '>
					{allUsers?.documents?.map((user) => (
						<Link
							to={`/profile/${user?.$id}`}
							key={user?.$id}
							className='user-card'
						>
							<img
								src={user?.imageUrl}
								alt=''
								className='rounded-full'
								height={28}
								width={28}
							/>
							{user?.name}
						</Link>
					))}
				</div>
			</div>
      {isSearching && <Loader/>}
		</div>
	);
};

export default AllUsers;
