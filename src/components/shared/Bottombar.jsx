import useNav from "@/hooks/useNav";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
const Bottombar = () => {
	const { pathname } = useLocation();
	const { bottombarLinks } = useNav();
	return (
		<section className='bottom-bar'>
			{bottombarLinks.map((nav) => {
				const isActive = pathname === nav.route;
				return (
					<Link
						key={nav.label}
						to={nav.route}
						className={`flex-center flex-col  gap-2 items-center p-4 group transition-all ${
							isActive && "text-primary rounded-lg"
						}`}
					>
						{isActive && (
							<motion.span
								initial={{ y: "-100%" }}
								animate={{ y: 0 }}
								transition={{ type: "tween" }}
								layoutId='mobilemenu'
								className={`fixed rounded-lg bottom-full h-[2px] bg-primary w-14`}
							/>
						)}
            <div className="flex-center flex-col gap-y-[.1rem] ">
            <div
							className={` text-2xl  group-hover:text-primary ${
								isActive ? "text-primary" : "text-foreground"
							}`}
						>
							{" "}
							{nav.icon}
						</div>
						<p className='group-hover:text-primary text-[.6rem]'>{nav.label}</p>
            </div>
				
					</Link>
				);
			})}
		</section>
	);
};

export default Bottombar;
