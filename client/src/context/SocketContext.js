import { createContext, useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";
import { AuthContext } from "./AuthContext";




export const SocketContext = createContext(null);

export const SocketContextProvider = ({ children }) => {
    const [socket, setSocket] = useState(null);

    const {user}=useContext(AuthContext)

    console.log("socket here",user)

  
    useEffect(() => {
        setSocket(io("http://localhost:8900"));
      }, []);
    
      useEffect(() => {
        socket?.emit("addUser", user);
      }, [socket, user]);
  
  return (
    <SocketContext.Provider
      value={{
        socket:socket
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};