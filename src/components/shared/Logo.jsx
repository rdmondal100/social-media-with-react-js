import { useSelector } from "react-redux";
import { Link } from "react-router-dom"


const Logo = () => {
  const {isDarkMode } = useSelector((state) => state.auth);
  return (
    <Link to='/' className='flex  gap-3 items-center'>
    <img
      src={`${isDarkMode? "/assets/images/logo.svg": "/assets/images/logo_light.svg"}`}
      alt='logo'
      className=" w-40 md:w-48"
    />
  </Link>
  )
}

export default Logo