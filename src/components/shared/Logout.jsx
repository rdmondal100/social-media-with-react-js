import { IoLogOut } from "react-icons/io5";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import {  useState } from "react";
import Loader from "./Loader";
import authService from "@/lib/appwrite/auth_services";

const Logout = () => {
	const navigate = useNavigate();
  const[loading,setLoading] =useState(false)
  const[logOut,setLogOut]=useState(false)


	const handleLogout = async() => {
		setLoading(true)
		console.log("clicked logout")
		const success = await authService.signOut();
		console.log(success)
		console.log(!!success)
		setLogOut(!!success)
		setLoading(false)
		if(!!success){
			navigate('/sign-in')
		}
		console.log(logOut)
	}



	return (
		<Button
			variant='ghost'
			className='flex gap-4 items-center justify-start hover:text-white group'
			onClick={handleLogout}
		>
			
			{loading && <Loader/>}
	
			<IoLogOut className='text-2xl text-muted-foreground group-hover:text-white' />{" "}
			<p>Logout</p>
	
		</Button>
	);
};

export default Logout;
