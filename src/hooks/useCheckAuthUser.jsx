import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setIsAuthenticated, setIsLoading, setUser } from "@/store/features/authSlice";
import authService from "@/lib/appwrite/auth_services";

const useCheckAuthUser = () => {
  const dispatch = useDispatch();

  const checkAuthUser = async () => {
    dispatch(setIsLoading(true));
    try {
      const currentAccount = await authService.getCurrentUserAccount();
      if (currentAccount?.response?.code === 401) {
        dispatch(setIsAuthenticated(false));
        return false
      } else if (currentAccount) {
        dispatch(setIsAuthenticated(true));
        dispatch(setUser(currentAccount));
        return true
      } else {
        dispatch(setIsAuthenticated(false));
        dispatch(setUser(null));
        return false
      }
     
    } catch (error) {
      console.log(error);
      return false; 
    } finally {
      dispatch(setIsLoading(false));
    }
  };

  useEffect(() => {
    checkAuthUser(); // Automatically check authentication on component mount
  }, []);

  return { checkAuthUser };
};

export default useCheckAuthUser;
