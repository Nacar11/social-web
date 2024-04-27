import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { getCurrentUser, getCurrentUserAuth } from "@/lib/appwrite/api";
import { IUser } from "@/lib/appwrite/types";

export const INITIAL_USER = {
  id: "",
  name: "",
  username: "",
  email: "",
  imageUrl: "",
  bio: "",
};

const INITIAL_STATE = {
  user: INITIAL_USER,
  isLoading: false,
  isAuthenticated: false,
  isEmailVerified: false,
  setUser: () => {},
  setIsAuthenticated: () => {},
  checkUser: async () => false as boolean,
  checkAuthUserEmailVerification: async () => false as boolean,
};

type IContextType = {
  user: IUser;
  isLoading: boolean;
  setUser: React.Dispatch<React.SetStateAction<IUser>>;
  isAuthenticated: boolean;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
  checkUser: () => Promise<boolean>;
  checkAuthUserEmailVerification: () => Promise<boolean>;
  isEmailVerified: boolean; 
};

const AuthContext = createContext<IContextType>(INITIAL_STATE);

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();
  const [user, setUser] = useState<IUser>(INITIAL_USER);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isEmailVerified, setIsEmailVerified] = useState(false);

  const checkUser = async () => {
    setIsLoading(true);
    try {
      const currentAccount = await getCurrentUser();
      if (currentAccount) {
        setUser({
          id: currentAccount.$id,
          name: currentAccount.name,
          username: currentAccount.username,
          email: currentAccount.email,
          imageUrl: currentAccount.imageUrl,
          bio: currentAccount.bio,
        });
        setIsAuthenticated(true);
        return true;
      }

      return false;
    } catch (error) {
      console.error(error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

    const checkAuthUserEmailVerification = async () => {
    setIsLoading(true);
    try {
      const currentUserAuth = await getCurrentUserAuth();
      if (currentUserAuth?.emailVerification) {
        setIsEmailVerified(true);
        return true;
      }
      return false;
    } catch (error) {
      console.error(error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    checkUser();
    checkAuthUserEmailVerification();
    const cookieFallback = localStorage.getItem("cookieFallback");
    if (
      cookieFallback === "[]" ||
      cookieFallback === null ||
      cookieFallback === undefined
      
    ) {
        navigate("/sign-in");
    }
    else{
      if(isEmailVerified == true){
        navigate("/");
      }
      else if(isEmailVerified == false) {
        navigate("/email-verification");
      }
     }
  }, []);

  const value = {
    user,
    setUser,
    isLoading,
    isAuthenticated,
    setIsAuthenticated,
    checkUser,
    isEmailVerified,
    checkAuthUserEmailVerification
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useUserContext = () => useContext(AuthContext);

