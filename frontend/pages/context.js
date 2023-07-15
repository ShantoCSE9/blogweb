import { createContext, useContext, useRef } from "react";
// Creating the user context
const UserContext = createContext();

// Making the function which will wrap the whole app using Context Provider
export default function AppStore({ children }) {
  
   const isLogin=useRef(false);
   const page=useRef(false);
  return (
    <UserContext.Provider value={isLogin} valuer={page} >
      {children}
    </UserContext.Provider>
  );
}

// Make useUserContext Hook to easily use our context throughout the application
export function useUserContext() {
  return useContext(UserContext);
}