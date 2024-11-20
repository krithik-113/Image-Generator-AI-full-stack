import React, { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from 'axios'
import { useNavigate } from "react-router-dom";

export const appContext = createContext({});

const AppContextProvider = (props) => {
  const [user, setUser] = useState(null);
  const [showLogin, setShowLogin] = useState(false);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [credit, setCredit] = useState(false)
  const navigate = useNavigate()


  const loadCreditsData = async () => {
    try {
      const { data } = await axios.get('/api/user/credits',  { headers: { token } })
      if (data.success) {
        setCredit(data.credits)
        setUser(data.user)
      }
    } catch (error) {
      console.log(error.message)
      toast.error(error.message);
    }
  }
  const generateImage = async (prompt) => {
   try {
     const { data } = await axios.post("/api/image/generate-image",{ prompt }, { headers: { token } });
     if (data.success) {
       console.log(data)
       loadCreditsData()
       return data.resultImage
     } else {
       toast.error(data.message)
       loadCreditsData()
       if (data.creditBalance === 0) {
         navigate('/buy')
       }
     }
   } catch (error) {
    console.log(error.message);
    toast.error(error.message);
   }
  }
  const logout = () => {
    localStorage.removeItem('token')
  //  setShowLogin(true)
    setToken('')
    setUser(null)
  }
  useEffect(() => {
    if (token) {
      loadCreditsData()
    }
  },[token])
  const value = {
    user,
    setUser,
    showLogin,
    setShowLogin,
    token,
    setToken,
    credit,
    setCredit,
    loadCreditsData,
    logout,
    generateImage,
  };

  return (
    <appContext.Provider value={value}>{props.children}</appContext.Provider>
  );
};

export default AppContextProvider;
