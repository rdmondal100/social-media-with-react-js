import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import SignInForm from "./auth/forms/SignInForm";
import { AllUsers, CreatePost, EditPost, Explore, Home, PostDetails, Profile, Saved, UpdateProfile } from "./root/pages";
import SignUpForm from "./auth/forms/SignUpForm";
import AuthLayout from "./auth/AuthLayout";
import RootLayout from "./root/RootLayout";
import { Toaster } from "@/components/ui/toaster"

import "./globals.css";
import { useEffect } from "react";
import useCheckAuthUser from "./hooks/useCheckAuthUser";



const App = () => {

	const {checkAuthUser} =useCheckAuthUser();
	const navigate = useNavigate();

	useEffect(() => {
		const initialCheck = async () => {
			// authService.signOut()
			const currentStatus = await checkAuthUser();
			console.log(currentStatus)
			if (currentStatus) {
				console.log("i am authenticated")
				navigate("/");
			}
			else if (localStorage.getItem("cookieFallback") === '[]'|| localStorage.getItem('cookieFallback') === null
		)  {
				navigate("/sign-in");
				// authService.signOut()

			}
			else{
				navigate("/sign-up")
				// authService.signOut()
			}
		};

		initialCheck();
	}, []);

	return (
		<main className=' flex '>
			<Toaster/>
			<Routes>
				{/* publick routes  */}
				<Route element={<AuthLayout />}>
					<Route path='sign-in' element={<SignInForm />} />
					<Route path='sign-up' element={<SignUpForm />} />
				</Route>

				{/* private routes  */}
				<Route  element={<RootLayout />} >
					<Route index element = {<Home/>}/>
					<Route path="/explore" element = {<Explore/>}/>
					<Route path="/saved" element = {<Saved/>}/>
					<Route path="/all-users" element = {<AllUsers/>}/>
					<Route path="/create-post" element = {<CreatePost/>}/>
					<Route path="/update-post/:id" element = {<EditPost/>}/>
					<Route path="/post/:id" element = {<PostDetails/>}/>
					<Route path="/profile/:id/*" element = {<Profile/>}/>
					<Route path="/update-profile/:id/*" element = {<UpdateProfile/>}/>
					</Route>
			</Routes>
			
		</main>
	);
};

export default App;
