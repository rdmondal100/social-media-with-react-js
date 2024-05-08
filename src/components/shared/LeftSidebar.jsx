import { Link, NavLink, useLocation } from "react-router-dom";

import { useSelector } from "react-redux";
import useNav from "@/hooks/useNav";
import ToggleTheme from "./ToggleTheme";
import Logo from "./Logo";
import Logout from "./Logout";

const LeftSidebar = () => {
	const { pathname } = useLocation();
	const { sidebarLinks } = useNav();
	const { userData } = useSelector((state) => state.auth);
	
	return (
		<nav className='leftsidebar'>
			<div className='flex flex-col gap-5'>
				<div className='flex justify-between'>
					<Logo />
					<ToggleTheme className='' />
				</div>

				<Link
					to={`/profile/${userData?.$id}`}
					className='flex gap-3 item-center'
				>
					<img
						src={
							userData?.imageUrl ||
							"/assets/icons/profile-placeholder.svg"
						}
						alt={userData?.name}
						className=' h-12 w-12 rounded-full'
					/>
					<div className='flex flex-col'>
						<p className='body-bold '>{userData?.name}</p>
						<p className='small-regular text-light-3 '>
							{userData?.username}
						</p>
					</div>
				</Link>

				<ul className='flex flex-col gap-6 mt-8'>
					{sidebarLinks.map((nav) => {
						const isActive = pathname === nav.route;
						return (
							<li
								key={nav.label}
								className={` leftsidebar-link group ${
									isActive && "bg-primary"
								}`}
							>
								<NavLink
									to={nav.route}
									className={`flex gap-2 items-center p-4 group ${
										isActive && "text-white"
									}`}
								>
									<div
										className={` text-2xl  group-hover:text-white ${
											isActive
												? "text-white"
												: "text-primary"
										}`}
									>
										{" "}
										{nav.icon}
									</div>
									<p className='group-hover:text-white'>
										{nav.label}
									</p>
								</NavLink>
							</li>
						);
					})}
				</ul>
			</div>
	<Logout/>
		</nav>
	);
};

export default LeftSidebar;
