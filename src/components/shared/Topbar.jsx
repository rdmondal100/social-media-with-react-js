import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { IoIosArrowDropdownCircle } from "react-icons/io";

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import ToggleTheme from "./ToggleTheme";
import Logo from "./Logo";
import Logout from "./Logout";

const Topbar = () => {
	const { userData } = useSelector((state) => state.auth);

	return (
		<section className='topbar'>
			<div className=' flex-between py-4 px-5'>
				<Logo />
				<div className='flex gap-4'>
					<ToggleTheme />

					<div className=' '>
						<DropdownMenu className=''>
							<DropdownMenuTrigger className='outline-none'>
								{" "}
								<img
									src={
										userData?.imageUrl ||
										"/assets/icons/profile-placeholder.svg"
									}
									alt={userData?.name}
									className=' w-9 h-9 rounded-full'
								/>
								<IoIosArrowDropdownCircle className='absolute right-5 bottom-5' />
							</DropdownMenuTrigger>
							<DropdownMenuContent>
								<DropdownMenuItem>
									{" "}
									<Link
										to={`/profile/${userData?.$id}`}
										className='flex-center gap-3'
									>
										{userData?.name}
									</Link>
								</DropdownMenuItem>
								<DropdownMenuSeparator />
								<DropdownMenuItem>
									<Logout/>
								</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Topbar;
