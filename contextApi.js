import { createContext, useContext, useEffect, useState } from "react";
import { deleteCookie, getCookie, setCookie } from 'cookies-next'
import { useRouter } from "next/router";

const AuthContext = createContext({
  user: null,
  signUp: () => {},
  removeUser: () => {},
  signedIn: null,
  setSignedIn: () => {},
});
function useAuth() {
  return useContext(AuthContext);
}

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [signedIn, setSignedIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const isUser = getCookie("user")
    if(isUser){
      setUser(JSON.parse(isUser))
    }
    // if (typeof window !== undefined) {
    //   setUser(JSON.parse(window.localStorage.getItem("user")));
    // }
  }, []);

  const signUp = (userInformation) => {
    // localStorage.setItem("user", JSON.stringify(userInformation));
    setCookie('user', JSON.stringify(userInformation));
    setUser(userInformation);
  };

  const removeUser = (value) => {
    router.push('/');
    setUser(null);
    deleteCookie("user");
    
    // localStorage.clear();
  };

  const value = {
    user,
    signUp,
    removeUser,
    signedIn,
    setSignedIn,
  };

  return (
    <>
      <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    </>
  );
}

export { useAuth, AuthProvider };
