import { createContext, useState } from "react";
import baseURl from "../Shared/baseURL";
import axios from "axios";

export let UserContext = createContext();

export default function UserContextProvider(props) {
    const [userToken, setUserToken] = useState(null);
    return <UserContext.Provider value={{ userToken, setUserToken }}>
        {props.children}
    </UserContext.Provider>
}