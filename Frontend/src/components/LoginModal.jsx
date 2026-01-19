// import React, { useState } from 'react'
import {login} from '../../config/axios.js'
import {useForm} from "react-hook-form"
import {loginSchema} from '../../Schemas/loginSchema.js'
import { zodResolver} from '@hookform/resolvers/zod'
import { useAuth } from '../../context/AuthContext.jsx'

const LoginModal = ({setAuthMode , showFlash , closeAuthModel}) => {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        } = useForm({
        resolver: zodResolver(loginSchema),
    });


    const switchToSignup = () => {
        setAuthMode("signup");
    }
    
    const {setUser} =  useAuth();

    // const [formData , setFormData] = useState({
    //     username: "",
    //     password : "",
    // })

    // const handleChange = (e) =>{
    //     setFormData((prevData) => {
    //       return {...prevData , [e.target.name] : e.target.value}
    //     })

    // // }

    // const handleSubmit = async (e) => {
    //   e.preventDefault();
    //   try{
    //    const  res = await login(formData); 
    //     showFlash(res.data.message , "success");
    //     console.log(res);
    //     closeAuthModel();
    //   } catch (err) {
    //     showFlash(err.response?.data?.message || "login Failed" , "failure")
    //     console.log(err);
    //   }
    // }

    const onSubmit = async (data) => {
        // await new Promise((r) => setTimeout(r, 1500)); // 👈 force delay
        try {
            const res = await login(data);
            console.log("login successfuly" , res)
            setUser(res.data.user)
            showFlash(res.data.message, "success");
            closeAuthModel();
        } catch (err) {
            showFlash(err.response?.data?.message
                || "Login failed", "failure");
        }
};


    
  return (
    <div>
            <div className="w-full max-w-sm mx-auto px-4 space-y-4">
                  <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>

                  <input
                    type="name"
                    // name='username'
                    {...register("username")}
                    // value = formData.username
                    placeholder="username"
                    
                    className ={`w-full p-3 border rounded-lg  ${ errors.username ? "border-red-500" : "border-[#7AB204] " }`}
                  />

                  {errors.username && (
                        <p className="text-red-500 text-sm">{errors.username.message}</p>
                   )}

                  <input
                    type="password"
                    // name='password'
                    {...register("password")}
                    placeholder="Password"
                    // value = formData.Password
                    className={`w-full p-3 border rounded-lg ${ errors.password ? "border-red-500" : "border-gray-300"}`}
                  /> 

                   {errors.password && (
                        <p className="text-red-500 text-sm">{errors.password.message}</p>
                    )}

                  <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-[#7AB204] text-white p-3 rounded-lg"
                        >
                        {isSubmitting ? "Logging in..." : "Login"}
                  </button>
                  </form>
                </div>
  


        {/* Toggle text */}
        <p className="mt-4 text-sm text-gray-600 text-center">
          Do not have an account?{" "}
          <button onClick={switchToSignup} className="text-[#7AB204] hover:underline cursor-pointer">
            SignUp
          </button>
        </p>
    </div>
  )
}

export default LoginModal