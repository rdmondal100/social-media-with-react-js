import { createSlice } from "@reduxjs/toolkit";


const initialState = {
  userData: null,
  isLoading: false,
  isAuthenticated: false,
  isDarkMode:true,
  appLoading:false,
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.userData = action.payload;
      if(state.userData.accountId){
        state.isAuthenticated = true;
      }
      console.log(state.userData)
    },
    setIsAuthenticated: (state, action) => {
      state.isAuthenticated = action.payload
    },
    setIsLoading: (state, action) => {
      state.isLoading = action.payload
    },
    updateStates:(state,action)=>{
      state.isAuthenticated=action.payload
      state.userData=action.payload
      state.isLoading=action.payload
    },
    setThemeMode:(state,action)=>{
      state.isDarkMode=action.payload
    },
    setAppLoading:(state,action)=>{
      state.appLoading=action.payload
    }
  }
})


export const { setUser, setIsAuthenticated, setIsLoading,setThemeMode,setAppLoading } = authSlice.actions;
export default authSlice.reducer;