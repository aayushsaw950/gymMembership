import React, { useState } from 'react'
import Navbar from './components/Navbar.jsx'
import { Outlet } from 'react-router-dom'
import { Footer } from './components/Footer.jsx'
import AuthModel from './components/AuthModel.jsx'
import FlashMessage from './components/FlashMessage.jsx'




const App = () => {

const [flash, setFlash] = useState({
  type:"",
  message:"",
  visible:false,
})

const showFlash = (message, type) => {
  setFlash({message, type ,visible : true});
  setTimeout(() =>{
     setFlash((prev) => ({...prev , visible : false}))
  } , 3000);
}
const [isAuthModelOpen, setIsAuthModelOpen] = useState(false);

const toggleAuthModel = () =>{
  setIsAuthModelOpen(!isAuthModelOpen);

}

const closeAuthModel = () =>{
  setIsAuthModelOpen(false);
}

  return (
    <div>
      <Navbar toggleAuthModel={toggleAuthModel} />
      <FlashMessage message = {flash.message} type={flash.type} visible={flash.visible}/>
      <Outlet />
      {isAuthModelOpen && <AuthModel closeAuthModel={closeAuthModel} showFlash={showFlash} />}
      <Footer />
    </div>
  )
}

export default App