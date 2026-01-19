import React from 'react'
import { signup } from '../../config/axios';
import{useForm} from "react-hook-form";
import { signupSchema } from '../../Schemas/signupSchema';
import {zodResolver} from "@hookform/resolvers/zod";
import { useAuth } from '../../context/AuthContext';


const SignupModal = ({showFlash , closeAuthModel ,setAuthMode})  => {
   
  const {
          register,
          handleSubmit,
          formState: { errors, isSubmitting },
          } = useForm({
          resolver: zodResolver(signupSchema),
      });                                                                                                                                          
   
    const switchToLogin = () =>{
      setAuthMode("login");
    }
  
    const {setUser} = useAuth();

    // const [formData, setFormData] = React.useState({
    //     username: '',
    //     email: '', 
    //     password: ''
    //   });
    
    //   const handleChange = (e) => {
    //     setFormData((currData) =>{
    //         return{ ...currData, [e.target.name] : e.target.value}
    //     })
    //   }

  //     const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   try{
  //       const response = await signup(formData);
  //       console.log('Signup successful:');
  //       showFlash( `Hi'${response.data.user.username}, signUp successful` , "success" )
  //       closeAuthModel();

  //   } catch (err) {
  //       showFlash(err.response.data.message || "signup Failed" , "error")
  //   }
  // }

  const onSubmit = async (data) => {
    try{
      const response  = await signup(data);
      setUser(response.data.user);
      showFlash( `Hi'${response.data.user.username}, signUp successful` , "success")
      closeAuthModel();
    } catch(err){
      showFlash(err.response?.data?.message || "signup Failed" , "error")
    }
  }
  return (
    <div>
        {/* Form placeholder */}
            <div className="w-full max-w-sm mx-auto px-4 space-y-4">
                  <form onSubmit={handleSubmit(onSubmit)} noValidate className='space-y-4'>
                  <input
                    type="text"
                    // value={formData.username}
                    // name='username'
                    {...register("username")}
                    placeholder="Username"
                    // onChange={handleChange}
                    className={`w-full p-3 border rounded-lg ${errors.username? "border-red-500" : "border-[#7AB204]"} `}
                  />
                 {errors.username && <p className='text-red-500 text-sm'> {errors.username.message}</p>}

                  <input
                    type="email"
                    {...register("email")}
                    // value={formData.email}
                    // name='email'
                    placeholder="Email"
                    // onChange={handleChange}
                    className={`w-full p-3 border rounded-lg ${errors.email? "border-red-500" : "border-[#7AB204]"} `}
                  />

                  {errors.email && <p className='text-red-500 text-sm'> {errors.email.message}</p>}

                  <input
                    type="password"
                    {...register("password")}
                    // value={formData.password}
                    // name='password'
                    placeholder="Password"
                    // onChange={handleChange}
                    className={`w-full p-3 border rounded-lg ${errors.password? "border-red-500" : "border-[#7AB204]"} `}
                  />

                  {errors.password && <p className='text-red-500 text-sm'> {errors.password.message}</p>}

                  <button type='submit' disabled={isSubmitting} className="w-full bg-[#7AB204] text-white p-3 rounded-lg hover:opacity-90 transition">
                   {isSubmitting? "signing in" : "signup"}
                  </button>
                  </form>
                </div>
  


        {/* Toggle text */}
        <p className="mt-4 text-sm text-gray-600 text-center">
          Already have an account?{" "}
          <button onClick={switchToLogin} className="text-[#7AB204] hover:underline cursor-pointer">
            Login
          </button>
        </p>
    </div>
  )
}

export default SignupModal;