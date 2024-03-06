import { createContext, useState } from "react";

export const Firebasecontext = createContext(null)

export const AuthContext = createContext(null)

function Context(props){
    const [user,setuser] = useState(null)

    return(
        <AuthContext.Provider value={{user,setuser}}>
           {props.children}
        </AuthContext.Provider>
    )
}

export default Context;