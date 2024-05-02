import Bottombar from "@/components/shared/Bottombar";
import LeftSidebar from "@/components/shared/LeftSidebar";
import Topbar from "@/components/shared/Topbar";
import { Outlet } from "react-router-dom";

const RootLayout = () => {
	return (
		<div className=' w-full md:flex items-start'>
			<Topbar />
			<LeftSidebar/>
			<main className=' flex flex-1 h-full '>
				<Outlet />
			</main>
			<Bottombar />
		</div>
	);
};

export default RootLayout;
