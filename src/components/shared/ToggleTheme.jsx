import { Sun } from "lucide-react";
import { BsMoonStarsFill } from "react-icons/bs";

import { Button } from "@/components/ui/button";
import { useDispatch } from "react-redux";
import { setThemeMode } from "@/store/features/authSlice";
const ToggleTheme = ({className}) => {
  const dispatch = useDispatch();
	const togglemode = () => {
		const currentmode = document.querySelector("html").classList[0];
    console.log(currentmode)
		if (currentmode === "dark") {
      dispatch(setThemeMode(false))
      document.querySelector("html").classList.remove("dark")
      document.querySelector("html").classList.add("light")

		} else if (currentmode === "light") {
      dispatch(setThemeMode(true))
      document.querySelector("html").classList.remove("light")
      document.querySelector("html").classList.add("dark")
		}
	};
	return (
		<>
			<Button
				variant='icon'
				size='icon'
				className={`xl:w-10 xl:h-10 ${className}`}
				onClick={() => togglemode()}
			>
				<Sun className='h-[1.2rem] w-[1.2rem] text-primary rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0' />
				<BsMoonStarsFill className='absolute text-primary h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100' />
				<span className='sr-only'>Toggle theme</span>
			</Button>
		</>
	);
};

export default ToggleTheme;
