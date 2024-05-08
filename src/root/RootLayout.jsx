import Bottombar from "@/components/shared/Bottombar";
import LeftSidebar from "@/components/shared/LeftSidebar";
import Loader from "@/components/shared/Loader";
import Topbar from "@/components/shared/Topbar";
import useCheckAuthUser from "@/hooks/useCheckAuthUser";
import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";

const RootLayout = () => {

	const {checkAuthUser} = useCheckAuthUser()
	const navigate = useNavigate();
	const [isLoading,setIsloading] = useState(true)
	useEffect(()=>{
		const refresh =async ()=>{
			try {
				const authStatus = await checkAuthUser();
				if(!authStatus){
					navigate("/sign-in")
					setIsloading(false)
				}
			} catch (error) {
				console.log(error)
			}finally{
				setIsloading(false)
			}
	
		}
		refresh()
	},[])
	return (
		<div className=' w-full md:flex items-start'>
			{ isLoading? (<div className=" w-full absolute flex h-full"> <Loader className=" w-28"/></div>): (<>
				<Topbar />
			<LeftSidebar/>
			<main className=' flex flex-1 h-full '>
				<Outlet />
			</main>
			<Bottombar />
			</>)}
		
		</div>
	);
};

export default RootLayout;
