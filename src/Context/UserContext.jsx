import { createContext, useEffect, useState } from "react";

export let userContext = createContext();

export default function UserContextProvider(props) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  useEffect(() => {
    if (localStorage.getItem("token") !== null) {
      setUser(localStorage.getItem("token"));
      setToken(localStorage.getItem("token"));
    }
  }, []);
  return (
    <userContext.Provider value={{ user, setUser, setToken, token }}>
      {props.children}
    </userContext.Provider>
  );
}
