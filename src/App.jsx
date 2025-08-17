import React, { useContext } from 'react'
import {Route,Routes} from 'react-router-dom'
import SignUp from './Pages/SignUp'
import SignIn from './Pages/SignIn'
import Home from './Pages/Home'
import Customize from './Pages/Customize'
import { Navigate } from 'react-router-dom'

import { userDataContext } from './context/UserContext'
import Customize2 from './Pages/Customize2'

const App = () => {
  const {userData,setUserData} = useContext(userDataContext);
  console.log(userData);

  return (
    <div>
      <Routes>
        <Route path="/" element={(userData?.assistantImage && userData?.assistantName) ? <Home/> : <Navigate to={"/customize"}/>} />
        <Route path="/signup" element={!userData ? <SignUp/> : <Navigate to={"/"}/> } />
        <Route path="/signin" element={!userData ? <SignIn/> : <Navigate to={"/"}/> } />
        <Route path="/customize" element={userData ? <Customize/> : <Navigate to={"/signup"} /> } />
        <Route path="/customize2" element={userData ? <Customize2/> : <Navigate to={"/signup"} /> }/>
      </Routes>
    </div>
  )
}

export default App