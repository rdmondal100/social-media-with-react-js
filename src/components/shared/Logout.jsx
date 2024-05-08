import { IoLogOut } from "react-icons/io5";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import {  useState } from "react";
import Loader from "./Loader";
import authService from "@/lib/appwrite/auth_services";
import { useDispatch } from "react-redux";
import { setAppLoading } from "@/store/features/authSlice";

const Logout = () => {
	const navigate = useNavigate();
  const[logOut,setLogOut]=useState(false)
  const dispatch = useDispatch();

	const handleLogout = async() => {
		try {
			dispatch(setAppLoading(true))

			console.log("clicked logout")
			const success = await authService.signOut();
			console.log(success)
			console.log(!!success)
			setLogOut(!!success)
			if(!!success){
				navigate('/sign-in')
			}
			console.log(logOut)
		} catch (error) {
			console.log(error)
		}finally{
			dispatch(setAppLoading(false))

		}

	}



	return (
		<Button
			variant='ghost'
			className='flex gap-4 items-center justify-start hover:text-white group'
			onClick={handleLogout}
		>
				
			<IoLogOut className='text-2xl text-muted-foreground group-hover:text-white' />{" "}
			<p>Logout</p>
	
		</Button>
	);
};

export default Logout;
