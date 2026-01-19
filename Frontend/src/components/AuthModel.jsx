import React , {useState} from 'react'
import SignupModal from './SignupModal.jsx';
import LoginModal from './LoginModal.jsx';

const AuthModel = ({closeAuthModel , showFlash}) => {
  const [authMode , setAuthMode] = useState("signup");

  return (
    <div>
        <div className='fixed inset-0 flex justify-center items-center bg-black/50 z-50'>
        <div className='bg-white w-full max-w-sm mx-4 p-6 rounded-lg relative'>
          <button onClick={closeAuthModel} className='absolute top-2 right-2 '>Close</button>
           <div className='flex justify-center items-center mb-8 mt-6'>
                <p className='text-2xl text-black'>M-FIT </p>
                <p className='text-[#7AB204] text-2xl'>Gym</p>
                </div>
        {authMode === "signup"? (<SignupModal  closeAuthModel = {closeAuthModel} showFlash = {showFlash} 
        setAuthMode={setAuthMode}/>) :( <LoginModal closeAuthModel={closeAuthModel} showFlash={showFlash} setAuthMode= {setAuthMode}/>)}
             
        
        </div>
        </div>
    </div>
  )
}

export default AuthModel;