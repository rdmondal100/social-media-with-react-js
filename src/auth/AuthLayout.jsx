import useCheckAuthUser from "@/hooks/useCheckAuthUser";
import { useEffect, useState } from "react";
import { Outlet, Navigate, useLocation } from "react-router-dom";

const AuthLayout = () => {
	const {pathname}= useLocation()
	const {checkAuthUser} = useCheckAuthUser()
	const [isAuthenticated,setIsAuthenticated]= useState(false)

	useEffect(()=>{
		const checkAuthStatus = async ()=>{
			try {
				const status = await checkAuthUser()
				if(!status){
					setIsAuthenticated(false)
				}
				setIsAuthenticated(status)

			} catch (error) {
				console.log(error)
			}
		}
		checkAuthStatus()
	},[pathname])

	return (
		<>
			{isAuthenticated ? (
				<Navigate to='/' />
			) : (
				<>
					<section  className="flex flex-1 justify-center items-center flex-col py-10 h-screen">
						<Outlet />
					</section>
					<div  className="hidden lg:flex w-1/2  h-screen">

					<img  src=" /assets/images/side-img.svg" className=" h-full w-full  bg-no-repeat object-cover justify-center items-center mr-12 mt-7"/>
					</div>
				</>
			)}
		</>
	);
};

export default AuthLayout;
