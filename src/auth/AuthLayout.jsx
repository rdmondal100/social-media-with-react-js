import { Outlet, Navigate } from "react-router-dom";

const AuthLayout = () => {
	const isAuthenticated = false;
	return (
		<>
			{isAuthenticated ? (
				<Navigate to='/' />
			) : (
				<>
					<section  className="flex flex-1 justify-center items-center flex-col py-10 h-screen">
						<Outlet />
					</section>
					<img  src=" /assets/images/side-img.svg" className=" hidden lg:flex w-1/2 float-right h-screen bg-no-repeat object-cover"/>
				</>
			)}
		</>
	);
};

export default AuthLayout;
