import React, { createContext,useState,useEffect } from 'react';
import axios from 'axios';
export const userDataContext = createContext();
function UserContext({children}){
    const serverUrl="https://assistica-backend.onrender.com";
    const [userData,setUserData] = useState(null);
    const [frontendImage,setFrontendImage] = useState(null);
    const [backendImage,setBackendImage] = useState(null);
    const [selectedImage,setSelectedImage] = useState(null);

    const getGeminiResponse = async (command) => {
        try{
            const result = await axios.post(`${serverUrl}/api/user/asktoassistant`,{command},{withCredentials:true});
            return result.data;
        }
        catch(error){
            console.log(error);
        }
    }

    const value={
        serverUrl,userData,setUserData,frontendImage,setFrontendImage,backendImage,setBackendImage,selectedImage,setSelectedImage,getGeminiResponse
    }
    
    const handleCurrentUser = async () => {
        try{
            const result = await axios.get(`${serverUrl}/api/user/current`,{withCredentials:true});
            setUserData(result.data);
        }
        catch(error){
            console.log(error);
        }
    }

    useEffect(()=>{
        handleCurrentUser();
    },[])

    return (
        <div>
            <userDataContext.Provider value={value}>
                {children}
            </userDataContext.Provider>
        </div>
    )
}
export default UserContext;