import { TiHomeOutline } from "react-icons/ti";
import { MdOutlineExplore } from "react-icons/md";
import { MdOutlinePeopleAlt } from "react-icons/md";
import { BiBookmarkHeart } from "react-icons/bi";
import { BiImageAdd } from "react-icons/bi";


const useNav=()=>{

   const sidebarLinks = [
    {
      icon: <TiHomeOutline />,
      route: "/",
      label: "Home",
    },
    {
      icon:<MdOutlineExplore/>,
      route: "/explore",
      label: "Explore",
    },
    {
      icon: <MdOutlinePeopleAlt/>,
      route: "/all-users",
      label: "People",
    },
    {
      icon: <BiBookmarkHeart/>,
      route: "/saved",
      label: "Saved",
    },
    {
      icon:<BiImageAdd/>,
      route: "/create-post",
      label: "Create Post",
    },
  ];


  
 const bottombarLinks = [
  {
    icon: <TiHomeOutline />,
    route: "/",
    label: "Home",
  },
  {
    icon: <MdOutlineExplore/>,
    route: "/explore",
    label: "Explore",
  },
  {
    icon:  <BiBookmarkHeart/>,
    route: "/saved",
    label: "Saved",
  },
  {
    icon:<BiImageAdd/>,
    route: "/create-post",
    label: "Create",
  },
];

return {sidebarLinks,bottombarLinks}
}

export default useNav;